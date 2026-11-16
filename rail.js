/* RECLUSE — exclusive rail (home page)
   Display only: three tees on real hangers, hooked over a chrome rail. They swing when you move
   over them or tap, and sway gently on their own. */

(function () {
  const rail = document.getElementById("rail");
  if (!rail) return;
  const track = document.getElementById("railTrack");
  const toggle = document.getElementById("motionToggle");
  const bar = rail.querySelector(".rail-bar");

  // the tees (already on their hangers, cut out): edit this list to change what hangs here
  const PIECES = [
    { src: "rail-hang-rf2.webp", alt: "RECLUSE RF2 tee" },
    { src: "rail-hang-fifty-two.webp", alt: "RECLUSE Fifty Two tee" },
    { src: "rail-hang-swirl.webp", alt: "RECLUSE swirl tee" }
  ];

  const css = document.createElement("style");
  css.textContent = `
    #rail { --h: clamp(96px, 29vw, 185px); --w: clamp(42px, 11.5vw, 64px); overflow-x: auto; overflow-y: hidden; touch-action: pan-x pan-y; cursor: default; scrollbar-width: none; }
    #rail::-webkit-scrollbar { display: none; }
    #rail .rail-bar { z-index: 0; left: 50%; right: auto; transform: translateX(-50%); }
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
    #rail .rail-track { z-index: 1; width: max-content; min-width: 100%; justify-content: center; gap: 0; padding: 0 0 38px; }
    /* the hook is turned to face front: a wire runs up in front of the bar and arcs over the top of it */
    #rail .hang { position: relative; flex: 0 0 auto; margin: 15px 0 0; padding-top: var(--w); transform-origin: 50% 12px; }
    #rail .wire { position: absolute; left: 50%; top: 0; z-index: 1; width: 2px; height: calc(var(--w) + 5px); margin-left: -1px; border-radius: 1px;
      background: linear-gradient(90deg, #6a6a6a, #f6f6f6 50%, #6a6a6a); box-shadow: 0 0 1px rgba(0, 0, 0, 0.5); }
    #rail .wire::before { content: ""; position: absolute; left: 1px; top: -1px; width: 10px; height: 8px; border-top: 2px solid #dcdcdc; border-right: 2px solid #b4b4b4; border-radius: 0 9px 0 0; }
    #rail .hang + .hang { margin-left: clamp(-24px, -4vw, -8px); }
    #rail .hang-img { position: relative; z-index: 2; display: block; height: var(--h); width: auto; filter: drop-shadow(0 12px 10px rgba(0, 0, 0, 0.22)); pointer-events: none; user-select: none; -webkit-user-drag: none; }`;
  document.head.appendChild(css);

  track.innerHTML = PIECES.map(p => `
    <div class="hang"><span class="wire"></span><img class="hang-img" src="${p.src}" alt="${p.alt}" draggable="false"></div>`).join("");

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
        const r = h.el.getBoundingClientRect(), d = Math.abs(e.clientX - (r.left + r.width / 2));
        if (d < 140) h.vel += dx * 0.03 * (1 - d / 140);
      });
    }
    lastX = e.clientX;
  });
  rail.addEventListener("pointerleave", () => { lastX = null; });
  rail.addEventListener("pointerdown", e => {
    let best = state[0], bd = 1e9;
    state.forEach(h => { const r = h.el.getBoundingClientRect(), d = Math.abs(e.clientX - (r.left + r.width / 2)); if (d < bd) { bd = d; best = h; } });
    best.vel += 2.6;
  });

  /* ---------- animation loop ---------- */
  let visible = true;
  new IntersectionObserver(e => { visible = e[0].isIntersecting; }).observe(rail);
  function frame(time) {
    requestAnimationFrame(frame);
    if (!visible) return;
    state.forEach(h => {
      if (!motion) { h.angle = 0; h.vel = 0; }
      else {
        const rest = Math.sin(time / 1000 * 0.9 + h.phase) * 1.1;
        h.vel += (rest - h.angle) * 0.02; h.vel *= 0.93;
        h.angle = Math.max(-14, Math.min(14, h.angle + h.vel));
      }
      h.el.style.transform = "rotate(" + h.angle.toFixed(2) + "deg)";
    });
  }

  function sizeBar() {
    const a = slots[0].getBoundingClientRect(), z = slots[slots.length - 1].getBoundingClientRect();
    bar.style.width = Math.min(rail.clientWidth - 44, z.right - a.left + 80) + "px";
  }

  const imgs = Array.from(track.querySelectorAll("img"));
  Promise.all(imgs.map(img => img.complete ? null : new Promise(r => { img.addEventListener("load", r); img.addEventListener("error", r); })))
    .then(() => { sizeBar(); rail.classList.add("is-ready"); requestAnimationFrame(frame); });
  window.addEventListener("resize", sizeBar);
})();
