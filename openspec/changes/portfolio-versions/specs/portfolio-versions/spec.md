## ADDED Requirements

### Requirement: Alternate versions are reachable from the portfolio

The localized portfolio header SHALL provide a Versions dropdown with direct links to a terminal and a 90s website at distinct URLs. Each alternative SHALL link to the corresponding portfolio and CV PDF.

#### Scenario: Open the Versions dropdown

- **WHEN** a visitor opens Versions from the portfolio header
- **THEN** the dropdown offers both alternate presentations in the selected language

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

### Requirement: Secret shortcuts open the Versions dropdown

The portfolio home SHALL recognize the desktop Konami sequence and seven rapid touch taps on the header brand. Both shortcuts SHALL open the localized dropdown with a discovery message.

#### Scenario: Complete the keyboard sequence

- **WHEN** a visitor presses the final A outside an editable control after entering the Konami sequence
- **THEN** the localized dropdown opens immediately

#### Scenario: Discover the touch shortcut

- **WHEN** a visitor taps the header brand seven times in succession on a touch screen
- **THEN** the fourth through sixth taps show the remaining count and the seventh opens the localized dropdown

### Requirement: The retro page offers a brick breaker

The retro page SHALL offer an original brick breaker with keyboard and touch controls. Gameplay SHALL start only on explicit activation and SHALL provide a pause control. Clearing a row SHALL reveal a public career milestone.

#### Scenario: Start and pause gameplay

- **WHEN** a visitor selects Play and then Pause
- **THEN** the game starts and stops advancing until the visitor resumes it

### Requirement: The retro page offers a secret word maze

The retro page SHALL place an original maze after the brick breaker. Its patrols SHALL advance by player turn. The maze SHALL offer keyboard and touch controls, and the exit SHALL open after collecting the four letters.

#### Scenario: Reveal the secret words

- **WHEN** a visitor collects all four letters and reaches the exit
- **THEN** the maze reveals the secret words and a public education milestone
