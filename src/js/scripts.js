import toggleButton from "./modules/toggleButton.js";
import handleAllProducts from "./modules/handleProduct/handleProduct.js";
import buy from "./modules/buy.js";
import noThanks from "./modules/noThanks.js";

buyButton.forEach((btnArray) => {
  toggleButton(btnArray);
});

let globalData = [];

window.onload = async () => {
  await handleAllProducts(globalData);
  if (!hasStock) window.location.href = noThanksRedirect;
  watchSelects();
  buyButton.forEach((btnArray) => {
    btnArray.forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          if(!btn.hasAttribute("disabled"))
            buy(globalData[buyButton.indexOf(btnArray)]);
        }
      );
    });
  });
};

dataLayerStart();

if (noThanksButton[0])
  noThanksButton.forEach((btn) => {
    btn.addEventListener("click",()=>{
      if(!btn.hasAttribute("disabled"))
        noThanks()
    });
  });
