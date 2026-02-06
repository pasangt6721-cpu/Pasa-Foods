// ================================
// IMPORT ASSETS & DATA
// ================================
import {
  assets,
  menu_list,
  food_list,
} from "./assets/frontend_assets/assets.js";

console.log("Pasa-Foods App Initialized");

// ================================
// CART HELPERS
// ================================
function getCart() {
  return JSON.parse(localStorage.getItem("pasa-cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("pasa-cart", JSON.stringify(cart));
}

function updateCartBadge() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll(".cart-count").forEach(
    (el) => (el.textContent = totalQty)
  );
}

// ================================
// ADD TO CART
// ================================
function addToCart(id) {
  let cart = getCart();
  const existing = cart.find((i) => i.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }

  saveCart(cart);
  updateCartBadge();
}

// Bind buttons AFTER render
function bindAddToCartButtons() {
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.id);
    });
  });
}

// ================================
// HOME PAGE
// ================================
function renderHero() {
  const hero = document.getElementById("hero-section");
  if (!hero) return;

  hero.innerHTML = `
    <div class="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center gap-10">
      <div class="flex-1 space-y-6 text-center md:text-left">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900">
          Order your favourite <br class="hidden md:block">food here
        </h1>
        <p class="text-gray-600 text-lg max-w-md mx-auto md:mx-0">
          Choose from a diverse menu of delicious meals.
        </p>
        <a href="menu.html"
          class="inline-block bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition">
          View Menu
        </a>
      </div>
      <div class="flex-1">
        <img src="${assets.header_img}" class="w-full max-w-xl mx-auto">
      </div>
    </div>
  `;
}

function renderCategories() {
  const container = document.getElementById("category-list");
  if (!container) return;

  let active = "";

  const render = () => {
    container.innerHTML = menu_list
      .map((cat) => {
        const isActive = active === cat.menu_name;
        return `
          <div class="category-item cursor-pointer flex flex-col items-center gap-2"
               data-name="${cat.menu_name}">
            <div class="w-24 h-24 rounded-full border-4 ${
              isActive ? "border-orange-600" : "border-transparent"
            } overflow-hidden bg-orange-100">
              <img src="${cat.menu_image}" class="w-full h-full object-cover">
            </div>
            <p class="${
              isActive ? "text-orange-600 font-bold" : "text-gray-600"
            }">${cat.menu_name}</p>
          </div>
        `;
      })
      .join("");

    container.querySelectorAll(".category-item").forEach((item) => {
      item.addEventListener("click", () => {
        active = item.dataset.name;
        render();
      });
    });
  };

  render();
}

// ================================
// MENU PAGE
// ================================
function renderMenuPage() {
  const filterContainer = document.getElementById("category-filter");
  const foodContainer = document.getElementById("food-display");
  if (!filterContainer || !foodContainer) return;

  let activeCategory = "All";

  const renderFilters = () => {
    const list = [{ menu_name: "All" }, ...menu_list];

    filterContainer.innerHTML = list
      .map((cat) => {
        const isActive = activeCategory === cat.menu_name;
        return `
          <button
            class="px-4 py-2 rounded-full border ${
              isActive
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700"
            } filter-btn"
            data-name="${cat.menu_name}">
            ${cat.menu_name}
          </button>
        `;
      })
      .join("");

    filterContainer.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.name;
        renderFilters();
        renderFoodGrid();
      });
    });
  };

  const renderFoodGrid = () => {
    const list =
      activeCategory === "All"
        ? food_list
        : food_list.filter((f) => f.category === activeCategory);

    foodContainer.innerHTML = list
      .map(
        (item) => `
      <div class="bg-white rounded-2xl shadow hover:shadow-lg flex flex-col">
        <div class="relative h-52">
          <img src="${item.image}" class="w-full h-full object-cover">
          <button class="add-to-cart-btn absolute bottom-4 right-4 bg-orange-500 p-3 rounded-full"
                  data-id="${item.id}">
            <img src="${assets.add_icon_white}" class="w-6 h-6">
          </button>
        </div>
        <div class="p-4 flex flex-col grow">
          <h3 class="font-bold text-lg">${item.name}</h3>
          <p class="text-sm text-gray-500 line-clamp-2">${item.description}</p>
          <p class="mt-auto text-orange-600 font-bold text-xl">Rs ${item.price}</p>
        </div>
      </div>
    `
      )
      .join("");

    bindAddToCartButtons();
  };

  renderFilters();
  renderFoodGrid();
}

// ================================
// CART PAGE
// ================================
function renderCart() {
  const container = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");
  if (!container || !summary) return;

  const cart = getCart();
  container.innerHTML = "";
  let total = 0;

  cart.forEach((c) => {
    const product = food_list.find((f) => f.id === c.id);
    if (!product) return;

    total += product.price * c.qty;

    container.innerHTML += `
      <div class="flex gap-4 bg-white p-4 rounded shadow">
        <img src="${product.image}" class="w-20 h-20 object-cover rounded">
        <div class="flex-1">
          <h3 class="font-semibold">${product.name}</h3>
          <p class="text-orange-600">Rs ${product.price}</p>
          <div class="flex gap-2 mt-2">
            <button onclick="changeQty('${product.id}',-1)">−</button>
            <span>${c.qty}</span>
            <button onclick="changeQty('${product.id}',1)">+</button>
          </div>
        </div>
        <button onclick="removeFromCart('${product.id}')" class="text-red-500">✕</button>
      </div>
    `;
  });

  summary.innerHTML = `
    <p class="text-lg font-bold">Total: Rs ${total}</p>
    <button class="mt-4 bg-orange-500 text-white px-6 py-2 rounded">
      Checkout
    </button>
  `;
}

function changeQty(id, amount) {
  let cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.qty += amount;
  if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);

  saveCart(cart);
  renderCart();
  updateCartBadge();
}

function removeFromCart(id) {
  let cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
  renderCart();
  updateCartBadge();
}

// ================================
// INIT
// ================================
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderCategories();
  renderMenuPage();
  renderCart();
  updateCartBadge();
});
