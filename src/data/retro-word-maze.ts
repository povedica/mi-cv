const layout = [
  '#############',
  '#S..#1.....E#',
  '#.#.#.###.#.#',
  '#.#...#...#.#',
  '#.###.#.###.#',
  '#2....#....3#',
  '#.###.#####.#',
  '#.....4.....#',
  '#############',
];

const columns = layout[0].length;
const tiles = layout.join('');
const start = tiles.indexOf('S');
const exit = tiles.indexOf('E');
const patrols = [
  [16, 29, 42, 29],
  [74, 75, 76, 75],
];
const offsets: Readonly<Record<string, number>> = {
  ArrowUp: -columns,
  ArrowDown: columns,
  ArrowLeft: -1,
  ArrowRight: 1,
};

export function mountWordMaze(maze: HTMLElement) {
  const board = maze.querySelector<HTMLElement>('[data-maze-board]');
  const controls = maze.querySelector<HTMLElement>('.maze-controls');
  const play = maze.querySelector<HTMLButtonElement>('[data-maze-play]');
  const status = maze.querySelector<HTMLElement>('#maze-status');
  const reward = maze.querySelector<HTMLElement>('[data-maze-reward]');
  if (!board || !controls || !play || !status || !reward) return;

  const labels = JSON.parse(maze.dataset.labels ?? '{}') as Record<string, string>;
  const secondWord = maze.dataset.secondWord ?? 'IA';
  const word = 'CV' + secondWord;
  const letters = [...word].map((glyph, index) => ({
    glyph,
    position: tiles.indexOf(String(index + 1)),
  }));
  const collected = new Set<number>();
  const directions = [...controls.querySelectorAll<HTMLButtonElement>('[data-maze-direction]')];
  const cells = [...tiles].map(() => {
    const cell = document.createElement('span');
    cell.setAttribute('aria-hidden', 'true');
    return cell;
  });
  board.replaceChildren(...cells);
  controls.hidden = false;

  let position = start;
  let turn = 0;
  let playing = false;

  const patrolPositions = () => patrols.map(path => path[turn % path.length]);

  function render() {
    const guards = patrolPositions();
    cells.forEach((cell, index) => {
      const letter = letters.find(item => item.position === index && !collected.has(index));
      const tile = index === position ? 'player' : guards.includes(index) ? 'patrol' : index === exit ? 'exit' : tiles[index];
      cell.dataset.tile = tile;
      cell.textContent = tile === 'player' ? '◆' : tile === 'patrol' ? '×' : tile === 'exit' ? (collected.size === letters.length ? '↗' : '⊠') : letter?.glyph ?? '';
    });
  }

  function report(message = '') {
    if (!status) return;
    const found = letters.map(letter => collected.has(letter.position) ? letter.glyph : '_');
    status.textContent = [labels.letters + ': ' + found.join(' '), message].filter(Boolean).join(' · ');
  }

  function move(key: string) {
    const offset = offsets[key];
    if (!playing || !Number.isFinite(offset)) return;
    const next = position + offset;
    if (tiles[next] === '#') return;
    if (next === exit && collected.size < letters.length) {
      report(labels.locked);
      return;
    }

    const crossedPatrol = patrolPositions().includes(next);
    turn += 1;
    if (crossedPatrol || patrolPositions().includes(next)) {
      position = start;
      turn = 0;
      report(labels.captured);
    } else {
      position = next;
      if (letters.some(letter => letter.position === position) && !collected.has(position)) {
        collected.add(position);
        report(collected.size === letters.length ? labels.open : '');
      }
      if (position === exit) {
        playing = false;
        directions.forEach(button => { button.disabled = true; });
        if (reward) reward.hidden = false;
        report(labels.won + ' CV · ' + secondWord);
      }
    }
    render();
  }

  play.addEventListener('click', () => {
    position = start;
    turn = 0;
    playing = true;
    collected.clear();
    reward.hidden = true;
    play.textContent = labels.restart;
    directions.forEach(button => { button.disabled = false; });
    report();
    render();
    board.focus({ preventScroll: true });
  });
  board.addEventListener('keydown', event => {
    if (!playing || !Object.hasOwn(offsets, event.key) ||
        event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    if (!event.repeat) move(event.key);
  });
  for (const button of directions) {
    button.addEventListener('click', () => move(button.dataset.mazeDirection ?? ''));
  }

  render();
}
