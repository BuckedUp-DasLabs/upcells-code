let fetchedCounter = 0;
const handleProduct = async (productID,btnIndex,resolve) => {
  const data = await fetchProduct(productID);
  //if null, api failed.
  if (data == null) return;
  const isNormalProduct = Object.hasOwn(
    data.product.options[0].values[0],
    "in_stock"
  );
  //if values doesnt have the property "in_stock", then the product is tshirt.
  if (isNormalProduct) normalProduct(data,btnIndex);
  else tshirtProduct(data,btnIndex);
  fetchedCounter++;
  if (fetchedCounter === productsID.length) resolve();
  globalData.push(data);
  return;
};

const handleAllProducts = () => {
  return new Promise((resolve) => {
    let btnIndex=0;
    for (let id of productsID) {
      handleProduct(id, btnIndex, resolve);
      btnIndex++;
    }
  });
};
