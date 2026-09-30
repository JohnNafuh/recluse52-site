/* RECLUSE — product list
   Add a product here once and it shows on the home page, shop and product page.

   id (the key)  used in links: product.html?id=beer-tee
   category      "tees" or "sleeveless" (decides the shop section)
   drop          badge shown next to the name
   images        first photo is the cover; 2+ photos turns on the photo counter
   colors        leave [] to hide the color option; example for later:
                 [{ name: "White", hex: "#f4f4f2" }, { name: "Black", hex: "#161616" }]
   sizes         buttons shown on the product page
   featured      true = shown in the home page teaser (keep it to 3)
   exclusive     true = hangs on the home page rail (display only, not clickable)
*/

const PRODUCTS = {
  "fifty-two": {
    name: "RECLUSE FIFTY TWO",
    category: "tees",
    drop: "TEE ESSENTIALS",
    price: 32000,
    featured: true,
    exclusive: true,
    images: ["recluse-fifty-two-back.jpeg", "recluse-fifty-two.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "White tee. RECLUSE Fifty Two arch on the front, samurai in a red brush circle on the back."
  },

  "thorns": {
    name: "RECLUSE THORNS",
    category: "tees",
    drop: "DROP 03",
    price: 30000,
    featured: true,
    images: ["recluse-thorns.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "White tee. Black-and-white crown of thorns portrait on the front, blackletter RECLUSE across the back."
  },

  "camo-thorns": {
    name: "RECLUSE CAMO THORNS",
    category: "tees",
    drop: "DROP 03",
    price: 30000,
    images: ["recluse-camo-thorns.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "White tee. Camo RECLUSE oval on the front, camo crown of thorns portrait on the back."
  },

  "camo-block": {
    name: "RECLUSE CAMO BLOCK",
    category: "tees",
    drop: "DROP 03",
    price: 30000,
    exclusive: true,
    images: ["recluse-camo-block.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "White tee. Camo RECLUSE wordmark on the front, camo crown of thorns portrait on the back."
  },

  "no-rest": {
    name: "RECLUSE NO REST",
    category: "tees",
    drop: "DROP 03",
    price: 30000,
    images: ["recluse-no-rest.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "White tee. Blackletter RECLUSE over a winged hourglass and No Rest banner on the back."
  },

  "rf2": {
    name: "RECLUSE RF2",
    category: "tees",
    drop: "DROP 03",
    price: 30000,
    featured: true,
    images: ["recluse-rf2.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "Black tee. RECLUSE over a glowing planet on the front, stacked RF2 on the back."
  },

  "beer-tee": {
    name: "RECLUSE BEER TEE",
    category: "tees",
    drop: "DROP 01",
    price: 30000,
    images: ["a041ae76-2fca-4c0c-9cac-6bcdfc03dd88.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "Minimal street graphic tee with bold back print."
  },

  "smoked-flower": {
    name: "RECLUSE SMOKED FLOWER",
    category: "tees",
    drop: "DROP 01",
    price: 30000,
    images: ["2af34606-1479-4be7-a83d-7b61140dda21.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "Smoked floral graphic tee with premium cotton finish."
  },

  "chain-heart": {
    name: "RECLUSE CHAIN HEART",
    category: "tees",
    drop: "DROP 01",
    price: 30000,
    images: ["e875715a-90af-4361-b1a9-9fe4e38f0a67.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "Heavy streetwear tee featuring chain heart graphic."
  },

  "dreams": {
    name: "RECLUSE DREAMS",
    category: "tees",
    drop: "DROP 01",
    price: 30000,
    images: ["233d44f0-6ed6-4388-9a0f-69d90e762b66.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "Minimal dream-inspired streetwear tee."
  },

  "sleeveless-sword": {
    name: "RECLUSE SWORD VEST",
    category: "sleeveless",
    drop: "DROP 02",
    price: 28000,
    exclusive: true,
    images: ["photo-output.jpeg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"],
    desc: "Black sleeveless vest featuring Samurai sword graphic."
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

// markup for one shop / home card
function productCard(p) {
  return `
    <a class="card" href="product.html?id=${p.id}">
      <img class="card-img" src="${p.images[0]}" alt="${p.name}" loading="lazy" onload="markLight(this)">
      <div class="card-meta">
        <span class="card-name">${p.name}</span>
        <span class="card-price">${formatPrice(p.price)}</span>
      </div>
    </a>`;
}

// adds a thin border to photos with a white / near-white background
// (checks the top-left corner pixel once the photo has loaded)
function markLight(img) {
  try {
    const c = document.createElement("canvas");
    c.width = c.height = 1;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0, 4, 4, 0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    if ((r + g + b) / 3 > 225) img.classList.add("is-light");
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
