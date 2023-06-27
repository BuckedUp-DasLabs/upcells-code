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
const buyButtonsIds = [["#element-35"],["#element-37"]]; //IDs of each button of each product(in the order put in productID).
const noThanksButtonsIds = ["#element-36"]; //IDs of each button that denies the purchase
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
