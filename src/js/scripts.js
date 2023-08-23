import toggleButton from "./modules/toggleButton.js";
import fetchProduct from "./modules/handleProduct/fetchProduct.js";
import normalProduct from "./modules/handleProduct/normalProduct.js";
import multipleOptionsProduct from "./modules/handleProduct/multipleOptionsProduct.js";
import buy from "./modules/buy.js";

buyButton.forEach((btnArray) => {
  toggleButton(btnArray);
});

let globalData = [];

window.onload = async () => {
  globalData = await fetchProduct(productsID);
  const noStock = (el) => !el.availableForSale;
  if (globalData.some(noStock)) {
    alert("Product not found.")
    window.location.href = "https://buckedup.com"
    return;
  };
  globalData.forEach((product,i)=>{
    if(product.options.length > 1){
      multipleOptionsProduct(product,i)
      return;
    }
    normalProduct(product,i)
  })
  watchSelects();
  buyButton.forEach((btnArray) => {
    btnArray.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!btn.hasAttribute("disabled"))
          buy(globalData[buyButton.indexOf(btnArray)]);
      });
    });
  });
};

dataLayerStart();
