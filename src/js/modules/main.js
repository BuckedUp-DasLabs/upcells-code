let globalData = [];
let hasStock = false;
buyButton.forEach((btnArray) => {
  toggleButton(btnArray);
});

window.onload = async () => {
  await handleAllProducts();
  if (!hasStock) window.location.href = noThanksRedirect;
  watchSelects();
  buyButton.forEach((btnArray) => {
    btnArray.forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          buy(globalData[buyButton.indexOf(btnArray)]);
        },
        { once: true }
      );
    });
  });
};

dataLayerStart();

if (noThanksButton[0])
  noThanksButton.forEach((btn) => {
    btn.addEventListener("click", noThanks, { once: true });
  });
