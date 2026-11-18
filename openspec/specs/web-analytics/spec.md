# web-analytics Specification

## Purpose

Provide a stable, privacy-minimized browser event contract for aggregate portfolio traffic and interview preview engagement. An approved adapter can consume these events for a dashboard.

## Requirements

### Requirement: Emit versioned web analytics events
The site SHALL append schema version 1 events to the in-memory data layer for each document view, marked interview link activation, and successful open, add-question, and close action in the preview.

#### Scenario: Visitor uses the interview preview
- **WHEN** a visitor opens the preview, adds a nonblank question, and closes it
- **THEN** the application appends the corresponding events using the fixed interview page identifier

#### Scenario: Visitor uses a marked home interview link
- **WHEN** a visitor activates one of the marked interview links on the home page
- **THEN** the application appends the link event with its predefined placement and preserves native navigation

### Requirement: Limit analytics collection
The producer SHALL accept only approved event names and dimensions, preserve up to 64 queue entries per document, and perform no network or persistent storage operations.

#### Scenario: The queue or downstream consumer is unavailable
- **WHEN** the queue is full or a consumer throws during append
- **THEN** the application continues the visitor's action without adding a fallback transmission

#### Scenario: Visitor enters a question
- **WHEN** a valid question is added to the preview
- **THEN** the analytics event contains the action and page identifier without the question, URL, or visitor identifier
