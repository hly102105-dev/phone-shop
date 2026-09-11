const products = [
{
id: 1,
brand: "Apple",
name: "iPhone 16 Pro",
price: 999,
spec: "256GB • Titanium • 5G",
image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=90",
description: "Premium Apple smartphone with powerful performance, advanced camera system and titanium design."
},
{
id: 2,
brand: "Samsung",
name: "Galaxy S25 Ultra",
price: 1199,
spec: "256GB • AMOLED • 5G",
image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=90",
description: "Flagship Samsung smartphone with a large AMOLED display, powerful processor and professional camera."
},
{
id: 3,
brand: "Google",
name: "Pixel 9 Pro",
price: 899,
spec: "256GB • OLED • 5G",
image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=90",
description: "Google Pixel with intelligent AI features and an advanced photography experience."
},
{
id: 4,
brand: "Xiaomi",
name: "Xiaomi 15",
price: 699,
spec: "256GB • AMOLED • 5G",
image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=90",
description: "Powerful Xiaomi smartphone offering premium performance and a beautiful AMOLED display."
},
{
id: 5,
brand: "OnePlus",
name: "OnePlus 13",
price: 749,
spec: "512GB • AMOLED • 5G",
image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=900&q=90",
description: "High-performance OnePlus smartphone with fast charging and flagship-level hardware."
},
{
id: 6,
brand: "Apple",
name: "iPhone 15 Pro Max",
price: 899,
spec: "256GB • Titanium • 5G",
image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=900&q=90",
description: "Powerful Apple smartphone featuring a titanium body and professional camera system."
},
{
id: 7,
brand: "Samsung",
name: "Galaxy S24 Ultra",
price: 899,
spec: "256GB • AMOLED • 5G",
image: "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=900&q=90",
description: "Samsung flagship with excellent display quality, S Pen support and powerful cameras."
},
{
id: 8,
brand: "Xiaomi",
name: "Xiaomi 14 Ultra",
price: 799,
spec: "512GB • AMOLED • 5G",
image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=90",
description: "Premium Xiaomi device designed for photography, gaming and everyday performance."
}
];

let cart = [];
let favorites = [];
let currentCurrency = "USD";
let currentBrand = "all";

document.addEventListener("DOMContentLoaded", function () {

renderProducts();

updateCart();

document
    .getElementById("currency")
    .addEventListener("change", function () {

        currentCurrency = this.value;

        renderProducts();

        updateCart();

    });

});

/* ================= CURRENCY ================= */

function formatPrice(price) {

if (currentCurrency === "KHR") {

    const khr = Math.round(price * 4100);

    return khr.toLocaleString() + " ៛";

}

return "$" + price.toLocaleString();

}

/* ================= PRODUCTS ================= */

function renderProducts(list = null) {

const productList =
    document.getElementById("product-list");

const noProducts =
    document.getElementById("no-products");

const data = list || products;

productList.innerHTML = "";

if (data.length === 0) {

    noProducts.style.display = "block";

    return;

}

noProducts.style.display = "none";


data.forEach(product => {

    const isFavorite =
        favorites.includes(product.id);

    const card = document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `

        <div class="product-image">

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <button
                class="favorite ${isFavorite ? "active" : ""}"
                onclick="toggleFavorite(${product.id})"
            >
                ${isFavorite ? "♥" : "♡"}
            </button>

        </div>

        <div class="product-info">

            <div class="product-brand">
                ${product.brand}
            </div>

            <h3 class="product-name">
                ${product.name}
            </h3>

            <p class="product-spec">
                ${product.spec}
            </p>

            <div class="product-bottom">

                <div class="product-price">
                    ${formatPrice(product.price)}
                </div>

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})"
                >
                    +
                </button>

            </div>

            <button
                class="view-button"
                onclick="openProductModal(${product.id})"
            >
                VIEW DETAILS
            </button>

        </div>

    `;

    productList.appendChild(card);

});

}

/* ================= SEARCH ================= */

function searchProducts() {

const keyword =
    document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();

let filtered = products.filter(product => {

    const matchSearch =
        product.name.toLowerCase().includes(keyword) ||
        product.brand.toLowerCase().includes(keyword) ||
        product.spec.toLowerCase().includes(keyword);

    const matchBrand =
        currentBrand === "all" ||
        product.brand === currentBrand;

    return matchSearch && matchBrand;

});

renderProducts(filtered);

}

