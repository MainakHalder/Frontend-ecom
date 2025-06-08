import { fetchProducts } from "./productSlice";
import { fetchCart, addCart } from "../cart/cartSlice";
import { fetchWishlist, addWishlist } from "../wishlist/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setFilter, setSortBy } from "./productSlice";
import Spinners from "../../components/Spinners";
import FilterProducts from "./FilterProducts";
import ProductLists from "./ProductLists";
import filteredProduct from "./filteredProductFunc.js";
import ToggleScreenSize from "./ToggleScreenSize.jsx";
const Products = () => {
  const dispatch = useDispatch();
  const { status, products, filter, sortBy, searchedProducts } = useSelector(
    (state) => state.products
  );
  const { cartStatus, cart } = useSelector((state) => state.cart);
  const { wishlistStatus, wishlist } = useSelector((state) => state.wishlist);
  const [screenSize, setScreenSize] = useState(0);
  const [toggleSize, setToggleSize] = useState(true);
  // hooks taken to re-arrange the components when the screen size decreases

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
    dispatch(fetchWishlist());
    setScreenSize(window.innerWidth);
  }, [dispatch]);

  let cartItems = cart?.map((item) => item.products._id || item.products);
  let wishlistItems = wishlist?.map(
    (item) => item.products._id || item.products
  );
  //Array's with productId from cart and wishlist to check if the product is already present or not

  console.log("screen size", screenSize);
  console.log("toggle", toggleSize);

  let productList = searchedProducts
    ? products.filter(
        ({ name, category }) =>
          name.toLowerCase().includes(searchedProducts.toLowerCase()) ||
          category.name.toLowerCase().includes(searchedProducts.toLowerCase())
      )
    : products;
  //If user searches particular product from search bar

  let filteredProducts = filteredProduct(filter, productList);

  const sortedProducts =
    sortBy === "high"
      ? [...filteredProducts].sort((a, b) => b.price - a.price)
      : [...filteredProducts].sort((a, b) => a.price - b.price);

  const handleFilter = (types, eventFilter) => {
    if (types === "price") {
      dispatch(setFilter({ filterBy: "price", filterValue: eventFilter }));
    } else if (types === "category") {
      let categoryArr = filter.category;
      let { value, checked } = eventFilter;
      if (checked && !categoryArr.includes(value)) {
        categoryArr = [...categoryArr, value];
      } else {
        categoryArr = categoryArr.filter((values) => values !== value);
      }
      dispatch(setFilter({ filterBy: "category", filterValue: categoryArr }));
    } else {
      dispatch(setFilter({ filterBy: "rating", filterValue: eventFilter }));
    }
  };

  const handleSort = (eventSort) => {
    dispatch(setSortBy(eventSort));
  };

  const handleClear = () => {
    dispatch(setFilter({ filterBy: "price", filterValue: 0 }));
    dispatch(setFilter({ filterBy: "rating", filterValue: 0 }));
    dispatch(setFilter({ filterBy: "category", filterValue: [] }));
    dispatch(setSortBy("low"));
  };

  const addCartItem = (productId) => {
    if (!cartItems.includes(productId)) {
      let postCart = {
        products: productId,
        quantity: 1,
      };
      dispatch(addCart(postCart));
    }
  };

  const addWishlistItem = (productId) => {
    if (!wishlistItems.includes(productId)) {
      let postWishlist = {
        products: productId,
      };
      dispatch(addWishlist(postWishlist));
    }
  };

  return (
    <>
      {status === "loading" &&
      cartStatus === "loading" &&
      wishlistStatus === "loading" ? (
        <div className="container my-5">
          <Spinners />
        </div>
      ) : (
        <div className="row pb-5">
          {screenSize < 1080 ? (
            <>
              {!toggleSize && (
                <FilterProducts
                  filter={filter}
                  sortBy={sortBy}
                  handleFilter={handleFilter}
                  handleClear={handleClear}
                  handleSort={handleSort}
                  toggleSize={toggleSize}
                />
              )}
            </>
          ) : (
            <FilterProducts
              filter={filter}
              sortBy={sortBy}
              handleFilter={handleFilter}
              handleClear={handleClear}
              handleSort={handleSort}
              toggleSize={toggleSize}
            />
          )}
          {screenSize < 1080 ? (
            <>
              {toggleSize && (
                <div className="col bg-body-tertiary p-4">
                  <h3>
                    {products ? (
                      <span className="my-5">
                        Showing All Products:
                        <span className="fs-5 text-secondary mx-3">
                          (showing {sortedProducts.length} products)
                        </span>{" "}
                      </span>
                    ) : (
                      ""
                    )}
                  </h3>
                  <ProductLists
                    sortedProducts={sortedProducts}
                    addCartItem={addCartItem}
                    addWishlistItem={addWishlistItem}
                    cartItems={cartItems}
                    wishlistItems={wishlistItems}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="col bg-body-tertiary p-4">
              <h3>
                {products ? (
                  <span className="my-5">
                    Showing All Products:
                    <span className="fs-5 text-secondary mx-3">
                      (showing {sortedProducts.length} products)
                    </span>{" "}
                  </span>
                ) : (
                  ""
                )}
              </h3>
              <ProductLists
                sortedProducts={sortedProducts}
                addCartItem={addCartItem}
                addWishlistItem={addWishlistItem}
                cartItems={cartItems}
                wishlistItems={wishlistItems}
              />
            </div>
          )}
          {screenSize < 1080 ? (
            <ToggleScreenSize
              toggleSize={toggleSize}
              setToggleSize={setToggleSize}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};
export default Products;
