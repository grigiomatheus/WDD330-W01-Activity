import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const listElement = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");

  if (!listElement) return;

  if (cartItems.length === 0) {
    listElement.innerHTML =
      "<li class=\"cart-card divider\">Your cart is empty.</li>";
    if (cartFooter) cartFooter.classList.add("hide");
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  listElement.innerHTML = htmlItems.join("");

  listElement.querySelectorAll(".cart-card__remove").forEach((btn) => {
    btn.addEventListener("click", removeFromCart);
  });

  if (cartFooter) {
    cartFooter.classList.remove("hide");
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    cartFooter.querySelector(".cart-total").innerHTML =
      `Total: $${total.toFixed(2)}`;
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-id="${item.Id}">&#x2715;</span>
</li>`;

  return newItem;
}

function removeFromCart(e) {
  const id = e.target.dataset.id;
  const cartItems = getLocalStorage("so-cart") || [];
  const updated = cartItems.filter((item) => item.Id !== id);
  setLocalStorage("so-cart", updated);
  updateCartCount();
  renderCartContents();
}

renderCartContents();
updateCartCount();
