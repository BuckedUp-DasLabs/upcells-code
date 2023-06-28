# Scripts for handling api calls on upcells with dropdowns

## How to put into instapage
### 1. Place this code into html/css head
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BuckedUp-DasLabs/Custom-Select@master/style.css" />
<script src="https://cdn.jsdelivr.net/gh/BuckedUp-DasLabs/Custom-Select@master/custom-select.js" defer></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BuckedUp-DasLabs/upcells-code@master/src/scss/style.css" />
```
### 2. Place this code and change as necessary into html/css footer
```
<script>
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
const buyButtonsIds = [["#element-41"],["#element-42"]]; //IDs of each button of each product(in the order put in productID).
const noThanksButtonsIds = ["#element-43"]; //IDs of each button that denies the purchase
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
let hasStock = false;
</script>
<script src="https://cdn.jsdelivr.net/gh/BuckedUp-DasLabs/upcells-code@master/src/js/scripts.js" type="module"></script>
```

## How to compile scss

### either install the compiler from the sass website, or install the vscode extension live sass compiler.
