## ADDED Requirements

### Requirement: Production Umami delivery

The shared page head SHALL configure automatic Umami page views scoped to the production hostname. The data layer SHALL forward interaction events using the approved mapping and dimensions in `docs/ANALYTICS.md`.

#### Scenario: Interview question added

- **WHEN** a visitor adds a nonblank question to the preview history
- **THEN** the adapter tracks `interview-question-sent` without any custom data

#### Scenario: Tracker is unavailable

- **WHEN** the tracker is missing or tracking fails
- **THEN** navigation and the preview continue to work

#### Scenario: Local or preview host

- **WHEN** the document hostname is outside the configured production domain
- **THEN** Umami sends no page views or custom events

## MODIFIED Requirements

### Requirement: Limit analytics collection

The data layer SHALL accept only approved event names and dimensions and preserve up to 64 queue entries per document. Only the approved adapter SHALL forward custom events to the collector. The application SHALL use no persistent storage for analytics.

#### Scenario: The queue or downstream consumer is unavailable

- **WHEN** the queue is full or a consumer throws during append
- **THEN** the application continues the visitor's action without adding a fallback transmission

#### Scenario: Visitor enters a question

- **WHEN** a valid question is added to the preview
- **THEN** the local analytics event contains the action and page identifier without the question, URL, or visitor identifier
