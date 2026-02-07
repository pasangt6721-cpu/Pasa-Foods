// ============================================
// PASA-FOODS - Main Application JavaScript
// ============================================

// Cart Management
const CartManager = {
  getCart() {
    const cart = localStorage.getItem('pasaFoodsCart');
    return cart ? JSON.parse(cart) : [];
  },

  saveCart(cart) {
    localStorage.setItem('pasaFoodsCart', JSON.stringify(cart));
    this.updateCartBadge();
  },

  addItem(item) {
    const cart = this.getCart();
    const existingItem = cart.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    
    this.saveCart(cart);
    this.showToast(`${item.name} added to cart!`);
  },

  removeItem(itemId) {
    let cart = this.getCart();
    cart = cart.filter(i => i.id !== itemId);
    this.saveCart(cart);
  },

  updateQuantity(itemId, change) {
    const cart = this.getCart();
    const item = cart.find(i => i.id === itemId);
    
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeItem(itemId);
      } else {
        this.saveCart(cart);
      }
    }
  },

  getTotal() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getItemCount() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = this.getItemCount();
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  clearCart() {
    localStorage.removeItem('pasaFoodsCart');
    this.updateCartBadge();
  },

  showToast(message) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up';
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('animate-fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
};

// Auth Management
const AuthManager = {
  isLoggedIn() {
    return localStorage.getItem('pasaFoodsLoggedIn') === 'true';
  },

  getCurrentUser() {
    const user = localStorage.getItem('pasaFoodsCurrentUser');
    return user ? JSON.parse(user) : null;
  },

  getUsers() {
    const users = localStorage.getItem('pasaFoodsUsers');
    return users ? JSON.parse(users) : [];
  },

  register(name, email, password) {
    const users = this.getUsers();
    
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem('pasaFoodsUsers', JSON.stringify(users));
    
    return { success: true, message: 'Registration successful!' };
  },

  login(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('pasaFoodsLoggedIn', 'true');
      localStorage.setItem('pasaFoodsCurrentUser', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
      this.updateNavbar();
      return { success: true, message: 'Login successful!' };
    }

    return { success: false, message: 'Invalid email or password' };
  },

  logout() {
    localStorage.removeItem('pasaFoodsLoggedIn');
    localStorage.removeItem('pasaFoodsCurrentUser');
    this.updateNavbar();
    CartManager.showToast('Logged out successfully');
  },

  updateNavbar() {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');

    if (this.isLoggedIn()) {
      const user = this.getCurrentUser();
      if (loginBtn) loginBtn.classList.add('hidden');
      if (userMenu) {
        userMenu.classList.remove('hidden');
        if (userName) userName.textContent = user?.name || 'User';
      }
    } else {
      if (loginBtn) loginBtn.classList.remove('hidden');
      if (userMenu) userMenu.classList.add('hidden');
    }
  }
};

// Modal Management
const ModalManager = {
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = 'auto';
    }
  },

  closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
    document.body.style.overflow = 'auto';
  }
};

// Food Card Renderer
function renderFoodCard(item) {
  return `
    <div class="food-card bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div class="relative">
        <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover" loading="lazy">
        <div class="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span>${item.rating}</span>
        </div>
      </div>
      <div class="p-4">
        <span class="text-xs font-medium text-orange-500 uppercase tracking-wide">${item.category}</span>
        <h3 class="font-bold text-lg text-gray-800 mt-1">${item.name}</h3>
        <p class="text-gray-500 text-sm mt-1 line-clamp-2">${item.description}</p>
        <div class="flex items-center justify-between mt-4">
          <span class="text-xl font-bold text-orange-500">$${item.price.toFixed(2)}</span>
          <button onclick="CartManager.addItem(${JSON.stringify(item).replace(/"/g, '&quot;')})" 
                  class="add-to-cart-btn bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  `;
}

// Category Renderer
function renderCategories(containerId, activeCategory = 'All') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = categories.map(cat => `
    <button onclick="filterByCategory('${cat.name}')" 
            class="category-btn flex flex-col items-center gap-2 px-6 py-4 rounded-2xl transition-all duration-300 min-w-[100px] ${
              activeCategory === cat.name 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' 
                : 'bg-white hover:bg-orange-50 text-gray-700 shadow-md'
            }">
      <span class="text-2xl">${cat.icon}</span>
      <span class="font-medium text-sm whitespace-nowrap">${cat.name}</span>
    </button>
  `).join('');
}

