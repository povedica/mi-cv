import type { AnalyticsEvent } from './data-layer.ts';

declare global {
  interface Window {
    umami?: {
      track(name: string, data?: Record<string, string>): void | Promise<unknown>;
    };
  }
}

export function forwardToUmami(event: AnalyticsEvent) {
  try {
    const client = window.umami;
    if (!client) return;

    let result;
    switch (event.event) {
      case 'page_view':
        // Umami records the document view automatically.
        return;
      case 'cv_download':
        result = client.track('cv-download', { lang: event.lang });
        break;
      case 'language_change':
        result = client.track('language-change', { from: event.from, to: event.to });
        break;
      case 'interview_link_click':
        result = client.track('interview-link-click', { placement: event.placement });
        break;
      case 'interview_preview_open':
        result = client.track('interview-open');
        break;
      case 'interview_preview_question_added':
        result = client.track('interview-question-sent');
        break;
      case 'interview_preview_close':
        result = client.track('interview-close');
        break;
      case 'linkedin_click':
        result = client.track('linkedin-click');
        break;
      case 'contact_click':
        result = client.track('contact-click');
        break;
    }
    void Promise.resolve(result).catch(() => {});
  } catch {
    // An unavailable tracker must never interrupt a visitor action.
  }
}
