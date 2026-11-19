# Performance and accessibility

## Performance design

```mermaid
flowchart LR
  Source[Single portrait source] --> Build[Astro image pipeline]
  Build --> Variants[Six WebP widths]
  HTML[HTML width, height, sizes and srcset] --> Browser
  Variants --> Browser[Browser selects one candidate]
```

The build emits static HTML and hashed assets. Use system fonts, reserve image dimensions, prioritize the home portrait, and lazy-load the interview portrait. The analytics producer uses native browser APIs and a bounded queue. With Sentry disabled, the measured pages load only same-origin resources.

The original JPEG was 197,551 bytes. The largest generated candidate is 1200 px wide; a replacement source can keep the current aspect ratio at approximately 1200 × 1029 px. The generated WebP files span 6,002–42,300 bytes. At desktop and mobile widths the browser selects one candidate, not the entire set.

## Measured baseline

Lighthouse 13.6.0 used its default mobile profile against the static build on loopback with Sentry disabled. These are local lab results.

| Route | Performance | Accessibility | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 100 | 100 | 1.20 s | 0 | 0 ms |
| Interview | 100 | 100 | 1.20 s | 0 | 0 ms |

Chrome requested 6,002 bytes for the home portrait at a 320 px viewport, 10,898 bytes at 390 px, and 24,146 bytes at 1440 px, at device scale factor 1. The uncompressed JavaScript asset bodies total about 0.86 KB on home and 2.06 KB on a fresh interview load. Navigating from home reuses the shared modules and adds about 1.20 KB. Inline scripts, if any, are part of the HTML and excluded from those asset totals. Production hosting and field Core Web Vitals remain unmeasured.

## Audit the right server

