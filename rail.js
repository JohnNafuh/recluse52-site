/* RECLUSE — exclusive rail (home page)
   Display only: pieces marked exclusive: true in products.js hang on a rail.
   Drag / swipe to move the rail; the pieces swing with the movement and sway gently at rest.
   Needs products.js loaded first. */

(function () {
  const rail = document.getElementById("rail");
  if (!rail) return;
  const track = document.getElementById("railTrack");
  const toggle = document.getElementById("motionToggle");

  const pieces = listProducts().filter(p => p.exclusive);
  if (!pieces.length) {
    rail.closest("section").hidden = true;
    return;
  }

  const hookSvg = `
    <svg class="hook" width="28" height="44" viewBox="0 0 28 44" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
      <path d="M14 44 V18 C14 3 27 3 27 13"/>
    </svg>`;

  track.innerHTML = pieces.map(p => `
    <div class="hang">
      ${hookSvg}
      <img class="hang-img" src="${p.images[0]}" alt="${p.name}" draggable="false" onload="markLight(this)">
    </div>`).join("");

  const hangs = Array.from(track.children).map((el, i) => ({ el, angle: 0, vel: 0, phase: i * 1.7 }));

  /* ---------- motion on / off ---------- */
  let motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function setMotion(on) {
    motion = on;
    toggle.setAttribute("aria-pressed", String(on));
    toggle.textContent = on ? "MOTION ON" : "MOTION OFF";
  }
  setMotion(motion);
  toggle.onclick = () => setMotion(!motion);

  /* ---------- rail position ---------- */
  let x = 0, v = 0, minX = 0, maxX = 0;
  let dragging = false, lastPointerX = 0;
  let prevX = 0, prevDelta = 0;

  function measure() {
    const railW = rail.clientWidth;
    const trackW = track.scrollWidth;
    if (trackW <= railW) {
      minX = maxX = (railW - trackW) / 2; // everything fits: centre it
    } else {
      minX = railW - trackW;
      maxX = 0;
    }
  }

  rail.addEventListener("pointerdown", e => {
    dragging = true;
    lastPointerX = e.clientX;
    v = 0;
    rail.setPointerCapture(e.pointerId);
    rail.classList.add("is-dragging");
  });

  rail.addEventListener("pointermove", e => {
    if (!dragging) return;
    let dx = e.clientX - lastPointerX;
    lastPointerX = e.clientX;
    if (x + dx > maxX || x + dx < minX) dx *= 0.35; // resistance past the ends
    x += dx;
    v = dx;
  });

  function release() {
    dragging = false;
    rail.classList.remove("is-dragging");
  }
  rail.addEventListener("pointerup", release);
  rail.addEventListener("pointercancel", release);

  /* ---------- animation loop ---------- */
  let visible = true;
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(rail);

  function frame(time) {
    requestAnimationFrame(frame);
    if (!visible) return;

    if (!dragging) {
      x += v;
      v *= 0.94; // momentum fades
      if (x > maxX) { v *= 0.5; x += (maxX - x) * 0.15; } // spring back into place
      else if (x < minX) { v *= 0.5; x += (minX - x) * 0.15; }
    }

    const delta = x - prevX;
    const accel = delta - prevDelta;
    prevX = x;
    prevDelta = delta;

    track.style.transform = `translate3d(${x}px, 0, 0)`;

    hangs.forEach(h => {
      if (!motion) {
        h.angle = 0;
        h.vel = 0;
      } else {
        const moving = dragging || Math.abs(v) > 0.5;
        const rest = moving ? 0 : Math.sin(time / 1000 * 0.9 + h.phase) * 1.2; // gentle idle sway
        h.vel += (rest - h.angle) * 0.02 + accel * 0.6 + delta * 0.02; // swing with the rail
        h.vel *= 0.92;
        h.angle = Math.max(-18, Math.min(18, h.angle + h.vel));
      }
      h.el.style.transform = `rotate(${h.angle.toFixed(2)}deg)`;
    });
  }

  /* ---------- start once the photos are in ---------- */
  const imgs = Array.from(track.querySelectorAll("img"));
  Promise.all(imgs.map(img => img.complete ? null : new Promise(r => { img.addEventListener("load", r); img.addEventListener("error", r); })))
    .then(() => {
      measure();
      x = prevX = (minX + maxX) / 2;
      rail.classList.add("is-ready");
      requestAnimationFrame(frame);
    });

  window.addEventListener("resize", () => {
    measure();
    x = Math.max(minX, Math.min(maxX, x));
  });
})();
