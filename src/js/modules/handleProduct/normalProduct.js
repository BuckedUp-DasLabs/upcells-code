import { haveAllStock, hasThisStock, hasMoreThanOne } from "./stockFunctions.js";
import { createElement, updateImage, createOption } from "./domElements.js";
import toggleButton from "../toggleButton.js";

const normalProduct = (data, btnIndex) => {
  if (!haveAllStock(data.product.options)) {
    return;
  }
  hasStock = true;
  data.product.options.forEach((op) => {
    let hasStock = hasThisStock(op.values);
    const newElement = createElement();

    row[data.product.id].appendChild(newElement.col);

    newElement.select.id = op.id;
    newElement.select.addEventListener("change", () => {
      updateImage(newElement, op.values);
    });

    if (!hasMoreThanOne(op.values)) {
      newElement.selectWrapper.style.display = "none";
      newElement.selectedOption.innerHTML = hasStock.name;
      newElement.col.appendChild(newElement.selectedOption);
      newElement.select.appendChild(
        createOption(`${hasStock.id}`, hasStock.name)
      );
    } else
      op.values.forEach((val) => {
        if (val.in_stock) {
          newElement.select.appendChild(createOption(`${val.id}`, val.name));
        }
      });
    updateImage(newElement, op.values);
  });
  toggleButton(buyButton[btnIndex]);
  return true;
};

export default normalProduct;
