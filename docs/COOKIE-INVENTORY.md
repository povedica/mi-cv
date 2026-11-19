# Cookie and browser storage inventory

Production baseline from November 18, 2026, for #25. A fresh Chrome context opened the Spanish home and interview on `cv.reflexionia.com`. The interview check opened the preview, selected and added a suggested question, and closed the preview. The test downloaded the Umami script and intercepted collector POSTs before network delivery.

| Feature | Browser storage observed | Evidence and scope |
| --- | --- | --- |
| Home and Cloudflare edge | No cookies, local storage or session storage | Observed on a clean visit under normal traffic conditions. Challenge responses were outside this run. |
| Self-hosted Umami | No cookies, local storage or session storage | Tracker loaded and attempted collector POSTs. Collector responses and dashboard storage are outside this run. |
| Interview preview | No cookies, local storage or session storage | Questions appeared in the current document and the local history cleared on close. |
| Sentry | No storage observed during the tested flows | No error was triggered. |
| Cookie notice integrated in #5 | First-party local storage for acknowledgement | Preview implementation stores `1` at `mi-cv:cookie-notice:v1` until site data is cleared or a new notice version is introduced. Dismissal still works for the current page when storage is blocked. |

| Theme preference | First-party local storage after manual selection | Stores `light` or `dark` at `mi-cv:theme` until the visitor selects System in the interview or clears site data. |

The English routes were absent from this production baseline. Repeat the inventory after the bilingual release across both languages and the policy routes. Keep the text aligned with measured behavior and use LinkedIn as the contact channel specified in #25.

See the [AEPD cookie guide](https://www.aepd.es/guias/guia-cookies.pdf) for the distinction between technical storage, user preferences and analytics.

Local browser checks exercised the notice in both languages, followed the policy link at a 320-pixel viewport, dismissed it with Enter, verified focus on the main content, confirmed that the dismissal survived navigation between languages, and tested the blocked-storage fallback. Both policy routes are included in the sitemap and the receiver allowlist. Repeat the storage inventory against all six routes after the production release.
