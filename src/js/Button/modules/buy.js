import postApi from "../../modules/postApi.js";
import { fetchURL, fetchURLfinal } from "../../modules/fetchURLs.js";

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
    quantity: 1,
    options: {},
  };
  //iterates over product options
  data.product.options.forEach((op) => {
    const button = document.querySelector(`input[name='${op.id}']:checked`)
    newItem.options[op.id] = button.value
  });
  body.items.push(newItem);
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

export default buy;
