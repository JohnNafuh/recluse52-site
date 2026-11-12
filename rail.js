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

  // finishes for the hanger, defined once
  document.body.insertAdjacentHTML("beforeend", `
    <svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <defs>
        <linearGradient id="wireMetal" gradientUnits="userSpaceOnUse" x1="24" y1="0" x2="52" y2="0">
          <stop offset="0" stop-color="#3d3d3d"/>
          <stop offset="0.28" stop-color="#cfcfcf"/>
          <stop offset="0.42" stop-color="#ffffff"/>
          <stop offset="0.66" stop-color="#8a8a8a"/>
          <stop offset="1" stop-color="#2f2f2f"/>
        </linearGradient>
        <linearGradient id="nutChrome" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#5a5a5a"/>
          <stop offset="0.4" stop-color="#f6f6f6"/>
          <stop offset="1" stop-color="#6a6a6a"/>
        </linearGradient>
        <linearGradient id="neckGloss" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#070707"/>
          <stop offset="0.32" stop-color="#2e2e2e"/>
          <stop offset="0.46" stop-color="#5b5b5b"/>
          <stop offset="0.6" stop-color="#242424"/>
          <stop offset="1" stop-color="#050505"/>
        </linearGradient>
      </defs>
    </svg>`);

  // a little depth: soft shadow under the hanger and where the neck meets the collar
  const st = document.createElement("style");
  st.textContent = `
    .hang { position: relative; }
    .hook { filter: drop-shadow(0 3px 2.5px rgba(0, 0, 0, 0.35)); }
    .hang::after { content: ""; position: absolute; left: 50%; top: 61px; width: 30px; height: 13px; transform: translateX(-50%);
      background: radial-gradient(ellipse at 50% 0%, rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0) 75%); z-index: 3; pointer-events: none; }`;
  document.head.appendChild(st);

  // chrome wire hook over the rail, swivel, and a glossy black plastic neck that disappears into the collar
  const hookSvg = `
    <svg class="hook" width="56" height="86" viewBox="0 0 56 86" fill="none" aria-hidden="true">
      <path d="M28 64 V24 C28 12 31 2 39 2 C47 2 50 9 48 17" stroke="rgba(0,0,0,0.22)" stroke-width="5" stroke-linecap="round" transform="translate(1.6 1.6)"/>
      <path d="M28 64 V24 C28 12 31 2 39 2 C47 2 50 9 48 17" stroke="url(#wireMetal)" stroke-width="3.8" stroke-linecap="round"/>
      <path d="M27.1 62 V24 C27.1 12.5 30.4 3.2 39 3.2" stroke="rgba(255,255,255,0.85)" stroke-width="0.9" stroke-linecap="round"/>
      <rect x="24" y="55" width="8" height="9" rx="1.5" fill="url(#nutChrome)"/>
      <rect x="22.5" y="61.5" width="11" height="3.4" rx="1.2" fill="url(#nutChrome)" stroke="rgba(0,0,0,0.3)" stroke-width="0.4"/>
      <path d="M22 66 C22 64.6 24.2 64 28 64 C31.8 64 34 64.6 34 66 L47 86 H9 Z" fill="url(#neckGloss)"/>
      <path d="M22.4 66.6 L10.6 85" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      <path d="M33.6 66.6 L45.4 85" stroke="rgba(0,0,0,0.55)" stroke-width="1"/>
      <ellipse cx="28" cy="65.8" rx="5.6" ry="1.2" fill="rgba(255,255,255,0.28)"/>
    </svg>`;

  track.innerHTML = pieces.map(p => `
    <div class="hang">
      ${hookSvg}
      <img class="hang-garment" src="${p.railImage || p.images[0]}" alt="${p.name}" draggable="false">
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
