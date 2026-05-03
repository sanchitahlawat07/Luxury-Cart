/* =========================================
   LUXE — Premium Store | script.js
   ========================================= */

// =========================================
// PRODUCT DATA
// =========================================
const products = [
  {
    id: 1, name: 'Silk Evening Gown', category: 'fashion',
    price: 4999, original: 7999, emoji: '👗', badge: 'sale',
    rating: 4.8, reviews: 124,
    desc: 'Luxurious silk gown with hand-stitched embroidery. Perfect for evening galas and formal events. Available in 5 colors.'
  },
  {
    id: 2, name: 'Pro Wireless Earbuds', category: 'electronics',
    price: 2499, original: 3499, emoji: '🎧', badge: 'hot',
    rating: 4.9, reviews: 287,
    desc: '40-hour battery life, active noise cancellation, and studio-quality sound. Comes with premium charging case.'
  },
  {
    id: 3, name: 'Italian Leather Tote', category: 'accessories',
    price: 8999, original: null, emoji: '👜', badge: 'new',
    rating: 4.7, reviews: 89,
    desc: 'Hand-crafted in Florence, Italy. Full-grain leather with brass hardware. Fits a 15" laptop comfortably.'
  },
  {
    id: 4, name: 'Artisan Scented Candle Set', category: 'home',
    price: 1299, original: 1799, emoji: '🕯️', badge: 'sale',
    rating: 4.6, reviews: 201,
    desc: 'Set of 3 hand-poured soy wax candles. Fragrances: Sandalwood, Vanilla Oak, and Moroccan Rose. 60hr burn time each.'
  },
  {
    id: 5, name: '24K Gold Serum', category: 'beauty',
    price: 3499, original: null, emoji: '✨', badge: 'new',
    rating: 4.9, reviews: 156,
    desc: 'Revolutionary anti-aging formula with 24K gold particles and hyaluronic acid. Clinically tested, dermatologist approved.'
  },
  {
    id: 6, name: 'Cashmere Blazer', category: 'fashion',
    price: 12999, original: 18999, emoji: '🧥', badge: 'sale',
    rating: 4.8, reviews: 73,
    desc: '100% pure cashmere blazer with impeccable Italian tailoring. Lightweight yet warm, perfect for all seasons.'
  },
  {
    id: 7, name: 'Smart Watch Elite', category: 'electronics',
    price: 15999, original: 19999, emoji: '⌚', badge: 'hot',
    rating: 4.7, reviews: 342,
    desc: 'AMOLED display, health monitoring, GPS tracking, 7-day battery. Compatible with iOS & Android.'
  },
  {
    id: 8, name: 'Diamond Tennis Bracelet', category: 'accessories',
    price: 24999, original: null, emoji: '💎', badge: 'new',
    rating: 5.0, reviews: 45,
    desc: 'Sterling silver with lab-grown VS-clarity diamonds. Each stone hand-set by master jewelers. Certificate of authenticity included.'
  },
  {
    id: 9, name: 'Bamboo Diffuser Set', category: 'home',
    price: 2199, original: 2999, emoji: '🌿', badge: 'sale',
    rating: 4.5, reviews: 167,
    desc: 'Ultrasonic diffuser with 8 premium essential oils. Features LED mood lighting and auto-shutoff timer.'
  },
  {
    id: 10, name: 'Matte Lipstick Collection', category: 'beauty',
    price: 999, original: 1499, emoji: '💄', badge: 'hot',
    rating: 4.6, reviews: 412,
    desc: '12-piece set of long-wear matte lipsticks. Enriched with vitamin E. Lasts up to 16 hours. Vegan & cruelty-free.'
  },
  {
    id: 11, name: 'Linen Co-ord Set', category: 'fashion',
    price: 3799, original: null, emoji: '👘', badge: 'new',
    rating: 4.4, reviews: 98,
    desc: 'Breathable linen matching set — perfect for summer. Hand-dyed with natural indigo. Relaxed, effortless silhouette.'
  },
  {
    id: 12, name: 'Noise-Cancelling Headphones', category: 'electronics',
    price: 9999, original: 13999, emoji: '🎵', badge: 'sale',
    rating: 4.8, reviews: 219,
    desc: 'Over-ear studio headphones with 30-hour battery, foldable design, and premium Hi-Res audio certification.'
  },
];

