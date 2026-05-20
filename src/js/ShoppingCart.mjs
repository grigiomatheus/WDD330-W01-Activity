import { getLocalStorage, setLocalStorage, updateCartCount, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-id="${item.Id}">&#x2715;</span>
</li>`;
}

export default class ShoppingCart {
    constructor(key, parentElement) {
        this.key = key;
        this.parentElement = parentElement;
    }

    init() {
        const cartItems = getLocalStorage(this.key) || [];
        this.renderCart(cartItems);
    }

    renderCart(cartItems) {
        const cartFooter = document.querySelector(".cart-footer");

        if (cartItems.length === 0) {
            this.parentElement.innerHTML = `<li class="cart-card divider">Your cart is empty.</li>`;

            if (cartFooter)
                cartFooter.classList.add("hide");
            return;
        }

        renderListWithTemplate(
            cartItemTemplate,
            this.parentElement,
            cartItems,
            "afterbegin",
            true,
        );

        this.parentElement.querySelectorAll(".cart-card__remove").forEach((btn) => {
            btn.addEventListener("click", this.removeFromCart.bind(this));
        });

        if (cartFooter) {
            cartFooter.classList.remove("hide");
            const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
            cartFooter.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
        }
    }

    removeFromCart(e) {
        const id = e.target.dataset.id;
        const cartItems = getLocalStorage(this.key) || [];
        const updated = cartItems.filter((item) => item.Id !== id);
        setLocalStorage(this.key, updated);
        updateCartCount();
        this.renderCart(updated);
    }
}
