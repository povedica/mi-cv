# Production deployment

The target is `https://cv.reflexionia.com`. GitHub Actions builds the six localized Astro pages and their assets on demand. The shared Caddy edge serves those files over HTTPS. There is no app container or runtime secret. Browser error reporting is opt-in through the [Sentry configuration](WORKFLOWS.md#sentry). There is no analytics collector.

## Provisioning

1. Confirm that the DNS records for the domain point to the shared edge and that any IPv6 address is served by that edge. Verify the SSH host key against a trusted server-side fingerprint before configuring Actions.
2. Use the existing `deploy` account on the VPS. This account already has infrastructure duties. Restrict the mi-cv Actions key to the root-owned receiver and preserve existing authorized keys. Install `deploy/release.py` as a root-owned file at `/usr/local/lib/mi-cv/release.py`. Create `/etc/caddy/sites/mi-cv` and its `releases` subdirectory, owned by the deployment account and readable by Caddy. Keep the parent `/etc/caddy/sites` and Caddy configuration outside that account's write permissions. This subtree is already reachable through the edge container's read-only sites mount.
3. Install a dedicated Actions public key in the new account's authorized keys with the following options. Append the restricted key as its own entry in the existing authorized keys file. Keep the receiver and the Caddy configuration root-owned. Test that an interactive session, port forwarding, and commands other than `publish <sha>` are denied.

   ```text
   restrict,command="/usr/bin/python3 /usr/local/lib/mi-cv/release.py /etc/caddy/sites/mi-cv" ssh-ed25519 <public-key>
   ```

4. As an edge operator, install `deploy/cv.caddy` at `/etc/caddy/sites/cv.caddy`. Confirm the live edge configuration and validate the full Caddyfile in its running container with `caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile`. If successful, run `caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile` inside that container. Check the existing sites before and after. If validation or reload fails, withdraw the new snippet and check the active configuration. Coordinate separately if the edge cannot reload.
5. Create the GitHub environment `production` and restrict deployments to the `production` branch. Set the environment secret and variables below. Keep the private key in the credential manager and load it into the environment secret through standard input or the GitHub UI.

| Type | Name | Value |
| --- | --- | --- |
| Secret | `DEPLOY_SSH_KEY` | Dedicated private key for the mi-cv forced-command entry |
| Variable | `DEPLOY_SSH_HOST` | SSH hostname or IPv4 address of the VPS |
| Variable | `DEPLOY_SSH_PORT` | SSH port, typically `22` |
| Variable | `DEPLOY_SSH_USER` | `deploy` |
| Variable | `DEPLOY_SSH_KNOWN_HOSTS` | Verified known-hosts entry for that host and port. For a nonstandard port, use the `[host]:port` format. |

## Release and verification

Use `main` for integration. After editorial approval and a passing build on the chosen commit, promote that revision by fast-forwarding `production`. For a subsequent release, run:

```sh
git fetch origin main production
git merge-base --is-ancestor origin/production origin/main
git push origin refs/remotes/origin/main:refs/heads/production
```

Run **Deploy production** from the Actions tab and select `production`. The workflow runs `npm run verify` before sending an archive over host-key-verified SSH. The receiver requires the Spanish home and interview and at least one regular Astro CSS, JavaScript or WebP asset. Its allowlist also accepts the English home and interview, `sitemap.xml`, `robots.txt`, `og.png`, `og.jpg` and public PDFs directly under `cv/` and `certificados/`. Exercise the allowlist locally with `python3 tests/release.test.py`. It stages a release under the full commit SHA and atomically replaces the `current` symlink under a server-side lock. Re-running a SHA reuses the first accepted release for that SHA. Each deploy checks HTTP 200 and compares the bytes of all files in the release over HTTPS.

If the HTTPS check fails, inspect the reported route, the live symlink and the Caddy logs. The published release stays active until an operator switches it. Access logs belong to the shared edge.

## Cloudflare cache

Keep the existing Caddy origin address on the `cv` DNS record and enable Cloudflare proxying for that record. Use Full (strict) TLS from Cloudflare to Caddy. Keep changes scoped to `cv.reflexionia.com` so other hosts keep their own settings.

Add a Cache Rule that makes `/` and `/interview/` eligible for caching on this host when the query string is empty. Respect the origin cache headers and the standard cache key. Caddy allows shared caches to serve HTML for five minutes. GitHub Actions checks the new HTML on a release-specific query string and compares all deployed files with the build. The example address on the demo card uses Cloudflare’s inline email-obfuscation opt-out so the edge preserves its HTML.

Caddy serves fingerprinted assets from the shared `assets/_astro` directory. The receiver adds a release's assets before switching the HTML. This keeps earlier HTML usable while it remains in cache or a browser tab. Keep assets for retained releases and avoid automatic asset pruning without a retention review.

Verify fresh requests to both routes return HTTP 200 over HTTPS and repeated requests report `CF-Cache-Status: HIT`. If immediate invalidation is needed, purge only the two HTML URLs. To remove the cache configuration, disable this hostname's Cache Rule and return only the `cv` DNS record to DNS-only.

## Rollback

From the VPS, record the active symlink and choose the full SHA of a retained, known-good release. From an operator SSH session as `deploy`, run:

```sh
python3 /usr/local/lib/mi-cv/release.py \
  /etc/caddy/sites/mi-cv rollback <known-good-sha>
```

Check both routes and their assets over HTTPS. Application rollback changes only the symlink. If there is no previous release, withdraw only the mi-cv site snippet, validate and reload Caddy, and verify the existing sites. Keep a known-good release on disk before pruning older releases. Rotate or revoke the dedicated SSH key independently of other services.

## Avatar video

The landing hero and interview play HLS from the existing Hetzner VPS and Caddy edge. This adds
no streaming subscription and retains control of the files, versioned URLs and
player presentation. HLS offers adaptive bitrate playback when bandwidth
changes. YouTube would add third-party branding and recommendations. Managed
video services such as Cloudflare Stream or Bunny Stream would add a recurring
bill. Self-hosting puts transcoding, traffic, storage and monitoring on the
site operator. Review usage before publishing additional or longer videos.

HLS makes casual downloads less convenient. It provides no DRM. A client that
can play the video can also retain or reconstruct its segments. The Referer
check limits direct navigation and casual hotlinking. Clients can forge headers.

1. With FFmpeg and ffprobe installed, run the following command outside the release build.
   Use a new output directory and keep both the source and output outside Git.

   ```sh
   ./scripts/video-to-hls.sh src/assets/avatar-pablo-poveda-720p.mp4 /tmp/avatar-v2
   ./scripts/video-to-hls.sh src/assets/avatar-pablo-poveda-720p-en.mp4 /tmp/avatar-v3
   ```

2. As the edge operator, upload the generated directory to staging on the VPS
   over host-key-verified SSH. Install it under
   `/etc/caddy/sites/mi-cv-media/avatar/v2/` for Spanish or
   `/etc/caddy/sites/mi-cv-media/avatar/v3/` for English, with read access for Caddy.
   Verify the directory includes the master playlist, the three renditions and
   the initialization MP4 referenced by each rendition. The HLS media uses
   fragmented MP4. The converter pads the source audio tail to keep the last
   video frames playable.
   Use a new version and update the player URL for any replacement.
3. Add the media route to the active site snippet, preserving existing HTML
   and asset handlers. Validate and reload the full running Caddy
   configuration as described in [Provisioning](#provisioning). Bypass shared
   CDN caching for `/media/*` on this hostname so the origin can check headers.
   Media responses cache privately in the browser.
4. Verify playback from the landing and interview on Chrome, Firefox and Safari on desktop
   and Safari on iOS. Throttle the connection and inspect rendition requests.
   Verify no media requests occur before activating the player. Check that the
   master and a segment return 403 without a Referer and 200 with a same-site
   Referer. Check the MIME types and confirm directory paths return 404 with
   the interview Referer. Verify the other sites after the reload.
5. To roll back, restore the previous site snippet and web release, or switch
   the player URL to a retained version. Validate the full Caddyfile again.

The current source is 720 × 1280. Rendition names refer to the short edge
for portrait video. The 1080p rendition is an upscale included for
the agreed rendition ladder. It adds no source detail. The player uses the
approved portrait cropped to 9:16 as a responsive AVIF poster with WebP fallback. Same-language
WebVTT captions ship with the static release. Update the caption track and
the receiver allowlist when replacing a recording with a new media version.