// =========================================
// STATE
// =========================================
let cart        = [];
let wishlist    = [];
let activeFilter = 'all';
let selectedSize = 'M';

// =========================================
// RENDER PRODUCTS
// =========================================
function renderProducts(filter = 'all') {
  const grid     = document.getElementById('products-grid');
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card fade-up" id="pcard-${p.id}">
      <div class="product-img">
        <span>${p.emoji}</span>
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge.toUpperCase()}</span>` : ''}
        <button class="product-wishlist ${wishlist.includes(p.id) ? 'active' : ''}"
                onclick="toggleWishlist(event, ${p.id})" title="Wishlist">
          ${wishlist.includes(p.id) ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name" onclick="openModal(${p.id})" style="cursor:pointer">${p.name}</div>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 ? '½' : ''}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-current">₹${p.price.toLocaleString('en-IN')}</span>
            ${p.original ? `<span class="price-original">₹${p.original.toLocaleString('en-IN')}</span>` : ''}
          </div>
          <button class="add-to-cart" onclick="addToCart(${p.id})">Add +</button>
        </div>
      </div>
    </div>
  `).join('');

  observeFadeUps();
}

// =========================================
// FILTER PRODUCTS
// =========================================
function filterProducts(cat) {
  activeFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === cat);
  });
  renderProducts(cat);
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => filterProducts(btn.dataset.filter));
});

// =========================================
// CART FUNCTIONS
// =========================================
function addToCart(id) {
  const p        = products.find(x => x.id === id);
  const existing = cart.find(x => x.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...p, qty: 1 });
  updateCartUI();
  showToast(`${p.emoji} <strong>${p.name}</strong> added to cart`);
  animateCartBtn();
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  updateCartUI();
}

function updateQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((a, b) => a + b.qty, 0);
  document.getElementById('cart-count').textContent = count;

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  document.getElementById('cart-total').textContent = '₹' + total.toLocaleString('en-IN');

  const shippingMsg = document.getElementById('cart-shipping-msg');
  if (total > 0 && total < 2000) {
    shippingMsg.textContent  = `Add ₹${(2000 - total).toLocaleString('en-IN')} more for free shipping`;
    shippingMsg.style.color  = 'var(--muted)';
  } else if (total >= 2000) {
    shippingMsg.textContent  = '🎉 You qualify for free shipping!';
    shippingMsg.style.color  = 'var(--green)';
  }

  const itemsEl = document.getElementById('cart-items');
  const footer  = document.getElementById('cart-footer');

  if (cart.length === 0) {
    itemsEl.innerHTML    = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛍️</div>
        <p>Your cart is empty.<br>Start adding some items!</p>
      </div>`;
    footer.style.display = 'none';
  } else {
    footer.style.display = 'block';
    itemsEl.innerHTML    = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove">✕</button>
      </div>
    `).join('');
  }
}

function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-sidebar').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-sidebar').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('cart-btn').onclick = openCart;

function animateCartBtn() {
  const btn         = document.getElementById('cart-btn');
  btn.style.transform = 'scale(1.3)';
  setTimeout(() => (btn.style.transform = ''), 200);
}

function checkout() {
  if (cart.length === 0) return;
  showToast('🎉 Order placed successfully!');
  cart = [];
  updateCartUI();
  closeCart();
}

// =========================================
// WISHLIST
// =========================================
function toggleWishlist(e, id) {
  e.stopPropagation();
  const btn = e.currentTarget;
  if (wishlist.includes(id)) {
    wishlist       = wishlist.filter(x => x !== id);
    btn.innerHTML  = '🤍';
    btn.classList.remove('active');
    showToast('Removed from wishlist');
  } else {
    wishlist.push(id);
    btn.innerHTML  = '❤️';
    btn.classList.add('active');
    showToast('Added to wishlist ❤️');
  }
}

