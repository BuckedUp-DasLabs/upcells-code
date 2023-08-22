const test = async (ids) => {
  const storefrontAccessToken = "cf7a17ee55258cddfb9be5ef93cc96b2";
  const shop = "bucked-up-offers";
  const testIds = ["6682439516369", "6675141558481"];
  const query = `
  { 
    nodes(ids: [${testIds.map((id) => `"gid://shopify/Product/${id}"`)}]) {
      ... on Product {
        availableForSale
        title
        variants(first: 100) {
          edges{
            node{
              title
              price{
                amount
              }
              image {
                ... on Image {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
  `;
  const response = await fetch(
    `https://${shop}.myshopify.com/api/2021-07/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query: query }),
    }
  );
  let data = await response.json();
  data = data.data.nodes;
  data.forEach((obj) => {
    obj.variants = obj.variants.edges;
    for (let key in obj.variants) obj.variants[key] = obj.variants[key].node;
  });
  console.log(data)
  return data
};

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
test(productsID);

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
