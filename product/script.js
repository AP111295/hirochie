"use strict";

    const productsDiv = document.getElementById("products");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    let cart = [];

    function updateCart() {
      cartCount.textContent = cart.length;
      const total = cart.reduce((sum, item) => sum + item.price, 0);
      cartTotal.textContent = total.toFixed(2);
    }
 function addToCart(product)
 {
  cart.push(product);
  updateCart();
 }
 fetch("https://fakestoreapi.com/products")
 .then(Response => Response.json())
 .then(product => {
  product.forEach(product => {
     const div = document.createElement("div");
     div.className = "product";    
     div.innerHTML = `
     <h3>${product.title}</h3>
     <img src= "${product.image}" >
     <p> price: $${product.price}</p>
     <button onclick= 'addTocart(${JSON.stringify(product)})'>Add to cart</button>
     `;
     productsDiv.appendChild(div);
  });
 })



 
/*
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(products => {
        products.forEach(product => {
          const div = document.createElement("div");
          div.className = "product";
          div.innerHTML = `
            <h3>${product.title}</h3>
            <img src="${product.image}" alt="${product.title}">
            <p>Price: $${product.price}</p>
            <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
          `;
          productsDiv.appendChild(div);
        });
      }); */