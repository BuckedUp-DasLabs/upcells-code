import postApi from "./postApi.js";
import { fetchURLfinal } from "./fetchURLs.js";

const noThanks = async () => {
  dataLayerNoThanks();
  for (let key of Object.keys(isFinalPage)) {
    if (isFinalPage[key]) {
      const response = await postApi(fetchURLfinal, null);
      console.log(response);
      if (!response) return;
    }
    window.location.href = noThanksRedirect;
  }
};

export default noThanks;
