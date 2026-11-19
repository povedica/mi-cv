## ADDED Requirements

### Requirement: On-demand playback of a labelled recording

The interview page SHALL show an AI label and a static poster and SHALL defer
HLS requests until the visitor activates playback.

#### Scenario: Visitor opens the interview

- **WHEN** the visitor opens the interview page
- **THEN** the poster and AI label are visible without requesting HLS media

#### Scenario: Media is unavailable

- **WHEN** the stream fails to load
- **THEN** the player restores the poster and offers a retry

### Requirement: Independent media delivery

The edge SHALL serve versioned HLS playlists and segments independently of the
site release and require the same-site Referer.

#### Scenario: Request lacks a permitted Referer

- **WHEN** a media URL is requested without a same-site Referer
- **THEN** the edge returns HTTP 403
