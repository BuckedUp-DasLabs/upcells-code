const urlParams = new URLSearchParams(window.location.search);
const origin = window.location.pathname.replace("/", "").replace("/", "");
document.cookie =
  "offer_id=" + origin + "; path=/; domain=.buckedup.com;max-age=3600";
localStorage.setItem("first_page", origin);

//CHANGE FROM HERE UNTILL COMMENT SAYING TO STOP.

urlParams.set("utm_source", "");

// const country = "ca";

const productsID = [6682439516369,6675141558481]; //ID of each the product
const buyButtonsIds = [["#element-35"],["#element-37"]]; //IDs of each button of each product(in the order put in productID).

//DONT CHANGE
const buyButton = [];

buyButtonsIds.forEach((ids) => {
  let buttons = [];
  ids.forEach((id) => {
    buttons.push(document.querySelector(id));
  });
  buyButton.push(buttons);
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
    transaction_id: undefined,
  });
};

const dataLayerStart = () => {
  setDataLayer((event = "pageview"), (action = "load"), (value = 0));
};

const dataLayerRedirect = () => {
  setDataLayer((event = "offerview"), (action = "viewaction"), (value = 0));
};

//STOP HERE.

// let hasStock = false;
