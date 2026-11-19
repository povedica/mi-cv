## ADDED Requirements

### Requirement: Alternate versions are reachable from the portfolio

The localized portfolio header SHALL link to a Versions index with a terminal and a 90s website at distinct URLs. Each alternative SHALL link to the corresponding portfolio and CV PDF.

#### Scenario: Browse the versions index

- **WHEN** a visitor follows Versions from the portfolio header
- **THEN** the index offers both alternate presentations in the selected language

### Requirement: The terminal renders predefined public results

The terminal SHALL identify its opening exchange as a demonstration and support a predefined command vocabulary through typed commands and visible controls. It SHALL show a table for the projects command and a fixed help prompt for unrecognized input.

#### Scenario: Run a projects command

- **WHEN** a visitor enters the localized projects command or activates its shortcut
- **THEN** the terminal shows the public projects in a table

### Requirement: The retro site retains its fixed canvas

The 90s website SHALL keep the same document width across viewports and offer ordinary links to content sections. A reduced-motion preference SHALL replace the moving greeting with static text.

#### Scenario: Browse with reduced motion

- **WHEN** a visitor opens the 90s website with reduced motion enabled
- **THEN** the greeting is static and the section links remain usable

### Requirement: Secret shortcuts open the versions index

The portfolio home SHALL recognize the desktop Konami sequence and seven rapid touch taps on the header brand. Both shortcuts SHALL open the localized index with a discovery message.

#### Scenario: Complete the keyboard sequence

- **WHEN** a visitor presses the final A outside an editable control after entering the Konami sequence
- **THEN** the localized index opens immediately

#### Scenario: Discover the touch shortcut

- **WHEN** a visitor taps the header brand seven times in succession on a touch screen
- **THEN** the fourth through sixth taps show the remaining count and the seventh opens the localized index

### Requirement: The retro page ends with a brick breaker

The retro page SHALL offer an original brick breaker with keyboard and touch controls. Gameplay SHALL start only on explicit activation and SHALL provide a pause control. Clearing a row SHALL reveal a public career milestone.

#### Scenario: Start and pause gameplay

- **WHEN** a visitor selects Play and then Pause
- **THEN** the game starts and stops advancing until the visitor resumes it
