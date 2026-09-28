/* RECLUSE — product list
   Add a product here once and it shows on the home page, shop and product page.

   id (the key)  used in links: product.html?id=beer-tee
   category      "tees" or "sleeveless" (decides the shop section)
   drop          badge shown next to the name
   images        first photo is the cover; 2+ photos turns on the photo counter
   colors        leave [] to hide the color option; example for later:
                 [{ name: "White", hex: "#f4f4f2" }, { name: "Black", hex: "#161616" }]
   sizes         buttons shown on the product page
*/

const PRODUCTS = {
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
      <img class="card-img" src="${p.images[0]}" alt="${p.name}" loading="lazy">
      <div class="card-meta">
        <span class="card-name">${p.name}</span>
        <span class="card-price">${formatPrice(p.price)}</span>
      </div>
    </a>`;
}
