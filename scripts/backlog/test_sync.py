import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest


SCRIPT = Path(__file__).with_name("sync.sh").resolve()
REPO = "povedica/mi-cv"


class SyncTest(unittest.TestCase):
    def setUp(self):
        directory = tempfile.TemporaryDirectory()
        self.addCleanup(directory.cleanup)
        self.log = Path(directory.name) / "mutations"
        gh = Path(directory.name) / "gh"
        gh.write_text("""#!/bin/bash
set -eu
case "$1 $2" in
  "pr view") printf '%s' "$PR_RESPONSE" ;;
  "api graphql") printf '%s' "$MERGED_RESPONSE" ;;
  "api user") test "$GH_TOKEN" = test-project-token; echo povedica ;;
  "project view") echo project-id ;;
  "project field-list")
    echo '{"fields":[{"name":"Status","id":"status","options":[{"name":"Hecho","id":"done"}]}]}'
    ;;
  "project item-list") printf '%s' "$ITEMS" ;;
  "project item-edit")
    test "$GH_TOKEN" = test-project-token
    echo "$*" >> "$MUTATIONS"
    ;;
  *) exit 2 ;;
esac
""")
        gh.chmod(0o755)
        self.env = {
            **os.environ,
            "PATH": f"{directory.name}:{os.environ['PATH']}",
            "REPO": REPO,
            "PROJECT_NUMBER": "3",
            "GH_TOKEN": "test-repo-token",
            "PROJECT_TOKEN": "test-project-token",
            "MUTATIONS": str(self.log),
        }

    def run_sync(self, mode, **responses):
        env = {**self.env, **{key: json.dumps(value) for key, value in responses.items()}}
        return subprocess.run(
            ["bash", str(SCRIPT), mode, "10"],
            env=env,
            text=True,
            capture_output=True,
            check=False,
        )

    def test_pr_requires_closes_on_first_line(self):
        for body, labels, expected in [
            ("Closes #4\nCambio", [], 0),
            ("Cambio\nCloses #4", [], 1),
            ("", [{"name": "sin-backlog"}], 0),
        ]:
            with self.subTest(body=body, labels=labels):
                result = self.run_sync("check", PR_RESPONSE={"body": body, "labels": labels})
                self.assertEqual(result.returncode, expected, result.stderr)
                self.assertFalse(self.log.exists())

    def test_merge_filters_repository_and_preserves_paused_and_done(self):
        other_repo = "povedica/other"
        nodes = [
            {"number": number, "repository": {"nameWithOwner": repo}}
            for number, repo in [(4, REPO), (5, other_repo), (6, REPO), (7, REPO)]
        ]
        merged = {"data": {"repository": {"pullRequest": {
            "merged": True,
            "closingIssuesReferences": {"nodes": nodes},
        }}}}
        items = [
            {"id": item, "status": status, "content": {
                "type": "Issue", "number": number, "repository": repo,
            }}
            for item, number, repo, status in [
                ("target", 4, REPO, "En revisión"),
                ("foreign", 4, other_repo, "En revisión"),
                ("unrelated", 5, REPO, "En curso"),
                ("paused", 6, REPO, "Pausada"),
                ("done", 7, REPO, "Hecho"),
            ]
        ]
        result = self.run_sync("merged", MERGED_RESPONSE=merged, ITEMS={"items": items})
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(
            self.log.read_text().splitlines(),
            ["project item-edit --id target --project-id project-id "
             "--field-id status --single-select-option-id done"],
        )
