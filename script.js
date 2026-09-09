// Product data

const products = [
  {
    id: 1,
    name: "Smart Watch",
    price: 50,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },

  {
    id: 2,
    name: "Headphones",
    price: 35,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },

  {
    id: 3,
    name: "Sneakers",
    price: 60,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },

  {
    id: 4,
    name: "Backpack",
    price: 40,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
  },
];

// Cart array

let cart = [];

// Display products

function displayProducts(productList) {
  const container = document.getElementById("productContainer");

  container.innerHTML = "";

  productList.forEach((product) => {
    const card = document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>$${product.price}</p>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

    container.appendChild(card);
  });
}

// Add product to cart

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  updateCart();

  alert(product.name + " added to cart!");
}

// Update cart

function updateCart() {
  const cartItems = document.getElementById("cartItems");

  const cartCount = document.getElementById("cartCount");

  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  let total = 0;

  let count = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  }

  cart.forEach((item) => {
    total += item.price * item.quantity;

    count += item.quantity;

    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `

            <div>
                <strong>${item.name}</strong>
                <br>
                $${item.price}
            </div>

            <div class="quantity">

                <button onclick="changeQuantity(${item.id}, -1)">
                    -
                </button>

                ${item.quantity}

                <button onclick="changeQuantity(${item.id}, 1)">
                    +
                </button>

            </div>

        `;

    cartItems.appendChild(cartItem);
  });

  cartCount.textContent = count;

  cartTotal.textContent = total;
}

// Change product quantity

function changeQuantity(productId, change) {
  const item = cart.find((product) => product.id === productId);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter((product) => product.id !== productId);
  }

  updateCart();
}

// Open cart

document.getElementById("cartButton").addEventListener("click", function () {
  document.getElementById("cart").classList.add("active");
});

// Close cart

function closeCart() {
  document.getElementById("cart").classList.remove("active");
}

// Search products

document.getElementById("searchInput").addEventListener("input", function () {
  const searchText = this.value.toLowerCase();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText),
  );

  displayProducts(filteredProducts);
});

// Shop Now button

function scrollToProducts() {
  document.getElementById("productsSection").scrollIntoView({
    behavior: "smooth",
  });
}

// Checkout

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");

    return;
  }

  alert("Thank you for your purchase!");

  cart = [];

  updateCart();

  closeCart();
}

// Display products when page loads

displayProducts(products);

updateCart();