The default `docker compose up --build` serves a freshly built static preview on port 4321, with minified bundles and negotiated gzip for eligible responses. Tiny assets may be served without gzip. Run Lighthouse against that default in a clean Chrome profile. Development is opt-in through `npm run dev` or the [Compose development override](WORKFLOWS.md#local-development-and-worktrees). Its hot reload client and unminified modules belong to the development workflow.

Before the default switched to static preview, a Lighthouse 13.5.0 DevTools report targeted `/#experiencia` on port 4321. It recorded 58 for performance and 1,792 KiB of page transfers. The waterfall included Vite, Astro's toolbar modules and a browser extension. Lighthouse observed FCP at 0.27 s and LCP at 0.81 s, then estimated 7.4 s and 11.7 s under simulated mobile throttling.

A repeat on the same anchor with Lighthouse 13.6.0 mobile, a clean Chrome profile and Sentry disabled produced these lab measurements:

| Server | Performance | FCP | LCP | Page transfers |
| --- | ---: | ---: | ---: | ---: |
| Development, toolbar disabled | 100 | 0.83 s | 0.83 s | 352 KiB |
| Docker static preview | 100 | 0.77 s | 1.23 s | 26 KiB |

The waterfall confirmed zero toolbar requests in both runs. Only development requested the Vite client. Both rechecks scored 100 for accessibility and SEO, and 96 for best practices due to the browser's favicon request returning 404.

### November 18, 2026 DevTools comparison

Both reports used Lighthouse 13.5.0 on mobile at `http://127.0.0.1:4321/#experiencia` with simulated throttling. Chrome recorded a browser-extension request in both waterfalls. Page transfer totals below are from Lighthouse's page-weight audit.

| Local server mode | Performance | FCP | LCP | Page transfers | JavaScript minification |
| --- | ---: | ---: | ---: | ---: | --- |
| Development, toolbar disabled | 90 | 2.80 s | 2.88 s | 347 KiB | Flagged development modules |
| Optimized static preview | 100 | 1.07 s | 1.22 s | 24 KiB | Passed |

The optimized report also scored 100 for accessibility, best practices and SEO, with 0 ms TBT and 0 CLS. It loaded the hashed browser bundles and a 17,526-byte WebP portrait. These are local lab measurements.

## Accessibility behavior

Both pages have semantic landmarks, a keyboard-visible skip link, visible focus styles and reduced-motion support. The interview labels its input and keeps the ordered history inside a live region, preserving list semantics. Opening the preview focuses the question field. Closing it clears the history and returns focus to the start button.

Chrome and axe checks passed on both routes at 320, 390 and 1440 px, including the open preview with a populated history. The browser check exercised Tab, Enter, focus restoration, reduced motion and horizontal reflow. [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) is the target. Automated checks and keyboard testing are partial evidence, and no screen-reader conformance review has been completed.

## Repeat the checks

1. Run `npm run verify` and serve the static build with `npm run preview -- --host 127.0.0.1 --port 4387`. Use an empty Sentry DSN.
2. Audit both routes with Lighthouse mobile. Compare LCP, CLS and blocking time using the same browser and throttling profile. Inspect selected image and JavaScript bytes in the network panel.
3. Run axe with the preview closed and populated. Use keyboard-only navigation at 320 px and desktop widths. Check reduced motion, focus, list announcements and reflow. Recheck with a screen reader before public release.
4. Inspect `window.dataLayer` and the network panel after adding a synthetic question. Events should contain action metadata only, and analytics should cause no requests.

## Automatic color scheme preview

The bilingual portfolio and both interview routes follow `prefers-color-scheme` via CSS. A headless Chrome check changed the preference live on all four routes at viewport widths of 320 and 1440 pixels. The background token switched between the approved dark and light values, and the pages fit both widths. The interview was checked with the local preview open.

At 1440 pixels, axe reported no automated color contrast violations on those routes in either scheme. Photo captions keep their dark overlays. The light theme uses a stronger border on secondary buttons and inputs to make controls distinguishable from the surrounding surface. Lighthouse and visual comparison against the final landing remain release checks.

The visible theme selector offers System, Light and Dark. The browser stores only an explicit choice in first-party local storage under `mi-cv:theme`. Selecting System clears the key. A choice can still apply to the current page when storage is blocked, and the CSS follows the system when scripts are disabled. Chrome checks covered keyboard focus, both explicit values, navigation and reload, the system fallback, and the four pages at 320 and 1440 pixels. Axe reported no color contrast violations in the tested light theme states.

## Landing v4

Chrome verified both locales at 360×800, 390×844, 1280×800, 1440×900 and 1920×1080. The hero title, description, portrait and interview action fit the initial viewport. The sticky header remained visible and section anchors landed below it. The static output rendered the role points and tags from both local copy files. The mobile check also opened the interview, added a suggested question and verified that closing the preview cleared it and restored focus.

Axe reported zero automated violations on both landings at 390 and 1280 pixels in the light and navy schemes. Lighthouse 13.6.0 mobile scored both local static pages 100 for performance and 100 for accessibility, with an LCP of 0.8 s. External requests were blocked for the local audits.

PDFKit and PyMuPDF text extraction found an email address and a phone number in each supplied CV. Pablo subsequently authorized keeping both fields inside the original CV PDFs for public download. The certificate files have yet to be supplied for review.
## Recorded avatar on the interview page

Local Lighthouse mobile simulation in Chrome compared the previous interview
preview with the static build served through Caddy. Performance and
accessibility both scored 100 in each run. LCP was 1.2 s before and 0.8 s
with the avatar poster. These are single local runs. The video and hls.js
were requested only after player activation.

Browser smoke checks covered keyboard activation, video playback and the
local chat lifecycle at 1440 px and 375 px in Chrome. A rejected manifest
request restored the poster and retry control. Firefox exercised hls.js.
Playwright WebKit exercised native HLS at desktop and mobile viewport sizes.
Physical iOS Safari and production delivery remain release checks.

The landing hero was checked in Chrome at 1440 px and 375 px. The responsive
portrait loaded before any media request and playback began from the keyboard.
The portrait stayed visible with HLS and MSE disabled, JavaScript disabled, and
a rejected manifest request. The interview smoke checks passed after reusing
the same fallback there.

The fragmented MP4 version retained all 1,187 source video frames in each
rendition. Chrome (native and hls.js), Firefox and Playwright WebKit played at
normal speed from the first frame through the end of the 47.48 s recording.
Firefox's initial buffer adjustment was verified to stay within the first
frame. The supplied poster loads as WebP and remains visible if playback fails.

The #5 integration was tested on both localized landings and interview pages
through a local Caddy instance. Chrome played the fragmented HLS stream
after keyboard activation and restored the poster with a retry after a 403.
Caddy returned 403 for a request without a Referer and 200 with the local
site Referer. The local question history still cleared on close. Both approved CV PDFs return HTTP 200. The header opens the active locale’s PDF in a new tab.

## November 19, 2026 landing review

Chrome exercised all six static routes at 320, 390, 1280 and 1440 CSS pixels
with both colour schemes and reduced motion. The storage notice sits in the
document flow. It did not overlap controls, and both chat previews closed,
cleared the question history and restored focus with the notice visible. Axe
reported zero violations in the tested WCAG rules. The two HLS streams played
with their matching WebVTT track and active timed cues on both route types.

Mobile Lighthouse runs against the revised static build scored 100/99 for
performance in Spanish/English. LCP was 1.87/1.95 s and CLS was 0.001/0.033.
Accessibility, best practices and SEO each scored 100 in both languages. At
412 CSS pixels and DPR 1.75, the browser selected a 57.2 KiB WebP, down from
64.7 KiB. These are local runs with simulated mobile throttling.

In a separate local A/B test, two runs with the external stylesheet painted in
0.75–0.76 s. Two runs with the stylesheet inlined painted in 0.79–0.80 s.
Preloading Geist in a four-run follow-up left first paint at approximately
0.75 s and showed no consistent change in LCP. The site keeps the cacheable
stylesheet and discovers fonts through it.

The ProfilePage build matched both approved JSON-LD examples in issue #5.
The stable portrait returned HTTP 200 on the Caddy preview at port 4466.
Mobile Lighthouse on both landing routes scored 100 for performance, with
LCP of 1.81 s in each language and no image delivery items.

The AVIF follow-up kept the exact 9:16 geometry and WebP fallback. Chrome
selected the 648 × 1152 AVIF in the English mobile Lighthouse run. It
transferred 42.5 KiB of image data, down from 57.7 KiB for the matching
WebP. This local run scored 100 with an LCP of 1.67 s and no image delivery
items. Chrome also decoded the WebP fallback and played the HLS recording
in the mobile and desktop checks.
