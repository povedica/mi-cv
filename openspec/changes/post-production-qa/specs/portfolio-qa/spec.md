## ADDED Requirements

### Requirement: Legacy analytics validation

The browser data layer SHALL validate allowlisted analytics events without Object.hasOwn.

#### Scenario: Analytics runs in an older browser

- **WHEN** Object.hasOwn is absent and the landing page emits an event
- **THEN** valid events are retained and inherited keys are rejected

### Requirement: Mobile overlays

The landing page SHALL keep a compact cookie notice above the mobile action dock and change dock visibility without animation.

#### Scenario: Visitor scrolls on mobile

- **WHEN** the visitor scrolls down with focus outside the dock and subsequently scrolls up
- **THEN** the dock hides on descent and returns on ascent while the cookie notice remains clear of it

### Requirement: Localized social previews

Each static landing page SHALL provide the approved description and locale-specific social image metadata.

#### Scenario: Crawler requests either landing route

- **WHEN** a crawler reads the Spanish or English HTML
- **THEN** it finds localized share copy and an HTTPS JPEG URL with matching dimensions and alternative text

### Requirement: Compressed public HTML

The production edge SHALL serve compressed landing HTML to a compatible client and preserve the public demo address.

#### Scenario: Visitor requests the landing page with compression

- **WHEN** a client advertises Brotli and gzip
- **THEN** both routes return a compressed response and the public demo address remains intact
