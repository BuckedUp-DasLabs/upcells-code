import toggleButton from "./toggleButton.js";
import { fetchUrl, apiOptions } from "../variables.js";

//updates order
const buy = async (data) => {
  buyButton.forEach((btnArray) => {
    toggleButton(btnArray);
  });
  //if equals 0, then the data hasnt been fetched yet.
  if (data.length === 0) {
    return;
  }
  //if null, the api wasnt able to return the data.
  if (data == null) {
    return;
  }
  console.log(data);
  const select = document.getElementById(data.id);
  const variantId = select.value;
  const input = `
    {
      "input":{
        "lineItems": [{
          "variantId": "${variantId}",
          "quantity": 1
        }]
      }
    }
  `;
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          webUrl
          currencyCode
        }
      }
    }
  `;
  const body = {
    query: query,
    variables: JSON.parse(input),
  };
  try {
    const response = await fetch(fetchUrl, {
      ...apiOptions,
      body: JSON.stringify(body),
    });
    const responseLog = await response.json();
    if(!response.ok)
      throw new Error("Api Error.")
    dataLayerRedirect()
    window.location.href = responseLog.data.checkoutCreate.checkout.webUrl;
  } catch (error) {
    alert("There was a problem. Please try again later.");
    console.log(error);
  }
};

export default buy;
