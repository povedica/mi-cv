## Decisions

Use FFmpeg for aligned H.264 and AAC renditions and serve versioned files from
the existing Caddy edge. Use native HLS where supported and a lazily loaded
hls.js bundle elsewhere. Keep media caches private and validate Referer and
Origin at the edge. See the deployment runbook for limits and rollback.
