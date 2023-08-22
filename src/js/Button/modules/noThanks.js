import postApi from "../../modules/postApi.js";
import { fetchURLfinal } from "../../modules/fetchURLs.js";
import toggleButton from "./toggleButton.js";

let hasSaidNo = 0
let response
const noThanks = async () => {
  toggleButton();
  if(!hasSaidNo)
    dataLayerNoThanks();
  if (isFinalPage) {
    if(!hasSaidNo){
      response = await postApi(fetchURLfinal, null);
      hasSaidNo = 1
      console.log(response);
    }
    if (!response) window.location.href = noThanksRedirect;
  }
  window.location.href = noThanksRedirect;
};

export default noThanks;
