# Cookie and browser storage inventory

Production baseline from November 18, 2026, for #25. A fresh Chrome context opened the Spanish home and interview on `cv.reflexionia.com`. The interview check opened the preview, selected and added a suggested question, and closed the preview. The test downloaded the Umami script and intercepted collector POSTs before network delivery.

| Feature | Browser storage observed | Evidence and scope |
| --- | --- | --- |
| Home and Cloudflare edge | No cookies, local storage or session storage | Observed on a clean visit under normal traffic conditions. Challenge responses were outside this run. |
| Self-hosted Umami | No cookies, local storage or session storage | Tracker loaded and attempted collector POSTs. Collector responses and dashboard storage are outside this run. |
| Interview preview | No cookies, local storage or session storage | Questions appeared in the current document and the local history cleared on close. |
| Sentry | No storage observed during the tested flows | No error was triggered. |
| Cookie notice proposed in #25 | First-party local storage for acknowledgement | Planned. The key, expiry and blocked-storage behavior must be verified with the implemented notice. |

The English routes were absent from this production baseline. Repeat the inventory after the bilingual release across both languages and the policy routes. Keep the text aligned with measured behavior and use LinkedIn as the contact channel specified in #25.

See the [AEPD cookie guide](https://www.aepd.es/guias/guia-cookies.pdf) for the distinction between technical storage, user preferences and analytics.
