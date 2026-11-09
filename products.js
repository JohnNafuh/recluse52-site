/* RECLUSE — product list
   Add a product here once and it shows on the home page, shop and product page.

   id (the key)  used in links: product.html?id=beer-tee
   category      "tees" or "sleeveless" (decides the shop section)
   drop          badge shown next to the name
   images        first photo is the cover; 2+ photos turns on the photo counter
   colors        leave [] to hide the color option; example for later:
                 [{ name: "White", hex: "#f4f4f2" }, { name: "Black", hex: "#161616" }]
   sizes         buttons shown on the product page
   featured      true = shown in the home page teaser (keep it to 2)
   exclusive     true = hangs on the home page rail (display only, not clickable)
   wall          true = hangs on the home page gallery wall (frames only, max 5)
   tag           small label on the card: "NEW", "LIMITED"...
   soldOut       true = shows SOLD OUT and blocks Add to cart
   oldPrice      original price, shown struck through next to the discounted price
   railImage     cut-out photo (no background) used on the rail; falls back to the first photo
*/

const PRODUCTS = {
  "fifty-two": {
    name: "RECLUSE FIFTY TWO",
    category: "tees",
    drop: "TEE ESSENTIALS",
    price: 32000,
    exclusive: true,
    railImage: "rail-fifty-two.webp",
    tag: "LIMITED",
    images: ["studio-fifty-two-front.jpeg", "studio-fifty-two-back.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "White tee. RECLUSE Fifty Two arch on the front, samurai in a red brush circle on the back."
  },
  "hooded": {
    name: "RECLUSE HOODED",
    category: "tees",
    drop: "DROP 03",
    price: 30000,
    tag: "NEW",
    images: ["studio-hooded-blue.jpeg", "studio-hooded-pink.jpeg", "studio-hooded-orange.jpeg"],
    colors: [
      { name: "Blue", hex: "#7999C1", image: "studio-hooded-blue.jpeg" },
      { name: "Pink", hex: "#E6A8A6", image: "studio-hooded-pink.jpeg" },
      { name: "Orange", hex: "#E3AE73", image: "studio-hooded-orange.jpeg" }
    ],
    sizes: ["S", "M", "L", "XL"],
    desc: "White tee. Tall RECLUSE lettering over a hooded figure. Choose blue, pink or orange print."
  },

  "beer-tee": {
    name: "RECLUSE BEER TEE",
    category: "tees",
    drop: "DROP 01",
    price: 30000,
    images: ["studio-beer-front.jpeg", "studio-beer-back.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "Minimal street graphic tee with bold back print."
  },
  "thorns": {
    name: "RECLUSE THORNS",
    category: "tees",
    drop: "DROP 03",
    price: 30000,
    images: ["studio-thorns-front.jpeg", "studio-thorns-back.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "White tee. Black-and-white crown of thorns portrait on the front, blackletter RECLUSE across the back."
  },
  "rf2": {
    name: "RECLUSE RF2",
    category: "tees",
    drop: "DROP 03",
    price: 30000,
    featured: true,
    images: ["studio-rf2-front.jpeg", "studio-rf2-back.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "Black tee. RECLUSE over a glowing planet on the front, stacked RF2 on the back."
  },
  "gothic": {
    name: "RECLUSE GOTHIC",
    category: "tees",
    drop: "DROP 03",
    price: 30000,
    tag: "NEW",
    images: ["studio-gothic-front.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "White tee. Distressed blackletter RECLUSE across the chest."
  },

  "camo-thorns": {
    name: "RECLUSE CAMO THORNS",
    category: "tees",
    drop: "DROP 03",
    price: 30000,
    images: ["studio-camo-thorns-front.jpeg", "studio-camo-thorns-back.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "White tee. Camo RECLUSE oval on the front, camo crown of thorns portrait on the back."
  },
  "smoked-flower": {
    name: "RECLUSE SMOKED FLOWER",
    category: "tees",
    drop: "DROP 01",
    price: 30000,
    featured: true,
    images: ["studio-smoked-front.jpeg", "studio-smoked-back.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "Smoked floral graphic tee with premium cotton finish."
  },
  "camo-block": {
    name: "RECLUSE CAMO BLOCK",
    category: "tees",
    drop: "DROP 03",
    price: 30000,
    exclusive: true,
    railImage: "rail-camo-block.webp",
    images: ["studio-camo-block-front.jpeg", "studio-camo-block-back.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "White tee. Camo RECLUSE wordmark on the front, camo crown of thorns portrait on the back."
  },
  "no-rest": {
    name: "RECLUSE NO REST",
    category: "tees",
    drop: "DROP 03",
    price: 30000,
    images: ["studio-no-rest-back.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "White tee. Blackletter RECLUSE over a winged hourglass and No Rest banner on the back."
  },
  "dreams": {
    name: "RECLUSE DREAMS",
    category: "tees",
    drop: "DROP 01",
    price: 30000,
    images: ["studio-dreams-front.jpeg", "studio-dreams-back.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "Minimal dream-inspired streetwear tee."
  },
  "chain-heart": {
    name: "RECLUSE CHAIN HEART",
    category: "tees",
    drop: "DROP 01",
    price: 30000,
    images: ["studio-chain-front.jpeg", "studio-chain-back.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "Heavy streetwear tee featuring chain heart graphic."
  },
  "sleeveless-sword": {
    name: "RECLUSE SWORD VEST BLACK",
    category: "sleeveless",
    drop: "DROP 02",
    price: 28000,
    exclusive: true,
    railImage: "rail-sword-vest.webp",
    images: ["studio-sword-vest.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "Black sleeveless vest featuring Samurai sword graphic."
  },

  "sleeveless-sword-white": {
    name: "RECLUSE SWORD VEST WHITE",
    category: "sleeveless",
    drop: "DROP 02",
    price: 28000,
    images: ["studio-sword-vest-white.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "White sleeveless vest featuring Samurai sword graphic."
  },

  "nostalgia": {
    name: "NOSTALGIA FRAME",
    category: "frames",
    drop: "FRAMES",
    price: 20000,
    oldPrice: 23000,
    images: ["frame-nostalgia.jpeg"],
    colors: [],
    sizes: ["16 x 24 in"],
    desc: "16 x 24 in wall frame featuring the NOSTALGIA album cover design."
  },

  "we-are-all-in-this-together": {
    name: "WE ARE ALL IN THIS TOGETHER FRAME",
    category: "frames",
    drop: "FRAMES",
    price: 20000,
    oldPrice: 23000,
    images: ["frame-we-are-all-in-this-together.jpeg"],
    colors: [],
    sizes: ["16 x 24 in"],
    desc: "16 x 24 in wall frame featuring the WE ARE ALL IN THIS TOGETHER album cover design."
  },

  "mr-morale": {
    name: "MR MORALE FRAME",
    category: "frames",
    drop: "FRAMES",
    price: 20000,
    oldPrice: 23000,
    wall: true,
    images: ["frame-mr-morale.jpeg"],
    colors: [],
    sizes: ["16 x 24 in"],
    desc: "16 x 24 in wall frame featuring the MR MORALE album cover design."
  },

  "forest-hills": {
    name: "FOREST HILLS FRAME",
    category: "frames",
    drop: "FRAMES",
    price: 20000,
    oldPrice: 23000,
    wall: true,
    images: ["frame-forest-hills.jpeg"],
    colors: [],
    sizes: ["16 x 24 in"],
    desc: "16 x 24 in wall frame featuring the FOREST HILLS album cover design."
  },

  "take-care": {
    name: "TAKE CARE FRAME",
    category: "frames",
    drop: "FRAMES",
    price: 20000,
    oldPrice: 23000,
    images: ["frame-take-care.jpeg"],
    colors: [],
    sizes: ["16 x 24 in"],
    desc: "16 x 24 in wall frame featuring the TAKE CARE album cover design."
  },

  "african-giant": {
    name: "AFRICAN GIANT FRAME",
    category: "frames",
    drop: "FRAMES",
    price: 20000,
    oldPrice: 23000,
    wall: true,
    images: ["frame-african-giant.jpeg"],
    colors: [],
    sizes: ["16 x 24 in"],
    desc: "16 x 24 in wall frame featuring the AFRICAN GIANT album cover design."
  },

  "a-better-time": {
    name: "A BETTER TIME FRAME",
    category: "frames",
    drop: "FRAMES",
    price: 20000,
    oldPrice: 23000,
    wall: true,
    images: ["frame-a-better-time.jpeg"],
    colors: [],
    sizes: ["16 x 24 in"],
    desc: "16 x 24 in wall frame featuring the A BETTER TIME album cover design."
  },

  "mil-deluxe": {
    name: "MIL DELUXE FRAME",
    category: "frames",
    drop: "FRAMES",
    price: 20000,
    oldPrice: 23000,
    images: ["frame-mil-deluxe.jpeg"],
    colors: [],
    sizes: ["16 x 24 in"],
    desc: "16 x 24 in wall frame featuring the MIL DELUXE album cover design."
  },

  "vibe-till-thy-kingdom-come": {
    name: "VIBE TILL THY KINGDOM COME FRAME",
    category: "frames",
    drop: "FRAMES",
    price: 20000,
    oldPrice: 23000,
    wall: true,
    images: ["frame-vibe-till-thy-kingdom-come.jpeg"],
    colors: [],
    sizes: ["16 x 24 in"],
    desc: "16 x 24 in wall frame featuring the VIBE TILL THY KINGDOM COME album cover design."
  }
};

/* ---------- helpers used by the pages ---------- */

// "₦30,000"
function formatPrice(amount) {
  return "₦" + Number(amount).toLocaleString();
}

// one product with its id attached, or null if the id doesn't exist
function getProduct(id) {
  return PRODUCTS[id] ? { id: id, ...PRODUCTS[id] } : null;
}

// every product as a list, optionally only one category
function listProducts(category) {
  return Object.keys(PRODUCTS)
    .map(getProduct)
    .filter(p => !category || p.category === category);
}

// photo for a chosen colour (falls back to the first photo)
function imageFor(p, colorName) {
  const c = (p.colors || []).find(c => c.name === colorName);
  return (c && c.image) || p.images[0];
}

// price text; shows the original price struck through when oldPrice is set
function priceHtml(p) {
  if (!p.oldPrice) return formatPrice(p.price);
  return '<s style="opacity:.55;font-size:.8em;margin-right:6px">' + formatPrice(p.oldPrice) + '</s>' + formatPrice(p.price);
}

// markup for one shop / home card
function productCard(p) {
  const isFrame = p.category === 'frames';
  const title = isFrame ? p.name : p.name.replace(/^RECLUSE /, '');
  const meta = `
      <div class="card-meta">
        <span class="card-name">${title}</span>
        <span class="card-price">${priceHtml(p)}</span>
      </div>`;
  if (isFrame) {
    const img = `<img class="card-img card-img-poster" src="${p.images[0]}" alt="${p.name}" loading="lazy" onload="markLight(this)">`;
    return `
    <a class="card" href="product.html?id=${p.id}">
      <span class="frame">${img}</span>${meta}
    </a>`;
  }
  // front first; the back shows on hover (desktop) or swipe (phone). Colour products show their cover only.
  const shots = p.colors.length ? [p.images[0]] : p.images.slice(0, 2);
  const imgs = shots.map((s, i) => `<img class="card-img" src="${s}" alt="${p.name}${i ? ' (back)' : ''}" loading="lazy" draggable="false">`).join("");
  const dots = shots.length > 1 ? '<span class="dots" aria-hidden="true"><i></i><i></i></span>' : "";
  const label = p.soldOut ? "SOLD OUT" : (p.tag || "");
  const tag = label ? `<span class="tag${p.soldOut ? " tag-out" : ""}">${label}</span>` : "";
  return `
    <a class="card${p.soldOut ? " is-out" : ""}" href="product.html?id=${p.id}">
      <span class="card-media"><span class="slides">${imgs}</span>${dots}${tag}</span>${meta}
    </a>`;
}

// keeps the little dots in step when a card is swiped on a phone
document.addEventListener("scroll", e => {
  const el = e.target;
  if (el && el.classList && el.classList.contains("slides")) {
    el.parentElement.dataset.i = Math.round(el.scrollLeft / el.clientWidth);
  }
}, true);

// adds a thin border to photos with a white / near-white background
// (checks the top-left corner pixel once the photo has loaded)
function markLight(img) {
  try {
    const c = document.createElement("canvas");
    c.width = c.height = 1;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0, 4, 4, 0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    if ((r + g + b) / 3 > 245) img.classList.add("is-light");
  } catch (e) { /* can't read the photo: leave it without a border */ }
}

// random order (Fisher-Yates shuffle), returns a new list
function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
