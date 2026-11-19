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

### Requirement: Shared portfolio structure

The localized interview routes SHALL use the same site layout as the corresponding profile routes and render their own main content and route metadata.

#### Scenario: Visitor opens the interview preview directly

- **WHEN** the visitor loads either interview route
- **THEN** the header, footer, cookie notice and mobile dock behave like the profile layout, the language switch opens the other interview locale, and the interview history stays local

### Requirement: Public profile discovery

The build SHALL produce an agent discovery index and localized Markdown using approved public landing fields. The home pages SHALL publish structured career and public event data.

#### Scenario: Agent reads the English profile

- **WHEN** an agent follows the English Markdown link from the discovery index
- **THEN** the document contains the public English profile and excludes demo credentials and private contact data

### Requirement: Search indexing scope

The sitemap SHALL list both localized home pages and CV PDFs with modification dates and language alternates. The inactive interview and cookie policies SHALL declare noindex and stay outside the sitemap.

#### Scenario: Production release completes with IndexNow configured

- **WHEN** the deployed proof and release files pass HTTPS verification
- **THEN** the workflow submits the public sitemap URLs to IndexNow
