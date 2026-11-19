"""Exercise the release receiver with synthetic archives."""

import io
from pathlib import Path
import subprocess
import sys
import tarfile
import tempfile
import unittest

RECEIVER = Path(__file__).resolve().parents[1] / "deploy" / "release.py"
SHA = "a" * 40
PAGES = ["index.html", "interview/index.html"]
ASSET = "_astro/styles.css"
INDEXNOW_KEY = "0123456789abcdef" * 2


class ReleaseTest(unittest.TestCase):
    def publish(self, root, files, contents=None):
        archive = io.BytesIO()
        with tarfile.open(fileobj=archive, mode="w") as tar:
            for path in files:
                member = tarfile.TarInfo(path)
                data = (contents or {}).get(path, b"test")
                member.size = len(data)
                tar.addfile(member, io.BytesIO(data))
        return subprocess.run(
            [sys.executable, str(RECEIVER), str(root), "publish", SHA],
            input=archive.getvalue(), capture_output=True,
        )

    def test_landing_files_are_accepted(self):
        files = PAGES + [
            ASSET, "_astro/poster.test.avif", "_astro/Geist-latin.Ast12.woff2", "en/index.html", "en/interview/index.html", "cv/public-en.pdf",
            "certificados/public.pdf", "sitemap.xml", "robots.txt", "llms.txt", "index.md", "en/index.md", "og.png", "og.jpg", "og-v2.jpg", "og-v2-en.jpg", "pablo-poveda.jpg",
            "favicon.svg", "favicon.ico", "apple-touch-icon.png", "site.webmanifest",
            "icon-192.png", "icon-512.png", "maskable-512.png",
            "captions/avatar-v2-es.vtt", "captions/avatar-v3-en.vtt",
            "cookies/index.html", "en/cookies/index.html",
        ]
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "releases").mkdir()
            result = self.publish(root, files)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertTrue(all((root / "current" / path).is_file() for path in files))

    def test_indexnow_verification_file_must_match_its_name(self):
        filename = f"{INDEXNOW_KEY}.txt"
        for content, expected in ((INDEXNOW_KEY.encode("ascii"), 0), (b"wrong", 1)):
            with self.subTest(expected=expected), tempfile.TemporaryDirectory() as directory:
                root = Path(directory)
                (root / "releases").mkdir()
                result = self.publish(root, PAGES + [ASSET, filename], {filename: content})
                self.assertEqual(result.returncode, expected, result.stderr)

    def test_unexpected_files_are_rejected(self):
        for path in ("en/other/index.html", "cv/../private.pdf", "cv/nested/private.pdf", "private.pdf", "private.txt", "en/private.md", "fonts/private.woff2"):
            with self.subTest(path=path), tempfile.TemporaryDirectory() as directory:
                root = Path(directory)
                (root / "releases").mkdir()
                result = self.publish(root, PAGES + [ASSET, path])
                self.assertEqual(result.returncode, 1)
                self.assertIn(b"Invalid release contents", result.stderr)
                self.assertFalse((root / "current").exists())

    def test_additional_pages_cannot_replace_astro_assets(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "releases").mkdir()
            result = self.publish(root, PAGES + ["en/index.html"])
            self.assertEqual(result.returncode, 1)
            self.assertIn(b"Release requires both pages and Astro assets", result.stderr)


if __name__ == "__main__":
    unittest.main()