// Filter by Category
let currentCategory = 'All';

function filterByCategory(category) {
  currentCategory = category;
  renderCategories('categoriesContainer', category);
  renderFoodItems('foodItemsContainer', category);
}

// Render Food Items
function renderFoodItems(containerId, category = 'All') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const filteredItems = category === 'All' 
    ? foodItems 
    : foodItems.filter(item => item.category === category);

  container.innerHTML = filteredItems.map(item => renderFoodCard(item)).join('');
}

// Render Cart Page
function renderCartPage() {
  const cartContainer = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const emptyCartEl = document.getElementById('emptyCart');
  const cartContentEl = document.getElementById('cartContent');

  if (!cartContainer) return;

  const cart = CartManager.getCart();

  if (cart.length === 0) {
    if (emptyCartEl) emptyCartEl.classList.remove('hidden');
    if (cartContentEl) cartContentEl.classList.add('hidden');
    return;
  }

  if (emptyCartEl) emptyCartEl.classList.add('hidden');
  if (cartContentEl) cartContentEl.classList.remove('hidden');

  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
      <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
      <div class="flex-1">
        <h3 class="font-semibold text-gray-800">${item.name}</h3>
        <p class="text-orange-500 font-bold">$${item.price.toFixed(2)}</p>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="updateCartItem(${item.id}, -1)" class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
          </svg>
        </button>
        <span class="font-semibold text-lg w-8 text-center">${item.quantity}</span>
        <button onclick="updateCartItem(${item.id}, 1)" class="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </button>
      </div>
      <button onclick="removeCartItem(${item.id})" class="text-red-400 hover:text-red-600 transition-colors p-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </button>
    </div>
  `).join('');

  const subtotal = CartManager.getTotal();
  const deliveryFee = cart.length > 0 ? 2.99 : 0;
  const total = subtotal + deliveryFee;

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function updateCartItem(itemId, change) {
  CartManager.updateQuantity(itemId, change);
  renderCartPage();
}

function removeCartItem(itemId) {
  CartManager.removeItem(itemId);
  renderCartPage();
}

// Checkout Handler
function handleCheckout() {
  if (!AuthManager.isLoggedIn()) {
    CartManager.showToast('Please login to checkout');
    ModalManager.openModal('loginModal');
    return;
  }

  const cart = CartManager.getCart();
  if (cart.length === 0) {
    CartManager.showToast('Your cart is empty');
    return;
  }

  // Simulate order placement
  CartManager.clearCart();
  renderCartPage();
  CartManager.showToast('Order placed successfully! 🎉');
}

// Form Handlers
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const result = AuthManager.login(email, password);
  
  if (result.success) {
    ModalManager.closeModal('loginModal');
    CartManager.showToast(result.message);
    document.getElementById('loginForm').reset();
  } else {
    showFormError('loginError', result.message);
  }
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  const result = AuthManager.register(name, email, password);
  
  if (result.success) {
    ModalManager.closeModal('registerModal');
    ModalManager.openModal('loginModal');
    CartManager.showToast(result.message);
    document.getElementById('registerForm').reset();
  } else {
    showFormError('registerError', result.message);
  }
}

function showFormError(elementId, message) {
  const errorEl = document.getElementById(elementId);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
    setTimeout(() => errorEl.classList.add('hidden'), 3000);
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('hidden');
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  CartManager.updateCartBadge();
  AuthManager.updateNavbar();

  // Initialize home page
  if (document.getElementById('categoriesContainer')) {
    renderCategories('categoriesContainer', 'All');
  }
  if (document.getElementById('foodItemsContainer')) {
    renderFoodItems('foodItemsContainer', 'All');
  }

  // Initialize cart page
  if (document.getElementById('cartItemsContainer')) {
    renderCartPage();
  }

  // Close modals on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        ModalManager.closeAllModals();
      }
    });
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      ModalManager.closeAllModals();
    }
  });
});
