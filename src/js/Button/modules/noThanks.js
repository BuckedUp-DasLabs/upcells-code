import postApi from "../../modules/postApi.js";
import { fetchURLfinal } from "../../modules/fetchURLs.js";
import toggleButton from "./toggleButton.js";

const noThanks = async () => {
  toggleButton();

  dataLayerNoThanks();
  if (isFinalPage) {
    const response = await postApi(fetchURLfinal, null);
    console.log(response);
    if (!response) window.location.href = noThanksRedirect;
  }
  window.location.href = noThanksRedirect;
};

export default noThanks;
