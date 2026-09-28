/* RECLUSE — cart
   Needs products.js loaded first.
   Saved in the browser as a list of { id, size, color, qty }.
   Any element with data-cart-count shows the number of items. */

const CART_KEY = "cart";

function readCart() {
  let raw = [];
  try {
    raw = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    raw = [];
  }

  // Older carts stored the whole product without an id: match those by name.
  return raw
    .map(item => {
      if (item.id && PRODUCTS[item.id]) return item;
      const match = listProducts().find(p => p.name === item.name);
      return match ? { id: match.id, size: item.size || "M", color: item.color || "", qty: Number(item.qty) || 1 } : null;
    })
    .filter(Boolean);
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    /* storage full or blocked: the cart just won't persist */
  }
  updateCartBadge();
}

// Same product + size + color adds to the quantity instead of a new line.
function addToCart(id, size, color) {
  const cart = readCart();
  const existing = cart.find(i => i.id === id && i.size === size && i.color === (color || ""));
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: id, size: size, color: color || "", qty: 1 });
  }
  saveCart(cart);
}

function setQty(index, qty) {
  const cart = readCart();
  if (!cart[index]) return;
  if (qty < 1) {
    cart.splice(index, 1);
  } else {
    cart[index].qty = qty;
  }
  saveCart(cart);
}

function removeFromCart(index) {
  const cart = readCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

function cartCount() {
  return readCart().reduce((sum, i) => sum + i.qty, 0);
}

function cartTotal() {
  return readCart().reduce((sum, i) => sum + PRODUCTS[i.id].price * i.qty, 0);
}

function updateCartBadge() {
  const count = cartCount();
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = count;
  });
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
