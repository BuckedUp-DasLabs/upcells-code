import toggleButton from "./modules/toggleButton.js";
import handleAllProducts from "./modules/handleProduct/handleProduct.js";
import buy from "./modules/buy.js";
import noThanks from "./modules/noThanks.js";

toggleButton();

let globalData = [];

window.onload = async () => {
  await handleAllProducts(globalData);
  if (!hasStock) window.location.href = noThanksRedirect;
  buyButton.forEach((btn) => {
    btn.addEventListener(
      "click",
      () => {
        if(!btn.hasAttribute("disabled"))
          buy(globalData);
      }
    );
  });
};

dataLayerStart();

if (noThanksButton[0])
  noThanksButton.forEach((btn) => {
    btn.addEventListener("click", ()=>{
      if(!btn.hasAttribute("disabled"))
        noThanks()
    });
  });
