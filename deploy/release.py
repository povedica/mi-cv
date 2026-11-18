#!/usr/bin/env python3
"""Receive and activate a static release, or restore a retained release locally."""

import fcntl
import os
from pathlib import Path
import re
import shutil
import sys
import tarfile
import tempfile

PAGES = {"index.html", "interview/index.html"}
LANDING_FILES = {
    "en/index.html", "en/interview/index.html", "sitemap.xml", "robots.txt",
    "og.png", "og.jpg", "cookies/index.html", "en/cookies/index.html",
}
PUBLIC_PDF = re.compile(r"(?:cv|certificados)/[\w-][\w.-]*\.pdf", re.ASCII)
ASSET = re.compile(r"_astro/[\w.-]+\.(?:css|js|webp)", re.ASCII)
SHA = re.compile(r"[a-f0-9]{40}")


def unpack(destination):
    names = set()
    total = 0
    has_astro_assets = False
    with tarfile.open(fileobj=sys.stdin.buffer, mode="r|") as archive:
        for member in archive:
            name = member.name
            total += member.size
            is_astro_asset = bool(ASSET.fullmatch(name))
            if (not member.isfile() or name in names or
                    not (name in PAGES or name in LANDING_FILES or
                         is_astro_asset or PUBLIC_PDF.fullmatch(name)) or
                    member.size < 1 or total > 32 * 1024 * 1024 or len(names) >= 256):
                raise ValueError("Invalid release contents")
            target = destination / name
            target.parent.mkdir(mode=0o755, exist_ok=True)
            with archive.extractfile(member) as source, target.open("xb") as output:
                shutil.copyfileobj(source, output)
            names.add(name)
            has_astro_assets |= is_astro_asset
    if not PAGES <= names or not has_astro_assets:
        raise ValueError("Release requires both pages and Astro assets")


def retain_assets(root, release):
    # Cached HTML may still reference an earlier release's immutable assets.
    shared_assets = root / "assets" / "_astro"
    shared_assets.mkdir(mode=0o755, parents=True, exist_ok=True)
    assets = list((release / "_astro").iterdir())
    for asset in assets:
        target = shared_assets / asset.name
        if target.exists() and target.read_bytes() != asset.read_bytes():
            raise ValueError(f"Asset name reused with different contents: {asset.name}")
    for asset in assets:
        target = shared_assets / asset.name
        if not target.exists():
            os.link(asset, target)


def main(root, operation, sha):
    if not SHA.fullmatch(sha) or operation not in {"publish", "rollback"}:
        raise ValueError("Expected publish or rollback and a full commit SHA")
    releases = root / "releases"
    release = releases / sha
    with (root / ".deploy.lock").open("a") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        if operation == "publish":
            with tempfile.TemporaryDirectory(dir=releases) as staging:
                content = Path(staging) / "site"
                content.mkdir(mode=0o755)
                unpack(content)
                if not release.exists():
                    retain_assets(root, content)
                    content.rename(release)
        if not all((release / page).is_file() for page in PAGES):
            raise ValueError("Release is missing or incomplete")
        retain_assets(root, release)
        with tempfile.TemporaryDirectory(dir=root) as staging:
            link = Path(staging) / "current"
            link.symlink_to(Path("releases") / sha)
            link.replace(root / "current")
    print(f"Active release: {sha}")


if __name__ == "__main__":
    os.umask(0o022)
    try:
        root = Path(sys.argv[1])
        if "SSH_ORIGINAL_COMMAND" in os.environ:
            operation, sha = os.environ["SSH_ORIGINAL_COMMAND"].split()
            if operation != "publish":
                raise ValueError("SSH only accepts publish")
        else:
            operation, sha = sys.argv[2:]
        main(root, operation, sha)
    except (ValueError, OSError, tarfile.TarError) as error:
        sys.exit(str(error))
