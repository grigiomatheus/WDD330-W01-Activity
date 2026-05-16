import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";

const tentsData = new ProductData("tents");
const tentsList = new ProductList(
  "tents",
  tentsData,
  document.getElementById("product-list"),
);
tentsList.init();
updateCartCount();

//There is a problem in Render, when you add a product to the cart, then click the back button,
//  the cart count does not update.
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    updateCartCount();
  }
});
