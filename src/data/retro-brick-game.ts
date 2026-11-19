export function mountBrickGame(game: HTMLElement) {
  const canvas = game.querySelector('canvas');
  const context = canvas?.getContext('2d');
  const play = game.querySelector<HTMLButtonElement>('[data-play]');
  const pause = game.querySelector<HTMLButtonElement>('[data-pause]');
  const status = game.querySelector<HTMLElement>('[data-game-status]');
  if (!canvas || !context || !play || !pause || !status) return;

  const labels: Record<string, string> = JSON.parse(game.dataset.labels ?? '{}');
  const milestones = [...game.querySelectorAll<HTMLElement>('.milestones li')];
  const { width, height } = canvas;
  const paddleWidth = 92;
  const paddleY = height - 24;
  const radius = 5;
  const colors = ['#ff86cf', '#ffe473', '#7ee8d1'];
  const bricks = milestones.flatMap((_, row) => Array.from({ length: 8 }, (_, column) => ({
    row, x: 20 + column * 56, y: 24 + row * 22, active: true,
  })));

  let mode: 'ready' | 'playing' | 'paused' | 'finished' = 'ready';
  let frame = 0;
  let previous = 0;
  let paddle = (width - paddleWidth) / 2;
  let ball = { x: width / 2, y: paddleY - radius - 4, vx: 105, vy: -175 };
  const keys = new Set<string>();
  let touchDirection = 0;

  function draw() {
    if (!context) return;
    context.fillStyle = '#160e33';
    context.fillRect(0, 0, width, height);
    for (const brick of bricks) {
      if (!brick.active) continue;
      context.fillStyle = colors[brick.row];
      context.fillRect(brick.x, brick.y, 48, 15);
      context.fillStyle = '#ffffff80';
      context.fillRect(brick.x, brick.y, 48, 2);
    }
    context.fillStyle = '#fff4c3';
    context.fillRect(paddle, paddleY, paddleWidth, 7);
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, Math.PI * 2);
    context.fill();
  }

  function updateControls(message = '') {
    if (!play || !pause || !status) return;
    play.disabled = mode === 'playing' || mode === 'paused';
    play.textContent = mode === 'finished' ? labels.retry : labels.start;
    pause.disabled = mode === 'ready' || mode === 'finished';
    pause.textContent = mode === 'paused' ? labels.resume : labels.pause;
    status.textContent = message;
  }

  function tick(time: number) {
    if (mode !== 'playing') return;
    const dt = Math.min((time - previous) / 1000, 0.025);
    previous = time;
    const direction = touchDirection || Number(keys.has('ArrowRight')) - Number(keys.has('ArrowLeft'));
    paddle = Math.max(0, Math.min(width - paddleWidth, paddle + direction * 320 * dt));
    const oldY = ball.y;
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    if (ball.x < radius || ball.x > width - radius) {
      ball.x = Math.max(radius, Math.min(width - radius, ball.x));
      ball.vx *= -1;
    }
    if (ball.y < radius) {
      ball.y = radius;
      ball.vy = Math.abs(ball.vy);
    }
    if (ball.vy > 0 && oldY + radius <= paddleY && ball.y + radius >= paddleY &&
        ball.x >= paddle - radius && ball.x <= paddle + paddleWidth + radius) {
      ball.y = paddleY - radius;
      ball.vy = -Math.abs(ball.vy);
      ball.vx = 250 * ((ball.x - paddle) / paddleWidth - 0.5);
    }

    const hit = bricks.find(brick => brick.active &&
      ball.x + radius > brick.x && ball.x - radius < brick.x + 48 &&
      ball.y + radius > brick.y && ball.y - radius < brick.y + 15);
    if (hit) {
      hit.active = false;
      if (oldY + radius <= hit.y || oldY - radius >= hit.y + 15) ball.vy *= -1;
      else ball.vx *= -1;
      if (!bricks.some(brick => brick.row === hit.row && brick.active)) milestones[hit.row].hidden = false;
    }

    draw();
    const won = !bricks.some(brick => brick.active);
    if (won || ball.y - radius > height) {
      mode = 'finished';
      updateControls(won ? labels.won : labels.lost);
      if (document.activeElement === canvas) play?.focus({ preventScroll: true });
      return;
    }
    frame = requestAnimationFrame(tick);
  }

  function start() {
    mode = 'playing';
    previous = performance.now();
    updateControls();
    frame = requestAnimationFrame(tick);
  }

  function stop() {
    if (mode !== 'playing') return;
    mode = 'paused';
    cancelAnimationFrame(frame);
    keys.clear();
    touchDirection = 0;
    updateControls(labels.paused);
  }

  play.disabled = false;
  play.addEventListener('click', () => {
    if (mode !== 'ready' && mode !== 'finished') return;
    for (const brick of bricks) brick.active = true;
    for (const milestone of milestones) milestone.hidden = true;
    keys.clear();
    touchDirection = 0;
    paddle = (width - paddleWidth) / 2;
    ball = { x: width / 2, y: paddleY - radius - 4, vx: 105, vy: -175 };
    start();
    canvas.focus({ preventScroll: true });
  });
  pause.addEventListener('click', () => {
    if (mode === 'paused') {
      start();
      canvas.focus({ preventScroll: true });
    } else stop();
  });
  canvas.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mode === 'playing') {
      stop();
      pause.focus({ preventScroll: true });
    }
    if (mode !== 'playing' || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    keys.add(event.key);
  });
  canvas.addEventListener('keyup', event => keys.delete(event.key));
  canvas.addEventListener('blur', () => keys.clear());
  for (const button of game.querySelectorAll<HTMLButtonElement>('[data-direction]')) {
    const direction = Number(button.dataset.direction);
    button.addEventListener('pointerdown', event => {
      if (mode !== 'playing' || event.button !== 0) return;
      button.setPointerCapture(event.pointerId);
      touchDirection = direction;
    });
    button.addEventListener('lostpointercapture', () => { touchDirection = 0; });
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
  });
  draw();
}
