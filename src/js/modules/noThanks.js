import postApi from "./postApi.js";
import { fetchURLfinal } from "./fetchURLs.js";

const noThanks = () => {
  dataLayerNoThanks();
  Object.keys(isFinalPage).forEach(async (key) => {
    if (isFinalPage[key]) {
      const response = await postApi(fetchURLfinal, null);
      console.log(response);
      if (!response) return;
    }
  });
  window.location.href = noThanksRedirect;
};

export default noThanks;
