import toggleLoading from "../toggleLoading.js";
const fetchProduct = async (productID) => {
  toggleLoading();
  try {
    const response = await fetch(
      `https://ar5vgv5qw5.execute-api.us-east-1.amazonaws.com/list/${productID}`
    );
    if (response.status == 500 || response.status == 400)
      window.location.href = "https://buckedup.com"
    if (!response.ok) {
      throw new Error("Error Fetching Api.")
    }
    const data = await response.json();
    toggleLoading();
    return data;
  } catch (error) {
    alert("Product not found.")
    console.log(error);
    return null;
  }
};

export default fetchProduct;
