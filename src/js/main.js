import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";

const tentsData = new ProductData("tents");
const tentsList = new ProductList("tents", tentsData, document.getElementById("product-list"));
tentsList.init();
updateCartCount();