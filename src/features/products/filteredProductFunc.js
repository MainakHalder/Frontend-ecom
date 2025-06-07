function filteredProduct(filter, productList) {
  let filteredProducts = [];
  if (filter.price == 0 && filter.rating == 0 && filter.category.length == 0) {
    filteredProducts = productList || [];
  } else if (
    filter.price > 0 &&
    filter.rating > 0 &&
    filter.category.length > 0
  ) {
    filteredProducts = productList?.filter(
      ({ price, ratings, category: { name } }) =>
        price <= filter.price &&
        ratings >= filter.rating &&
        filter.category.includes(name)
    );
  } else if (
    filter.price > 0 &&
    filter.rating == 0 &&
    filter.category.length == 0
  ) {
    filteredProducts = productList?.filter(
      ({ price }) => price <= filter.price
    );
  } else if (
    filter.price == 0 &&
    filter.rating > 0 &&
    filter.category.length == 0
  ) {
    filteredProducts = productList?.filter(
      ({ ratings }) => ratings >= filter.rating
    );
  } else if (
    filter.price == 0 &&
    filter.rating == 0 &&
    filter.category.length > 0
  ) {
    filteredProducts = productList?.filter(({ category: { name } }) =>
      filter.category.includes(name)
    );
  } else if (
    filter.price > 0 &&
    filter.rating > 0 &&
    filter.category.length == 0
  ) {
    filteredProducts = productList?.filter(
      ({ price, ratings }) => price <= filter.price && ratings >= filter.rating
    );
  } else if (
    filter.price > 0 &&
    filter.rating == 0 &&
    filter.category.length > 0
  ) {
    filteredProducts = productList?.filter(
      ({ price, category: { name } }) =>
        price <= filter.price && filter.category.includes(name)
    );
  } else if (
    filter.price == 0 &&
    filter.rating > 0 &&
    filter.category.length > 0
  ) {
    filteredProducts = productList?.filter(
      ({ ratings, category: { name } }) =>
        ratings >= filter.rating && filter.category.includes(name)
    );
  }
  return filteredProducts;
}
//Filtering based on every user inputs on price, category and rating
export default filteredProduct;
