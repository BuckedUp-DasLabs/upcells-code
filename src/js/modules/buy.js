import postApi from "./postApi.js";
import { fetchURL, fetchURLfinal } from "./fetchURLs.js";
import toggleButton from "./toggleButton.js";

let hasBought = 0
let hasFinalized = 0
let responseBought
let responseFinalized
//updates order
const buy = async (data) => {
  buyButton.forEach((btnArray) => {
    toggleButton(btnArray);
  });
  //if equals 0, then the data hasnt been fetched yet.
  if (data.length === 0) {
    return;
  }
  //if null, the api wasnt able to return the data.
  if (data == null) {
    return;
  }
  let body = {
    order_uuid: orderID,
    items: [],
  };
  try {
    if (country) body["country"] = country;
  } catch { }
  //item to be updated into order
  const newItem = {
    product_id: data.product.id,
    quantity: 1,
    options: {},
  };
  //iterates over product options
  data.product.options.forEach((op) => {
    const select = document.getElementById(`${op.id}`);
    newItem.options[op.id] = select.value;
  });
  body.items.push(newItem);
  if(!hasBought){
    responseBought = await postApi(fetchURL, body);
    hasBought = 1
    console.log(responseBought);
  }
  if (!responseBought) window.location.href = buyRedirect;
  if (isFinalPage[data.product.id]) {
    if(!hasFinalized){
      responseFinalized = await postApi(fetchURLfinal, null);
      hasFinalized = 1
      console.log(responseFinalized);
    }
    if (!responseFinalized) window.location.href = buyRedirect;
  }
  if(!hasBought)
    dataLayerBuy(data);
  window.location.href = buyRedirect;
};

export default buy;
