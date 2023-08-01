import { haveAllStock } from "../../../modules/handleProduct/stockFunctions.js";
import { createElement, updateImage, createButton } from "./domElements.js";
import toggleButton from "../toggleButton.js";

const normalProduct = (data, btnIndex) => {
  const buttonList = document.querySelector(`.buttons-${data.product.id}`);
  if (!haveAllStock(data.product.options)) {
    return;
  }
  hasStock = true;
  data.product.options.forEach((op) => {
    const newElement = createElement();
    row[data.product.id]?.appendChild(newElement.col);

    const optionsWrapper = document.createElement("div");
    optionsWrapper.classList.add("buttons-list__op-wrapper")
    
    if(Object.keys(op).length > 1){
      const optionTitle = document.createElement("p")
      optionTitle.innerHTML = op.name
      buttonList.appendChild(optionTitle)
    }
    buttonList.appendChild(optionsWrapper)

    op.values.forEach((val, i) => {
      if (val.in_stock) {
        const [wrapper, button] = createButton(op.id, val.id, val.price.slice(1), val.name, val.images[0])
        if (i == 0) button.checked = true
        button.addEventListener("change", () => {
          updateImage(newElement.img, op.values, button)
        })
        optionsWrapper.appendChild(wrapper)
      }
    })
    updateImage(newElement.img, op.values, buttonList.querySelector("input"));
  });
  toggleButton();
  return true;
};

export default normalProduct;