/* ================= BRAND ================= */

function filterBrand(brand) {

currentBrand = brand;

searchProducts();

}

/* ================= FAVORITE ================= */

function toggleFavorite(id) {

if (favorites.includes(id)) {

    favorites =
        favorites.filter(item => item !== id);

} else {

    favorites.push(id);

}

searchProducts();

}

/* ================= CART ================= */

function addToCart(id) {

const product =
    products.find(item => item.id === id);

if (!product) {
    return;
}


const existing =
    cart.find(item => item.id === id);

if (existing) {

    existing.quantity++;

} else {

    cart.push({
        ...product,
        quantity: 1
    });

}

updateCart();

openCart();

}

function updateCart() {

const cartCount =
    document.getElementById("cart-count");

const cartItems =
    document.getElementById("cart-items");

const cartTotal =
    document.getElementById("cart-total");


const totalQuantity =
    cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


const totalPrice =
    cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );


cartCount.innerText = totalQuantity;

cartTotal.innerText =
    formatPrice(totalPrice);


if (cart.length === 0) {

    cartItems.innerHTML = `

        <div class="empty-cart">

            <div>🛒</div>

            <h3>
                Your cart is empty
            </h3>

            <p>
                Add some phones to your cart.
            </p>

        </div>

    `;

    return;

}


cartItems.innerHTML = "";


cart.forEach(item => {

    const div =
        document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `

        <img
            src="${item.image}"
            alt="${item.name}"
        >

        <div class="cart-item-info">

            <h4>
                ${item.name}
            </h4>

            <p>
                ${formatPrice(item.price)}
            </p>

            <div class="quantity">

                <button
                    onclick="changeQuantity(${item.id}, -1)"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${item.id}, 1)"
                >
                    +
                </button>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        </div>

    `;

    cartItems.appendChild(div);

});

}

function changeQuantity(id, amount) {

const item =
    cart.find(product => product.id === id);

if (!item) {
    return;
}

item.quantity += amount;

if (item.quantity <= 0) {

    cart =
        cart.filter(product => product.id !== id);

}

updateCart();

}

function removeFromCart(id) {

cart =
    cart.filter(product => product.id !== id);

updateCart();

}

function openCart() {

document
    .getElementById("cart-drawer")
    .classList.add("open");

document
    .getElementById("cart-overlay")
    .classList.add("show");

}

function closeCart() {

document
    .getElementById("cart-drawer")
    .classList.remove("open");

document
    .getElementById("cart-overlay")
    .classList.remove("show");

}

/* ================= CHECKOUT ================= */

function checkout() {

if (cart.length === 0) {

    alert("Your cart is empty.");

    return;

}


const total =
    cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


alert(
    "Thank you for your order!\n\n" +
    "Total: " +
    formatPrice(total) +
    "\n\n" +
    "Please contact PhoneShop to complete payment."
);

}

/* ================= PRODUCT MODAL ================= */

function openProductModal(id) {

const product =
    products.find(item => item.id === id);

if (!product) {
    return;
}


const modal =
    document.getElementById("product-modal");

const body =
    document.getElementById("modal-body");


body.innerHTML = `

    <div class="modal-product">

        <div>

            <img
                src="${product.image}"
                alt="${product.name}"
            >

        </div>

        <div>

            <span class="section-label">
                ${product.brand}
            </span>

            <h2>
                ${product.name}
            </h2>

            <p>
                ${product.spec}
            </p>

            <div class="price">
                ${formatPrice(product.price)}
            </div>

            <p class="description">
                ${product.description}
            </p>

            <button
                class="modal-add"
                onclick="addToCart(${product.id}); closeProductModal();"
            >
                Add to Cart
            </button>

        </div>

    </div>

`;


modal.classList.add("show");

document.body.style.overflow = "hidden";

}

function closeProductModal() {

document
    .getElementById("product-modal")
    .classList.remove("show");

document.body.style.overflow = "";

}

/* ================= MOBILE MENU ================= */

function toggleMobileMenu() {

document
    .getElementById("mobile-menu")
    .classList.toggle("show");

}

/* ================= ESC KEY ================= */

document.addEventListener("keydown", function (event) {

if (event.key === "Escape") {

    closeCart();

    closeProductModal();

}

});
