# Editorial record format

Each fragment represents a verifiable fact or case. The proposed format is Markdown with YAML front matter. The Markdown body becomes `body` in the normalized record. The future ingestion service owns file parsing.

| Field | Purpose |
| --- | --- |
| `id`, `version` | Stable identifier and positive integer revision |
| `title`, `kind`, `locale` | Editorial title, type (`role`, `project`, `capability`, `preference`) and language |
| `author`, `createdAt`, `source` | Author, creation date and internal verification reference |
| `status` | `draft` → `review` → `approved` → `published` |
| `visibility` | Starts as `private`. Moving to `public` requires explicit approval. |
| `approval` | Null or the exact approved revision, with `by`, `at` and `version` |
| `publishedAt`, `validFrom`, `validUntil` | UTC ISO timestamps with milliseconds or null. Expiry is exclusive. |

The owner reviews and approves the exact text and its visibility. Edits create a draft revision with no approval. Internal sources and confidential body content stay outside the public index. Ingestion will select the latest published revision per ID, validate editorial authorization and metadata, and apply `toPublicEvidence`. Revocation and expiry must remove fragments from the index and caches. Local drafts are excluded from Git, Docker and static output.
