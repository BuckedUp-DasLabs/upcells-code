import toggleButton from "./modules/toggleButton.js";
import fetchProduct from "./modules/handleProduct/fetchProduct.js";
import normalProduct from "./modules/handleProduct/normalProduct.js";
import buy from "./modules/buy.js";
import noThanks from "./modules/noThanks.js";

buyButton.forEach((btnArray) => {
  toggleButton(btnArray);
});

let globalData = [];

window.onload = async () => {
  globalData = await fetchProduct(productsID);
  const noStock = (el) => !el.availableForSale;
  if (globalData.some(noStock)) window.location.href = noThanksRedirect;
  console.log(globalData);
  globalData.forEach((product,i)=>{
    normalProduct(product,i)
  })
  // normalProduct()
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

if (noThanksButton[0])
  noThanksButton.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.hasAttribute("disabled")) noThanks();
    });
  });
