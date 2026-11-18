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
ASSET = re.compile(r"_astro/[\w.-]+\.(?:css|js|webp)", re.ASCII)
SHA = re.compile(r"[a-f0-9]{40}")


def unpack(destination):
    names = set()
    total = 0
    with tarfile.open(fileobj=sys.stdin.buffer, mode="r|") as archive:
        for member in archive:
            name = member.name
            total += member.size
            if (not member.isfile() or name in names or
                    not (name in PAGES or ASSET.fullmatch(name)) or
                    member.size < 1 or total > 32 * 1024 * 1024 or len(names) >= 256):
                raise ValueError("Invalid release contents")
            target = destination / name
            target.parent.mkdir(mode=0o755, exist_ok=True)
            with archive.extractfile(member) as source, target.open("xb") as output:
                shutil.copyfileobj(source, output)
            names.add(name)
    if not PAGES <= names or names == PAGES:
        raise ValueError("Release requires both pages and Astro assets")


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
                    content.rename(release)
        if not all((release / page).is_file() for page in PAGES):
            raise ValueError("Release is missing or incomplete")
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
