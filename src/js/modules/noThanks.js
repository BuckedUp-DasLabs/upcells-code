import postApi from "./postApi.js";
import { fetchURLfinal } from "./fetchURLs.js";
import toggleButton from "./toggleButton.js";

let hasSaidNo = 0
let response
const noThanks = async () => {
  toggleButton(noThanksButton);
  if(!hasSaidNo)
    dataLayerNoThanks();
  for (let key of Object.keys(isFinalPage)) {
    if (isFinalPage[key]) {
      if(!hasSaidNo){
        response = await postApi(fetchURLfinal, null);
        hasSaidNo = 1
        console.log(response);
      }
      if (!response) window.location.href = noThanksRedirect;
    }
    window.location.href = noThanksRedirect;
  }
};

export default noThanks;
