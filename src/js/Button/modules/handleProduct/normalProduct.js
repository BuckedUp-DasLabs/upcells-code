import { haveAllStock } from "../../../modules/handleProduct/stockFunctions.js";
import { createElement, updateImage, createButton } from "./domElements.js";
import toggleButton from "../../../modules/toggleButton.js";

const normalProduct = (data, btnIndex) => {
  const buttonList = document.querySelector(`.buttons-${data.product.id}`);
  if (!haveAllStock(data.product.options)) {
    return;
  }
  hasStock = true;
  data.product.options.forEach((op) => {
    const newElement = createElement();

    row[data.product.id]?.appendChild(newElement.col);

    op.values.forEach((val, i) => {
      if (val.in_stock) {
        const [wrapper, button] = createButton(op.id, val.id, val.name, val.images[0])
        if (i == 0) button.checked = true
        button.addEventListener("change", () => {
          updateImage(newElement.img, op.values, button)
        })
        buttonList.appendChild(wrapper)
      }
    })
    updateImage(newElement.img, op.values, buttonList.querySelector("input"));
  });
  toggleButton(buyButton[btnIndex]);
  return true;
};

export default normalProduct;
