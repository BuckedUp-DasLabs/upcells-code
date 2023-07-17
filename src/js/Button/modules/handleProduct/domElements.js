const createElement = () => {
  const col = document.createElement("div");
  col.classList.add("product");

  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("product__img");

  const img = document.createElement("img");

  imgWrapper.appendChild(img);
  col.appendChild(imgWrapper);

  return {
    col,
    imgWrapper,
    img,
  };
};

const createButton = (optionId, valueId, text = "", src) => {
  const wrapper = document.createElement("span");
  const label = document.createElement("label");
  const button = document.createElement("input");
  const img = document.createElement("img");
  const textWrapper = document.createElement("span")
  textWrapper.classList.add("text-wrapper")
  const span = document.createElement("span");
  const span2 = document.createElement("span");
  textWrapper.appendChild(span);
  textWrapper.appendChild(span2);
  wrapper.id = optionId;
  wrapper.appendChild(button);
  wrapper.appendChild(label);
  img.src = src;
  label.appendChild(img);
  label.setAttribute("for", `${valueId}`);
  label.setAttribute("role", "button");
  button.id = `${valueId}`
  button.value = valueId;
  button.name = optionId;
  button.type = "radio"
  button.setAttribute("hidden", "");


  const textArray = text.split("-")
  if (textArray.length == 1) {
    span.innerHTML = textArray[0];
    label.appendChild(textWrapper)
    return [wrapper, button]
  }
  span.innerHTML = textArray[0]
  span2.innerHTML = textArray[1]
  span.classList.add("big")
  label.appendChild(textWrapper)
  return [wrapper, button]
}

//updates product image based on selected option
const updateImage = (img, values, button) => {
  img.src = values.filter(
    (val) => val.id == button.value
  )[0].images[0];
};

export { createElement, updateImage, createButton };
