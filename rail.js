/* RECLUSE — exclusive rail (home page)
   Display only. Pieces marked exclusive: true in products.js hang on a chrome rail from thin wire hooks
   and small wooden hangers. They hang side-on; the one you hover / tap swings round to face front.
   Needs products.js loaded first. */

(function () {
  const rail = document.getElementById("rail");
  if (!rail) return;
  const track = document.getElementById("railTrack");
  const toggle = document.getElementById("motionToggle");
  const bar = rail.querySelector(".rail-bar");

  const pieces = listProducts().filter(p => p.exclusive);
  if (!pieces.length) { rail.closest("section").hidden = true; return; }

  // finishes: chrome wire, wood
  document.body.insertAdjacentHTML("beforeend", `
    <svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <defs>
        <linearGradient id="woodNeck" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#3a110d"/><stop offset="0.45" stop-color="#97442f"/><stop offset="1" stop-color="#3a110d"/>
        </linearGradient>
        <linearGradient id="woodArm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#a84f38"/><stop offset="0.55" stop-color="#6a2a20"/><stop offset="1" stop-color="#3d130f"/>
        </linearGradient>
      </defs>
    </svg>`);

  const css = document.createElement("style");
  css.textContent = `
    #rail { overflow-x: auto; overflow-y: hidden; touch-action: pan-x pan-y; cursor: default; scrollbar-width: none; }
    #rail::-webkit-scrollbar { display: none; }
    #rail .rail-track { width: max-content; min-width: 100%; justify-content: center; gap: 0; padding: 14px 0 38px; }
    #rail .rail-bar { left: 50%; right: auto; transform: translateX(-50%); }
    #rail .rail-bar::before, #rail .rail-bar::after {
      content: ""; position: absolute; top: -11px; width: 12px; height: 32px; border-radius: 3px;
      background:
        radial-gradient(circle at 50% 24%, #4a4a4a 0 1.3px, transparent 1.7px),
        radial-gradient(circle at 50% 76%, #4a4a4a 0 1.3px, transparent 1.7px),
        linear-gradient(90deg, #8a8a8a, #f6f6f6 45%, #7a7a7a);
      box-shadow: 0 5px 6px -3px rgba(0, 0, 0, 0.4);
    }
    #rail .rail-bar::before { left: -9px; }
    #rail .rail-bar::after { right: -9px; }

    #rail .hang { position: relative; flex: 0 0 auto; display: flex; justify-content: center; margin: 0; transform-origin: 50% 13px; }
    #rail .hang + .hang { margin-left: clamp(-30px, -4.5vw, -14px); }
    #rail .hook { position: absolute; left: 50%; top: 0; width: 26px; height: 64px; margin-left: -13px; z-index: 1; filter: drop-shadow(0 2px 1.5px rgba(0, 0, 0, 0.3)); }
    #rail .turn { position: relative; z-index: 2; margin-top: 60px; }
    #rail .arms { position: absolute; left: 50%; top: -9px; width: 64%; height: 22px; transform: translateX(-50%); z-index: 0; overflow: visible; }
    #rail .hang-garment { position: relative; z-index: 1; display: block; margin: 0; height: clamp(110px, 28vw, 170px); width: auto;
      filter: drop-shadow(0 10px 9px rgba(0, 0, 0, 0.2)); }`;
  document.head.appendChild(css);

  // thin chrome wire over the rail + small wooden neck
  const hookSvg = `
    <svg class="hook" viewBox="0 0 26 64" fill="none" aria-hidden="true">
      <path d="M13 56 V20 C13 12 15 7 19 7 C23 7 25 11 24 15" stroke="#6f6f6f" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M13 56 V20 C13 12 15 7 19 7 C23 7 25 11 24 15" stroke="#e4e4e4" stroke-width="1.5" stroke-linecap="round"/>
      <rect x="10" y="50" width="6" height="12" rx="2.6" fill="url(#woodNeck)"/>
    </svg>`;
  // wooden hanger shoulders, mostly hidden inside the garment so only a hint shows at the collar
  const armsSvg = `
    <svg class="arms" viewBox="0 0 100 26" preserveAspectRatio="none" aria-hidden="true">
      <path d="M3 22 Q50 -2 97 22" stroke="url(#woodArm)" stroke-width="5.5" stroke-linecap="round" fill="none" vector-effect="non-scaling-stroke"/>
      <path d="M3 20.6 Q50 -3.4 97 20.6" stroke="rgba(255,255,255,0.28)" stroke-width="1.1" stroke-linecap="round" fill="none" vector-effect="non-scaling-stroke"/>
    </svg>`;

  track.innerHTML = pieces.map(p => `
    <div class="hang">
      ${hookSvg}
      <div class="turn">
        ${armsSvg}
        <img class="hang-garment" src="${p.railImage || p.images[0]}" alt="${p.name}" draggable="false">
      </div>
    </div>`).join("");

  const slots = Array.from(track.querySelectorAll(".hang"));
  const state = slots.map((el, i) => ({ el, angle: 0, vel: 0, phase: i * 1.7 }));

  /* ---------- motion on / off ---------- */
  let motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function setMotion(on) {
    motion = on;
    toggle.setAttribute("aria-pressed", String(on));
    toggle.textContent = on ? "MOTION ON" : "MOTION OFF";
  }
  setMotion(motion);
  toggle.onclick = () => setMotion(!motion);

  /* ---------- swing when you move over them or tap ---------- */
  let lastX = null;
  rail.addEventListener("pointermove", e => {
    if (lastX !== null) {
      const dx = e.clientX - lastX;
      state.forEach(h => {
        const rc = h.el.getBoundingClientRect(), d = Math.abs(e.clientX - (rc.left + rc.width / 2));
        if (d < 130) h.vel += dx * 0.03 * (1 - d / 130);
      });
    }
    lastX = e.clientX;
  });
  rail.addEventListener("pointerleave", () => { lastX = null; });
  rail.addEventListener("pointerdown", e => {
    let best = state[0], bd = 1e9;
    state.forEach(h => {
      const rc = h.el.getBoundingClientRect(), d = Math.abs(e.clientX - (rc.left + rc.width / 2));
      if (d < bd) { bd = d; best = h; }
    });
    best.vel += 2.6;
  });

  /* ---------- animation loop ---------- */
  let visible = true;
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(rail);

  function frame(time) {
    requestAnimationFrame(frame);
    if (!visible) return;
    state.forEach((h, i) => {
      if (!motion) { h.angle = 0; h.vel = 0; }
      else {
        const rest = Math.sin(time / 1000 * 0.9 + h.phase) * 1.1;
        h.vel += (rest - h.angle) * 0.02; h.vel *= 0.93;
        h.angle = Math.max(-14, Math.min(14, h.angle + h.vel));
      }
      h.el.style.transform = `rotate(${h.angle.toFixed(2)}deg)`;
    });
  }

  function sizeBar() {
    const a = slots[0].getBoundingClientRect(), z = slots[slots.length - 1].getBoundingClientRect();
    bar.style.width = Math.min(rail.clientWidth - 44, z.right - a.left + 70) + "px";
  }

  /* ---------- start once the photos are in ---------- */
  const imgs = Array.from(track.querySelectorAll("img"));
  Promise.all(imgs.map(img => img.complete ? null : new Promise(r => { img.addEventListener("load", r); img.addEventListener("error", r); })))
    .then(() => {
      sizeBar();
      rail.classList.add("is-ready");
      requestAnimationFrame(frame);
    });
  window.addEventListener("resize", sizeBar);
})();
