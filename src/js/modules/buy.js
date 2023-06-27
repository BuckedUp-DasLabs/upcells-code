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
    price: parseFloat(data.product.price.slice(1)),
    quantity: 1,
    options: {},
  };
  //iterates over product options
  data.product.options.forEach((op) => {
    const select = document.getElementById(`${op.id}`);
    newItem.options[op.id] = select.value;
    newItem.price += parseFloat(data.product.options.find(option => option.id === op.id).values.find(value=>value.id == select.value).price.slice(1));
  });
  body.items.push(newItem);
  const fetchURL = `https://ar5vgv5qw5.execute-api.us-east-1.amazonaws.com/upsell/${orderID}`;
  const fetchURLfinal = `https://ar5vgv5qw5.execute-api.us-east-1.amazonaws.com/upsell/${orderID}/finish`;
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
