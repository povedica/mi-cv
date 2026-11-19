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


class ReleaseTest(unittest.TestCase):
    def publish(self, root, files):
        archive = io.BytesIO()
        with tarfile.open(fileobj=archive, mode="w") as tar:
            for path in files:
                member = tarfile.TarInfo(path)
                member.size = 4
                tar.addfile(member, io.BytesIO(b"test"))
        return subprocess.run(
            [sys.executable, str(RECEIVER), str(root), "publish", SHA],
            input=archive.getvalue(), capture_output=True,
        )

    def test_landing_files_are_accepted(self):
        files = PAGES + [
            ASSET, "_astro/Geist-latin.Ast12.woff2", "en/index.html", "en/interview/index.html", "cv/public-en.pdf",
            "certificados/public.pdf", "sitemap.xml", "robots.txt", "og.png", "og.jpg",
        ]
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "releases").mkdir()
            result = self.publish(root, files)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertTrue(all((root / "current" / path).is_file() for path in files))

    def test_unexpected_files_are_rejected(self):
        for path in ("en/other/index.html", "cv/../private.pdf", "cv/nested/private.pdf", "private.pdf", "fonts/private.woff2"):
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
