const haveAllStock = (options) => {
  for (let option of options) {
    let hasStock = false;
    for (let value of option.values) {
      if (value.in_stock) {
        hasStock = true;
        break;
      }
    }
    if (!hasStock) return false;
  }
  return true;
};

//checks if a specific option is in stock.
const hasThisStock = (values) => {
  for (let value of values) {
    if (value.in_stock) return value;
  }
  return false;
};

//checks if there's more than one value in stock for an option.
const hasMoreThanOne = (values) => {
  let i = 0;
  for (let value of values) {
    if (value.in_stock) i++;
    if (i >= 2) return true;
  }
  return false;
};
