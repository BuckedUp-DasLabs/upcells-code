# Scripts for handling api calls on upcells with dropdowns

## How to put into instapage
### 1. Place this code into html/css head
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BuckedUp-DasLabs/Custom-Select@latest/style.css" />
<script src="https://cdn.jsdelivr.net/gh/BuckedUp-DasLabs/Custom-Select@latest/custom-select.js" defer></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BuckedUp-DasLabs/upcells-code@latest/src/scss/style.css" />
```
### 2. Place this code into a html block, where you want the product to be (one for each product) (change the 999 for the product id)
```
<div class="products-list prod-999">

</div>
```

### 2.5 Place this code into a html block, where you want the buttons of the respective product to be (if there will be buttons) (change 742 for the product id)
```
<div class="buttons-list buttons-742">

</div>

```
### 3. Place this code and change as necessary into html/css footer if DROPDOWN
```
<script>
  const urlParams = new URLSearchParams(window.location.search);
  const origin = window.location.pathname.replace("/", "").replace("/", "");
  document.cookie =
    "offer_id=" + origin + "; path=/; domain=.buckedup.com;max-age=3600";
  localStorage.setItem("first_page", origin);
  const orderID = urlParams.get("order_uuid");


  //CHANGE FROM HERE UNTILL COMMENT SAYING TO STOP.
  const isLP = false;

  if(isLP)
    urlParams.set("utm_source","")

  const country = "ca" //if us erase this line.

  const productsID = [999,935]; //ID of each the product
  const isFinalPage = {999: false, 935: true};
  const buyButtonsIds = [["#element-35"],["#element-37"]]; //IDs of each button of each product(in the order put in productID).
  const noThanksButtonsIds = ["#element-36"]; //IDs of each button that denies the purchase
  const buyRedirect = `https://get.buckedup.com/dbdus3?${urlParams}`; //Link the user will be sent after buying
  const noThanksRedirect = `https://get.buckedup.com/dbdus3?${urlParams}`; //Link the user will be sent after denying

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
  const setDataLayer = (event, action, value, currency=undefined) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      step_count: "", //lp, us1, us2, us3, ds1, ty
      page_id: "", //OG-LP-OMO, pegar pelo query da url, passar pra frente.
      version_id: "", //v1-control, v2-dropdown, v2-modal
      event: event, //offer_view, interaction
      action: action, //purchase, purchase-us, click, view_page
      value: value, //final purchase value
      currency: currency,
      country: country, //if country not defined, use "us".
      transaction_id: orderID,
    });
  };

  const dataLayerStart = () => {
    setDataLayer((event = "pageview"), (action = "load"), (value = 0));
  };

  const dataLayerBuy = (data) => {
    const formatted = data.product.price.match(/([A-Za-z]+)? ?\$(\d+\.\d+)/);
    const currentCurrency = formatted[1] || "USD"
    const currentValue = parseFloat(formatted[2]).toFixed(2)
    setDataLayer(
      (event = "interaction"),
      (action = "purchase"),
      (value = currentValue), //dont change
      (currency = currentCurrency),
    );
  };

  const dataLayerNoThanks = () => {
    setDataLayer((event = "interaction"), (action = "click"), (value = 0));
  };

  //STOP HERE.

  let hasStock = false;
</script>
```
### 3.5 Place this code and change as necessary into html/css footer if BUTTONS
```
<script>
  const urlParams = new URLSearchParams(window.location.search);
  const origin = window.location.pathname.replace("/", "").replace("/", "");
  document.cookie =
    "offer_id=" + origin + "; path=/; domain=.buckedup.com;max-age=3600";
  localStorage.setItem("first_page", origin);
  const orderID = urlParams.get("order_uuid");


  //CHANGE FROM HERE UNTILL COMMENT SAYING TO STOP.
  const isLP = false;

  if(isLP)
    urlParams.set("utm_source","")

  const country = "ca" //if us erase this line.

  const productsID = [999]; //ID of each the product
  const isFinalPage = false;
  const buyButtonsIds = ["#element-35"]; //IDs of each button of each product(in the order put in productID).
  const noThanksButtonsIds = ["#element-36"]; //IDs of each button that denies the purchase
  const buyRedirect = `https://get.buckedup.com/dbdus3?${urlParams}`; //Link the user will be sent after buying
  const noThanksRedirect = `https://get.buckedup.com/dbdus3?${urlParams}`; //Link the user will be sent after denying

  //DONT CHANGE
  const buyButton = [];
  const noThanksButton = [];

  buyButtonsIds.forEach((id) => {
    buyButton.push(document.querySelector(id));
  });

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
  const setDataLayer = (event, action, value, currency=undefined) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      step_count: "", //lp, us1, us2, us3, ds1, ty
      page_id: "", //OG-LP-OMO, pegar pelo query da url, passar pra frente.
      version_id: "", //v1-control, v2-dropdown, v2-modal
      event: event, //offer_view, interaction
      action: action, //purchase, purchase-us, click, view_page
      value: value, //final purchase value
      currency: currency,
      transaction_id: orderID,
    });
  };

  const dataLayerStart = () => {
    setDataLayer((event = "pageview"), (action = "load"), (value = 0));
  };

  const dataLayerBuy = (price, currentCurrency) => {
    setDataLayer(
      (event = "interaction"),
      (action = "purchase"),
      (value = price), //dont change
      (currency = currentCurrency)
    );
  };

  const dataLayerRedirect = () => {
    setDataLayer((event = "offerview"), (action = "viewaction"), (value = 0));
  };

  const dataLayerNoThanks = () => {
    setDataLayer((event = "interaction"), (action = "click"), (value = 0));
  };

  //STOP HERE.

  let hasStock = false;
</script>
```
### 4. If dropdown, place this after the previous code:
```
<script src="https://cdn.jsdelivr.net/gh/BuckedUp-DasLabs/upcells-code@latest/src/js/scripts.js" type="module"></script>
```
### 4.5 If buttons, place this after the previous code: 
```
<script src="https://cdn.jsdelivr.net/gh/BuckedUp-DasLabs/upcells-code@latest/src/js/Button/scripts.js" type="module"></script>
```

## How to compile scss

### either install the compiler from the sass website, or install the vscode extension live sass compiler.
