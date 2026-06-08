/* ==============================
   LUMIÈRE — Fashion Store JS
   ============================== */

// ---- PRODUCTS DATA ----
const products = [
  {
    id: 1, category: "women",
    name: "Linen Wrap Dress",
    sub: "Women's Collection",
    price: 2499, oldPrice: 3499,
    badge: "New",
    img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2, category: "women",
    name: "Floral Midi Skirt",
    sub: "Women's Collection",
    price: 1799, oldPrice: null,
    badge: "Trending",
    img: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 3, category: "men",
    name: "Classic Linen Shirt",
    sub: "Men's Collection",
    price: 1499, oldPrice: 1999,
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 4, category: "men",
    name: "Slim Chino Trousers",
    sub: "Men's Collection",
    price: 2199, oldPrice: null,
    badge: "New",
    img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 5, category: "accessories",
    name: "Woven Straw Bag",
    sub: "Accessories",
    price: 999, oldPrice: 1299,
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 6, category: "women",
    name: "Silk Blouse",
    sub: "Women's Collection",
    price: 3299, oldPrice: null,
    badge: "Luxury",
    img: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 7, category: "men",
    name: "Merino Crewneck",
    sub: "Men's Collection",
    price: 2799, oldPrice: 3499,
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 8, category: "accessories",
    name: "Leather Belt",
    sub: "Accessories",
    price: 799, oldPrice: null,
    badge: "Classic",
    img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&auto=format&fit=crop&q=80"
  }
];

// ---- CART ----
let cart = [];

function renderProducts(filter = "all") {
  const grid = document.getElementById("productGrid");
  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card fade-in" data-category="${p.category}">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        <div class="product-actions">
          <button class="btn-cart" onclick="addToCart(${p.id})">Add to Cart</button>
          <button class="btn-wish" onclick="showToast('Added to Wishlist ♡')"><i class="fa-regular fa-heart"></i></button>
        </div>
      </div>
      <div class="product-info">
        <h4>${p.name}</h4>
        <p class="sub">${p.sub}</p>
        <div class="product-price">
          <span class="price-new">₹${p.price.toLocaleString()}</span>
          ${p.oldPrice ? `<span class="price-old">₹${p.oldPrice.toLocaleString()}</span>` : ""}
        </div>
      </div>
    </div>
  `).join("");

  // Trigger fade-in
  setTimeout(() => {
    document.querySelectorAll(".product-card.fade-in").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 80);
    });
  }, 50);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  showToast(`"${product.name}" added to cart ✓`);
  openCart();
}

function updateCartUI() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.querySelector(".cart-count").textContent = count;
  document.getElementById("cartTotal").textContent = "₹" + total.toLocaleString();

  const itemsEl = document.getElementById("cartItems");
  if (cart.length === 0) {
    itemsEl.innerHTML = `<p class="cart-empty">Your cart is empty.</p>`;
    return;
  }
  itemsEl.innerHTML = cart.map(c => `
    <div class="cart-item">
      <img src="${c.img}" alt="${c.name}" />
      <div class="cart-item-info">
        <h5>${c.name}</h5>
        <span>Qty: ${c.qty}</span>
      </div>
      <div class="cart-item-price">₹${(c.price * c.qty).toLocaleString()}</div>
      <button class="cart-item-remove" onclick="removeFromCart(${c.id})">✕</button>
    </div>
  `).join("");
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function openCart() {
  document.getElementById("cartModal").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cartModal").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

// Cart icon click
document.querySelector(".fa-bag-shopping").addEventListener("click", openCart);

// ---- FILTERS ----
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

// ---- NAVBAR SCROLL ----
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// ---- SCROLL REVEAL ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) el.target.classList.add("visible");
  });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

// ---- TOAST ----
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// ---- NEWSLETTER ----
function handleNewsletter(e) {
  e.preventDefault();
  showToast("Welcome to LUMIÈRE! ✓ You're now subscribed.");
  e.target.reset();
}

// ---- HAMBURGER ----
document.getElementById("hamburger").addEventListener("click", () => {
  const links = document.querySelector(".nav-links");
  if (links.style.display === "flex") {
    links.style.display = "none";
  } else {
    links.style.cssText = "display:flex; flex-direction:column; position:absolute; top:70px; left:0; right:0; background:white; padding:2rem; gap:1.5rem; border-top:1px solid #eee; z-index:999;";
  }
});

// ---- INIT ----
renderProducts();
