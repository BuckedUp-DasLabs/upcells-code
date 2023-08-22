const urlParams = new URLSearchParams(window.location.search);
const origin = window.location.pathname.replace("/", "").replace("/", "");
document.cookie =
  "offer_id=" + origin + "; path=/; domain=.buckedup.com;max-age=3600";
localStorage.setItem("first_page", origin);
const orderID = urlParams.get("order_uuid");

//CHANGE FROM HERE UNTILL COMMENT SAYING TO STOP.
const isLP = true;

if (isLP) urlParams.set("utm_source", "");

// const country = "ca";

const productsID = [999]; //ID of each the product
const isFinalPage = true;
const buyButtonsIds = [["#element-35"]]; //IDs of each button of each product(in the order put in productID).
const noThanksButtonsIds = ["#element-36"]; //IDs of each button that denies the purchase
let buyRedirect = `https://get.buckedup.com/dbdus3?${urlParams}`; //Link the user will be sent after buying
let noThanksRedirect = `https://get.buckedup.com/dbdus3?${urlParams}`; //Link the user will be sent after denying

//DONT CHANGE
const buyButton = [];
const noThanksButton = [];

buyButtonsIds.forEach((ids) => {
  let buttons = [];
  ids.forEach((id) => {
    buttons.push(document.querySelector(id));
  });
  buyButton.push(buttons);
});

noThanksButtonsIds.forEach((id) => {
  noThanksButton.push(document.querySelector(id));
});

const row = {};
productsID.forEach((id) => {
  row[id] = document.querySelector(`.products-list.prod-${id}`);
});
//CHANGE FROM HERE UNTILL COMMENT SAYING TO STOP.

//CHANGE ONLY WHAT IS SAID TO CHANGE.
const setDataLayer = (event, action, value, currency = undefined) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    step_count: "", //lp, us1, us2, us3, ds1, ty
    page_id: "", //OG-LP-OMO, pegar pelo query da url, passar pra frente.
    version_id: "", //v1-control, v2-dropdown, v2-modal
    event: event,
    action: action,
    value: value,
    currency: currency,
    transaction_id: orderID,
  });
};

const dataLayerStart = () => {
  setDataLayer((event = "pageview"), (action = "load"), (value = 0));
};

const dataLayerBuy = (data) => {
  const formatted = data.product.price.match(/([A-Za-z]+)? ?\$(\d+\.\d+)/);
  const currentCurrency = formatted[1] || "USD";
  const currentValue = parseFloat(formatted[2]).toFixed(2);
  setDataLayer(
    (event = "interaction"),
    (action = "purchase"),
    (value = currentValue), //dont change
    (currency = currentCurrency)
  );
};

const dataLayerNoThanks = () => {
  setDataLayer((event = "interaction"), (action = "click"), (value = 0));
};

//STOP HERE.

let hasStock = false;
