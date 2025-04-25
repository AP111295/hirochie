"use strict";

const productsDiv = document.getElementById("products");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

let products = [];
let cart = [];

function updateCart() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartHTML = cart.map(item => `
    <div class="product">
      <h3>${item.title}</h3>
      <div class="cart-detail">
        <div class="mid">
          <img src="${item.image}" alt="${item.title}">
          <p>${item.description}</p>
          <div class = "quantity">
          <button onclick="decrItem(${item.id})">-</button>
          <div>${item.quantity}</div>
          <button onclick="incrItem(${item.id})">+</button>
          </div>
        </div>
        <p>$${(item.price * item.quantity).toFixed(2)}</p>
        <button onclick="deleteItem(${item.id})" class="cart-product">Delete item</button>
      </div>
    </div>
  `);

  productsDiv.innerHTML = cartHTML.join("");
  getTotal();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

function deleteItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();

  // Optionally redirect when cart is empty
  if (cart.length === 0) {
    window.location.href = "index.html";
  }
}

function incrItem(id) {
  const item = cart.find(item => item.id === id);
  if (item) item.quantity += 1;
  updateCart();
}

function decrItem(id) {
  const item = cart.find(item => item.id === id);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    deleteItem(id);
  }
  updateCart();
}

function getTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
}

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    products = data;

    data.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <h3>${product.title}</h3>
        <img src="${product.image}" alt="${product.title}">
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to cart</button>
      `;
      productsDiv.appendChild(div);
    });
  });

