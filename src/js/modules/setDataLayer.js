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