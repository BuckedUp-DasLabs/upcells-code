;import postApi from "../../modules/postApi.js";
import { fetchURLfinal } from "../../modules/fetchURLs.js";

const noThanks = async () => {
  dataLayerNoThanks();
  if (isFinalPage) {
    const response = await postApi(fetchURLfinal, null);
    console.log(response);
    if (!response) window.location.href = noThanksRedirect;
  }
  window.location.href = noThanksRedirect;
};

export default noThanks;
