import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  fetchCart,
  setSizeArr,
  setSelectProduct,
} from "../../features/cart/cartSlice";
import {
  addWishlist,
  fetchWishlist,
} from "../../features/wishlist/wishlistSlice";
import { fetchProducts } from "../../features/products/productSlice";
import ProductSummary from "./ProductSummary";
import ProductFeatures from "./ProductFeatures";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [size, setSize] = useState("small");

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
    dispatch(fetchWishlist());
  }, [dispatch]);

  let selectedProducts = products?.find(({ _id }) => _id === productId);

  let isCartItem = cart?.map(({ products }) => products._id || products);
  let isWishlistItem = wishlist?.map(
    ({ products }) => products._id || products
  );

  const categoryProducts = products?.filter(
    (categoryItem) =>
      categoryItem?.category?.name === selectedProducts?.category?.name &&
      categoryItem?._id !== selectedProducts?._id
  );
  //Products from similiar category

  const cartFeatures = [
    {
      image:
        "https://img.icons8.com/?size=100&id=SPeUsCfDgpu-&format=png&color=000000",
      desc: "Free 10 days replacement",
    },
    {
      image:
        "https://img.icons8.com/?size=100&id=15956&format=png&color=000000",
      desc: "Pay on delivery",
    },
    {
      image:
        "https://img.icons8.com/?size=100&id=85612&format=png&color=000000",
      desc: "Free Delivery",
    },
    {
      image:
        "https://img.icons8.com/?size=100&id=VxdbP91VuYUI&format=png&color=000000",
      desc: "Secured payment options",
    },
  ];
  // App features for the app with favicon and description

  const handleCart = (selectedProductId) => {
    if (!isCartItem.includes(selectedProductId)) {
      if (selectedProducts?.category.name === "clothing") {
        let sizeItem = { productId: selectedProductId, size };
        dispatch(setSizeArr(sizeItem));
      } //Selecting size dynamically for clothing items
      let cartItem = {
        products: selectedProductId,
        quantity: 1,
      };
      dispatch(addCart(cartItem));
    }
  };
  const handleWishlist = (selectedProductId) => {
    let wishlistItem = { products: selectedProductId };
    dispatch(addWishlist(wishlistItem));
  };

  const handleSelectProduct = () => {
    if (!isCartItem.includes(selectedProducts._id)) {
      if (selectedProducts?.category.name === "clothing") {
        let sizeItem = { productId: selectedProducts._id, size };
        dispatch(setSizeArr(sizeItem));
      }
      let cartItem = {
        products: selectedProducts._id,
        quantity: 1,
      };
      dispatch(addCart(cartItem));
    }
    dispatch(setSelectProduct(selectedProducts));
  };

  return (
    <>
      {selectedProducts ? (
        <div className="bg-body-tertiary p-5">
          <div className="container p-5" style={{ backgroundColor: "white" }}>
            <div className="row container">
              <ProductSummary
                selectedProducts={selectedProducts}
                handleSelectProduct={handleSelectProduct}
                isCartItem={isCartItem}
                handleCart={handleCart}
                isWishlistItem={isWishlistItem}
                handleWishlist={handleWishlist}
              />
              <ProductFeatures
                selectedProducts={selectedProducts}
                setSize={setSize}
                cartFeatures={cartFeatures}
              />
            </div>
            <hr />
            <RelatedProducts categoryProducts={categoryProducts} />
          </div>
        </div>
      ) : (
        <h1 className="p-5 text-secondary">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </h1>
      )}
    </>
  );
};
export default ProductDetails;
