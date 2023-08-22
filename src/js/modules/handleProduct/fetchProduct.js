import toggleLoading from "../toggleLoading.js";
const fetchProduct = async (ids,data) => {
  toggleLoading();
  const storefrontAccessToken = "cf7a17ee55258cddfb9be5ef93cc96b2";
  const shop = "bucked-up-offers";
  const query = `
  { 
    nodes(ids: [${ids.map((id) => `"gid://shopify/Product/${id}"`)}]) {
      ... on Product {
        availableForSale
        title
        id
        variants(first: 100) {
          edges{
            node{
              id
              title
              availableForSale
              price{
                amount
              }
              image {
                ... on Image {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
  `;
  try{
    const response = await fetch(
      `https://${shop}.myshopify.com/api/2021-07/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        },
        body: JSON.stringify({ query: query }),
      }
    );
    if (!response.ok) {
      throw new Error("Error Fetching Api.")
    }
    data = await response.json();
    data = data.data.nodes;
    data.forEach((obj) => {
      obj.id = obj.id.split("/")
      obj.id = obj.id[obj.id.length - 1]
      obj.variants = obj.variants.edges.filter(edge=>edge.node.availableForSale);
      for (let key in obj.variants) obj.variants[key] = obj.variants[key].node;
    });
    toggleLoading()
    console.log(data)
    return data
  }catch(error){
    alert("Product not found.")
    console.log(error);
    return null;
  }
};

export default fetchProduct;
