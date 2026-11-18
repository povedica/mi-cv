// Target HTTP contract. The static site does not call these endpoints.
export interface ChatSession {
  id: string;
  expiresAt: string;
}

export interface ChatQuestion {
  text: string;
  locale: 'es';
}

export interface Citation {
  id: string;
  version: number;
  title: string;
}

export type ChatReply =
  | { kind: 'answer'; text: string; citations: [Citation, ...Citation[]] }
  | { kind: 'abstention'; text: string };

export type ChatErrorCode =
  | 'invalid_question'
  | 'session_expired'
  | 'rate_limited'
  | 'unavailable';

export interface ChatError {
  code: ChatErrorCode;
}
