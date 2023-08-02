import postApi from "./postApi.js";
import { fetchURL, fetchURLfinal } from "./fetchURLs.js";

//updates order
const buy = async (data) => {
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
  const response = await postApi(fetchURL, body);
  console.log(response);
  if (!response) window.location.href = buyRedirect;
  if (isFinalPage[data.product.id]) {
    const response = await postApi(fetchURLfinal, null);
    console.log(response);
    if (!response) window.location.href = buyRedirect;
  }
  dataLayerBuy(data);
  window.location.href = buyRedirect;
};

export default buy;
