"use strict";

const cartItemsDiv = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

if (cart.length === 0) {
  cartItemsDiv.innerHTML = "<p>Votre panier est vide.</p>";
} else {
  const html = cart.map(item => `
      <div class="product">
      <img src="${item.image}" alt="${item.title}" width="100">
      <h3>${item.title}</h3>
      <p>Quantité : ${item.quantity}</p>
      <p>Total : €${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  `).join("");

  cartItemsDiv.innerHTML = html;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
}