// =========================================
// PRODUCT MODAL
// =========================================
function openModal(id) {
  const p       = products.find(x => x.id === id);
  const sizes   = ['XS', 'S', 'M', 'L', 'XL'];
  const hasSizes = p.category === 'fashion';

  document.getElementById('modal-inner').innerHTML = `
    <div class="modal-img">${p.emoji}</div>
    <div class="modal-details">
      <div class="modal-category">${p.category}</div>
      <h2 class="modal-title">${p.name}</h2>
      <div class="modal-rating">
        <span class="stars">${'★'.repeat(Math.floor(p.rating))}</span>
        <span style="color:var(--muted);font-size:13px;margin-left:6px">${p.rating} · ${p.reviews} reviews</span>
      </div>
      <p class="modal-desc">${p.desc}</p>
      <div class="modal-price">
        ₹${p.price.toLocaleString('en-IN')}
        ${p.original ? `<small>₹${p.original.toLocaleString('en-IN')}</small>` : ''}
      </div>
      ${hasSizes ? `
        <div class="size-label">Select Size</div>
        <div class="sizes">
          ${sizes.map(s => `
            <button class="size-opt${s === selectedSize ? ' active' : ''}"
                    onclick="selectSize(this,'${s}')">${s}</button>
          `).join('')}
        </div>
      ` : ''}
      <div class="modal-footer">
        <button class="modal-add-btn" onclick="addToCart(${p.id}); closeModal()">Add to Cart</button>
      </div>
    </div>
  `;

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function selectSize(el, size) {
  selectedSize = size;
  document.querySelectorAll('.size-opt').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modal-overlay') &&
      !e.currentTarget.classList.contains('modal-close')) return;
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// =========================================
// TOAST NOTIFICATIONS
// =========================================
function showToast(msg) {
  const container = document.getElementById('toast-container');
  const toast     = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<div class="toast-icon">✓</div><span>${msg}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// =========================================
// NEWSLETTER
// =========================================
function subscribeNewsletter() {
  const email = document.getElementById('newsletter-email').value;
  if (!email || !email.includes('@')) {
    showToast('⚠️ Please enter a valid email');
    return;
  }
  showToast('📬 Subscribed! Welcome to LUXE.');
  document.getElementById('newsletter-email').value = '';
}

// =========================================
// SEARCH
// =========================================
document.getElementById('search-toggle').onclick = () => {
  const bar = document.getElementById('search-bar');
  bar.classList.toggle('open');
  if (bar.classList.contains('open')) {
    document.getElementById('search-input').focus();
  }
};

document.getElementById('search-input').addEventListener('input', function () {
  const q = this.value.toLowerCase();
  if (!q) { renderProducts(activeFilter); return; }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(q) || p.category.includes(q)
  );
  const grid = document.getElementById('products-grid');

  grid.innerHTML = filtered.length
    ? filtered.map(p => `
        <div class="product-card fade-up">
          <div class="product-img"><span>${p.emoji}</span></div>
          <div class="product-info">
            <div class="product-category">${p.category}</div>
            <div class="product-name">${p.name}</div>
            <div class="product-footer">
              <span class="price-current">₹${p.price.toLocaleString('en-IN')}</span>
              <button class="add-to-cart" onclick="addToCart(${p.id})">Add +</button>
            </div>
          </div>
        </div>
      `).join('')
    : `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--muted)">
         No products found for "<strong style="color:var(--white)">${q}</strong>"
       </div>`;

  observeFadeUps();
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});

// =========================================
// NAVBAR SCROLL EFFECT
// =========================================
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.background = window.scrollY > 60
    ? 'rgba(10,10,10,0.97)'
    : 'rgba(10,10,10,0.85)';
});

// =========================================
// INTERSECTION OBSERVER (fade-up)
// =========================================
function observeFadeUps() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up:not(.visible)').forEach(el => observer.observe(el));
}

// =========================================
// INIT
// =========================================
renderProducts();
updateCartUI();
observeFadeUps();