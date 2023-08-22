import postApi from "../../modules/postApi.js";
import { fetchURL, fetchURLfinal } from "../../modules/fetchURLs.js";
import toggleButton from "./toggleButton.js";

let hasBought = 0
let hasFinalized = 0
let responseBought
let responseFinalized
//updates order
const buy = async (data) => {
  toggleButton();
  //if equals 0, then the data hasnt been fetched yet.
  if (data.length === 0) {
    return;
  }
  //if null, the api wasnt able to return the data.
  if (data == null) {
    window.location.href = buyRedirect;
    return;
  }

  if (isLP) {
    let string = ""
    data.forEach(({ product }, i) => {
      string = string + `&products[${i}][id]=${product.id}&products[${i}][quantity]=1`;
      product.options.forEach(op => {
        const button = document.querySelector(`input[name='${op.id}']:checked`)
        string = string + `&products[${i}][options][${op.id}]=${button.value.split("-")[1]}`
      })
    })
    dataLayerRedirect()
    let url = `https://buckedup.com/cart/add?${string}&${urlParams}&clear=true`;
    try {
      if (country) url = `https://${country}.buckedup.com/cart/add?${string}&${urlParams}&clear=true`
    } catch { }
    window.location.href = url
    return;
  }

  let totalPrice = 0;
  const currency = data[0].product.price.match(/([A-Za-z]+)? ?\$(\d+\.\d+)/)[1] || "USD"
  let body = {
    order_uuid: orderID,
    items: [],
  };
  try {
    if (country) body["country"] = country;
  } catch { }
  data.forEach(({ product }) => {
    totalPrice += parseFloat(product.price.match(/\d+\.\d+/)[0]);
    const newItem = {
      product_id: product.id,
      quantity: 1,
      options: {},
    };
    product.options.forEach((op) => {
      const button = document.querySelector(`input[name='${op.id}']:checked`)
      totalPrice += parseFloat(button.getAttribute("price"))
      newItem.options[op.id] = button.value.split("-")[1]
    });
    body.items.push(newItem);
  })

  if(!hasBought){
    responseBought = await postApi(fetchURL, body);
    hasBought = 1
    console.log(responseBought);
  }
  if (!responseBought) window.location.href = buyRedirect;
  if (isFinalPage) {
    if(!hasFinalized){
      responseFinalized = await postApi(fetchURLfinal, null);
      hasFinalized = 1
      console.log(responseFinalized);
    }
    if (!responseFinalized) window.location.href = buyRedirect;
  }
  if(!hasBought)
    dataLayerBuy(totalPrice.toFixed(2), currency);
  window.location.href = buyRedirect;
};

export default buy;
