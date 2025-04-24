/* "use strict";

    const productsDiv = document.getElementById("products");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    let products = []
    let cart = [];

    function updateCart() {
      cartCount.textContent = cart.length;
      const total = cart.reduce((sum, item) => sum + item.price, 0);
      cartTotal.textContent = total.toFixed(2);
    }
 function addToCart(id)
 {
    const product = products.find(product=>product.id === id)
  cart.push(product);
  updateCart();
 }
 fetch("https://fakestoreapi.com/products")
 .then(Response => Response.json())
 .then(product => {
    products = product
  product.forEach(product => {
     const div = document.createElement("div");
     div.className = "product";    
     div.innerHTML = `
     <h3>${product.title}</h3>
     <img src= "${product.image}" >
     <p> price: $${product.price}</p>
     <button onclick= 'addToCart(${product.id})'>Add to cart</button>
     `;
     productsDiv.appendChild(div);
  });
 })

 function updateCart() {
    console.log(cart);
    
    const cartHTML = cart.map(
      (item) => `<div class="product">
              <h3>${item.title}</h3>
              <div class="cart-detail"><div class="mid">
              <img src= "${item.image}" >
                  <p>${item.description}</p>
                   <button onclick={decrItem(${item.id})}>-</button>
                   <div>${item.id}<div>
                  <button onclick={incrItem(${item.id})}>+</button>
              </div>
              <p>$${item.price}</p>
              <button onclick={deleteItem(${item.id})} class="cart-product" id=${item.id}>Delete item</button></div>
             </div>`
    );
  
    const cartItems = document.querySelector("#products");
    cartItems.innerHTML = cartHTML.join("");
  }

  function getTotal(cart) {
    let { totalItem, cartTotal } = cart.reduce(
      (total, cartItem) => {
        total.cartTotal += cartItem.price * cartItem.id;
        total.totalItem += cartItem.id;
        return total;
      },
      { totalItem: 0, cartTotal: 0 }
    );
    const totalItemsHTML = document.createElement("div");
    totalItemsHTML.innerHTML = `${totalItem} items`;
    const totalAmountHTML = document.createElement("div");
    totalAmountHTML.innerHTML = `$${cartTotal}`;


    totalItemsHTML.appendChild(newcontent);
    totalAmountHTML.appendChild(p);
  }

  function incrItem(id) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] && cart[i].id == id) {
        cart[i].id += 1;
      }
    }
    updateCart();
    getTotal(cart);
  }
  function decrItem(id) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id && cart[i].id > 1) {
        cart[i].id -= 1;
      }
    }
    updateCart();
    getTotal(cart);
  }
 
  
 */
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
          <button onclick="decrItem(${item.id})">-</button>
          <div>${item.quantity}</div>
          <button onclick="incrItem(${item.id})">+</button>
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

