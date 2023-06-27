const urlParams = new URLSearchParams(window.location.search);
urlParams.delete("step_count");
urlParams.delete("step_code");
urlParams.delete("from");
urlParams.delete("to");
urlParams.delete("product1");
urlParams.delete("product0");
const origin = window.location.pathname.replace("/", "").replace("/", "");
document.cookie =
  "offer_id=" + origin + "; path=/; domain=.buckedup.com;max-age=3600";
localStorage.setItem("first_page", origin);
const orderID = urlParams.get("order_uuid");

//CHANGE FROM HERE UNTILL COMMENT SAYING TO STOP.

const productsID = [999,935]; //ID of each the product
const isFinalPage = {999: false, 935: true};
const buyButtonsIds = [["#element-35"],["#element-37"]]; //IDs of each button of each product(in the order put in productID).
const noThanksButtonsIds = ["#element-36"]; //IDs of each button that denies the purchase
const buyRedirect = `https://get.buckedup.com/dbdus3?order_uuid=${orderID}`; //Link the user will be sent after buying
const noThanksRedirect = `https://get.buckedup.com/dbdus3?order_uuid=${orderID}`; //Link the user will be sent after denying

//DONT CHANGE
const buyButton = [];
const noThanksButton = [];

buyButtonsIds.forEach(ids=>{
  let buttons = [];
  ids.forEach(id=>{
    buttons.push(document.querySelector(id));
  })
  buyButton.push(buttons);
})

noThanksButtonsIds.forEach((id) => {
  noThanksButton.push(document.querySelector(id));
});

const row = {}
productsID.forEach(id=>{
  row[id] = document.querySelector(`.products-list.prod-${id}`)
})
//CHANGE FROM HERE UNTILL COMMENT SAYING TO STOP.

//OFFER STEP:
// Offer Page: lp
// Upsell 1: us1
// Upsell 2: us2
// Downsell: ds1
// Final page: fu

// ACTION:
// when user buys on Landing Page: purchase
// when user buys on Upsell or Downsell or Final page: purchase-us
// any other action: click

//CHANGE ONLY WHAT IS SAID TO CHANGE.
const setDataLayer = (step_count, step_value, event, action) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    offer_id: localStorage.getItem("first_page"),
    offer_step: "ds1", //CHANGE!!!!!!!
    step_count: step_count,
    offer_page: "/landing",
    from_step: document.referrer,
    step_value: step_value,
    total_value: 0,
    event: event,
    target: null,
    action: action,
    "target-properties": "Upsell - Page View",
    value: 0,
    page_id: origin,
    "interaction-type": false,
    function: "Start Upsell Page View",
    first_page: localStorage.getItem("first_page"),
    from: origin,
    product: null,
    type: "Unbounce Upsell", //CHANGE!!!!!!!
  });
};

//dataLayer call when the page is first opened
dataLayerStart = () => {
  setDataLayer(
    (step_count = "2"),
    (step_value = 0),//DONT CHANGE!!!!!.
    (event = "offer_view"),
    (action = "pageview")
  );
};

//dataLayer call when the user buys
dataLayerBuy = (data) => {
  setDataLayer(
    (step_count = "1"),
    (step_value = data.product.price.slice(1)),//DONT CHANGE!!!!!.
    (event = "interaction"),
    (action = "purchase-us")
  );
};

//dataLayer call when the user dont buy
dataLayerNoThanks = () => {
  setDataLayer(
    (step_count = "2"),
    (step_value = 0),//DONT CHANGE!!!!!.
    (event = "interaction"),
    (action = "click")
  );
};

//STOP HERE.
const toggleButton = (buttons) => {
  buttons.forEach((btn) => {
    btn.classList.toggle("btn-lock");
    btn.toggleAttribute("btn-lock");
  });
};

const createElement = () => {
  const col = document.createElement("div");
  col.classList.add("product");

  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("product__img");

  const img = document.createElement("img");

  const selectWrapper = document.createElement("div");
  selectWrapper.classList.add("product__select-wrapper");

  const label = document.createElement("label");
  label.innerHTML = "Select a Variant:&nbsp;*";

  const select = document.createElement("select");
  select.classList.add("product-select");
  select.setAttribute("custom-select", "");

  const selectedOption = document.createElement("p");
  selectedOption.classList.add("custom-select__name");

  selectWrapper.appendChild(label);
  selectWrapper.appendChild(select);
  imgWrapper.appendChild(img);
  col.appendChild(imgWrapper);
  col.appendChild(selectWrapper);

  return {
    col,
    imgWrapper,
    img,
    selectWrapper,
    label,
    select,
    selectedOption,
  };
};

const createOption = (value, text = "") => {
  const option = document.createElement("option");
  option.value = value;
  option.text = text;
  return option;
};

//updates product image based on selected option
const updateImage = (element, values) => {
  element.img.src = values.filter(
    (val) => val.id == element.select.value
  )[0].images[0];
};

//updates available shirt sizes based on stock for selected color
const updateSizes = (
  updateSelects,
  sizeSelect,
  colorElement,
  sizes,
  stock
) => {
  sizeSelect.innerHTML = "";
  sizes.forEach((size) => {
    if (
      Object.hasOwn(stock, `[${colorElement.select.value},${size.id}]`) ||
      Object.hasOwn(stock, `[${size.id},${colorElement.select.value}]`)
    )
      sizeSelect.appendChild(createOption(size.id, size.name));
  });
  if (updateSelects) updateSelect(sizeSelect);
};

