const fetchProduct = async (productID) => {
  const response = await fetch(
    `https://ar5vgv5qw5.execute-api.us-east-1.amazonaws.com/list/${productID}`
  );
  const data = await response.json();
  if (!response.ok) {
    console.log("Error Fetching API");
    console.log(data);
    return null;
  }
  return data;
};
