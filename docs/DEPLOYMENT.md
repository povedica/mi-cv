# Production deployment

The target is `https://cv.reflexionia.com`. GitHub Actions builds the two Astro pages and their assets on demand. The shared Caddy edge serves those files over HTTPS. There is no app container or runtime secret. The production build leaves the Sentry DSN empty and has no analytics collector.

## Provisioning

1. Confirm that the DNS records for the domain point to the shared edge and that any IPv6 address is served by that edge. Verify the SSH host key against a trusted server-side fingerprint before configuring Actions.
2. On the VPS, create a separate SSH account such as `mi-cv-deploy` with a usable shell for OpenSSH forced commands and no password login, sudo, or Docker group membership. Install `deploy/release.py` as a root-owned file at `/usr/local/lib/mi-cv/release.py`. Create `/etc/caddy/sites/mi-cv` and its `releases` subdirectory, owned by the deployment account and readable by Caddy. Keep the parent `/etc/caddy/sites` and Caddy configuration outside that account's write permissions. This subtree is already reachable through the edge container's read-only sites mount.
3. Install a dedicated Actions public key in the new account's authorized keys with the following options. Keep the authorized keys file outside the account's write permissions. Test that an interactive session, port forwarding, and commands other than `publish <sha>` are denied.

   ```text
   restrict,command="/usr/bin/python3 /usr/local/lib/mi-cv/release.py /etc/caddy/sites/mi-cv" ssh-ed25519 <public-key>
   ```

4. As an edge operator, install `deploy/cv.caddy` at `/etc/caddy/sites/cv.caddy`. Confirm the live edge configuration and validate the full Caddyfile in its running container with `caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile`. If successful, run `caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile` inside that container. Check the existing sites before and after. If validation or reload fails, withdraw the new snippet and check the active configuration. Coordinate separately if the edge cannot reload.
5. Create the GitHub environment `production` and restrict deployments to `main`. Set the environment secret and variables below. Keep the private key in the credential manager and load it into the environment secret through standard input or the GitHub UI.

| Type | Name | Value |
| --- | --- | --- |
| Secret | `DEPLOY_SSH_KEY` | Private key for the forced-command account |
| Variable | `DEPLOY_SSH_HOST` | SSH hostname or IPv4 address of the VPS |
| Variable | `DEPLOY_SSH_PORT` | SSH port, typically `22` |
| Variable | `DEPLOY_SSH_USER` | Dedicated deployment username |
| Variable | `DEPLOY_SSH_KNOWN_HOSTS` | Verified known-hosts entry for that host and port. For a nonstandard port, use the `[host]:port` format. |

## Release and verification

After editorial approval, run **Deploy production** from the Actions tab and select `main`. The workflow runs `npm run verify` before sending an archive over host-key-verified SSH. The receiver accepts the two HTML files and regular Astro CSS, JavaScript and WebP files. It stages a release under the full commit SHA and atomically replaces the `current` symlink under a server-side lock. Re-running a SHA reuses the first accepted release for that SHA. Each deploy checks HTTP 200 and compares the bytes of both pages and every asset over HTTPS.

If the HTTPS check fails, inspect the reported route, the live symlink and the Caddy logs. The published release stays active until an operator switches it. Access logs belong to the shared edge.

## Rollback

From the VPS, record the active symlink and choose the full SHA of a retained, known-good release. As the deployment account via an operator with the necessary sudo access, run:

```sh
sudo -u mi-cv-deploy python3 /usr/local/lib/mi-cv/release.py \
  /etc/caddy/sites/mi-cv rollback <known-good-sha>
```

Check both routes and their assets over HTTPS. Application rollback changes only the symlink. If there is no previous release, withdraw only the mi-cv site snippet, validate and reload Caddy, and verify the existing sites. Keep a known-good release on disk before pruning older releases. Rotate or revoke the dedicated SSH key independently of other services.
