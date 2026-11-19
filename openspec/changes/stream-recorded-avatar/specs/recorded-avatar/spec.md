## ADDED Requirements

### Requirement: On-demand playback of a labelled recording

The landing hero and interview page SHALL show an AI label and a static poster and SHALL defer
HLS requests until the visitor activates playback.

#### Scenario: Visitor opens the landing or interview

- **WHEN** the visitor opens either page
- **THEN** the poster and AI label are visible without requesting HLS media

#### Scenario: Visitor enables captions

- **WHEN** the visitor enables captions during playback
- **THEN** the player presents synchronised captions in the language of the recording

#### Scenario: Media is unavailable

- **WHEN** the stream fails to load
- **THEN** the player restores the poster and offers a retry

#### Scenario: Browser cannot play the stream

- **WHEN** a browser lacks native HLS and Media Source Extensions
- **THEN** the approved portrait remains visible

### Requirement: Independent media delivery

The edge SHALL serve versioned HLS playlists and segments independently of the
site release and require the same-site Referer.

#### Scenario: Request lacks a permitted Referer

- **WHEN** a media URL is requested without a same-site Referer
- **THEN** the edge returns HTTP 403