const fetchProduct = async (productID) => {
  const response = await fetch(
    `https://ar5vgv5qw5.execute-api.us-east-1.amazonaws.com/list/${productID}`
  );
  const data = await response.json();
  if (!response.ok) {
    console.log("Error Fetching API");
    console.log(data);
    return null;
  }
  return data;
};

const tshirtProduct = (data, btnIndex) => {
  const stock = data.product.stock;
  const colors = data.product.options[0].values;
  const sizes = data.product.options[1].values;
  colors.forEach((color) => {
    sizes.forEach((size) => {
      if (stock[`[${color.id},${size.id}]`] <= 0)
        delete stock[`[${color.id},${size.id}]`];
      if (stock[`[${size.id},${color.id}]`] <= 0)
        delete stock[`[${size.id},${color.id}]`];
    });
  });
  if (Object.keys(stock).length === 0) {
    return;
  }
  hasStock = true;
  const colorElement = createElement();
  colorElement.select.id = data.product.options[0].id;

  const sizeSelect = document.createElement("select");
  sizeSelect.classList.add("product-select");
  sizeSelect.id = data.product.options[1].id;
  sizeSelect.setAttribute("custom-select", "");

  colorElement.selectWrapper.appendChild(sizeSelect);
  row[data.product.id].appendChild(colorElement.col);

  for (let color of colors) {
    for (let size of sizes) {
      if (
        Object.hasOwn(stock, `[${color.id},${size.id}]`) ||
        Object.hasOwn(stock, `[${size.id},${color.id}]`)
      ) {
        colorElement.select.appendChild(createOption(color.id, color.name));
        break;
      }
    }
  }
  updateImage(colorElement, colors);
  colorElement.select.addEventListener("change", () => {
    updateImage(colorElement, colors);
  });
  colorElement.select.addEventListener("change", () => {
    updateSizes(true, sizeSelect, colorElement, sizes, stock);
  });

  updateSizes(false, sizeSelect, colorElement, sizes, stock);
  toggleButton(buyButton[btnIndex]);
  return true;
};

const haveAllStock = (options) => {
  for (let option of options) {
    let hasStock = false;
    for (let value of option.values) {
      if (value.in_stock) {
        hasStock = true;
        break;
      }
    }
    if (!hasStock) return false;
  }
  return true;
};

//checks if a specific option is in stock.
const hasThisStock = (values) => {
  for (let value of values) {
    if (value.in_stock) return value;
  }
  return false;
};

//checks if there's more than one value in stock for an option.
const hasMoreThanOne = (values) => {
  let i = 0;
  for (let value of values) {
    if (value.in_stock) i++;
    if (i >= 2) return true;
  }
  return false;
};

const normalProduct = (data,btnIndex) => {
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

let fetchedCounter = 0;
const handleProduct = async (productID,btnIndex,resolve) => {
  const data = await fetchProduct(productID);
  //if null, api failed.
  if (data == null) return;
  const isNormalProduct = Object.hasOwn(
    data.product.options[0].values[0],
    "in_stock"
  );
  //if values doesnt have the property "in_stock", then the product is tshirt.
  if (isNormalProduct) normalProduct(data,btnIndex);
  else tshirtProduct(data,btnIndex);
  fetchedCounter++;
  if (fetchedCounter === productsID.length) resolve();
  globalData.push(data);
  return;
};

const handleAllProducts = () => {
  return new Promise((resolve) => {
    let btnIndex=0;
    for (let id of productsID) {
      handleProduct(id, btnIndex, resolve);
      btnIndex++;
    }
  });
};

const postApi = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const responseLog = await response.json();
  if (!response.ok) {
    alert("There was a problem with your request. Please try again later.");
    return false;
  }
  return responseLog;
};

//updates order
const buy = async (data) => {
  //if equals 0, then the data hasnt been fetched yet.
  if (data.length === 0) {
    return;
  }
  //if null, the api wasnt able to return the data.
  if (data == null) {
    alert("There was an error with your request. Please try again later.");
    return;
  }
  dataLayerBuy(data);
  let body = {
    order_uuid: orderID,
    items: [],
  };
  //item to be updated into order
  const newItem = {
    product_id: data.product.id,
    price: parseFloat(data.product.price.slice(1)),
    quantity: 1,
    options: {},
  };
  //iterates over product options
  data.product.options.forEach((op) => {
    const select = document.getElementById(`${op.id}`);
    newItem.options[op.id] = select.value;
    newItem.price += parseFloat(data.product.options.find(option => option.id === op.id).values.find(value=>value.id == select.value).price.slice(1));
  });
  body.items.push(newItem);
  const fetchURL = `https://ar5vgv5qw5.execute-api.us-east-1.amazonaws.com/upsell/${orderID}`;
  const fetchURLfinal = `https://ar5vgv5qw5.execute-api.us-east-1.amazonaws.com/upsell/${orderID}/finish`;
  const response = await postApi(fetchURL, body);
  console.log(response);
  if (!response) return;
  if (isFinalPage[data.product.id]) {
    const response = await postApi(fetchURLfinal, null);
    console.log(response);
    if (!response) return;
  }
  window.location.href = buyRedirect;
};

const noThanks = () => {
  dataLayerNoThanks();
  window.location.href = noThanksRedirect;
};

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
