import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  deleteCart,
  setSizeArr,
  setCoupon,
  deleteSizeArr,
  updateCart,
} from "./cartSlice";
import { fetchWishlist, addWishlist } from "../wishlist/wishlistSlice";
import CartItemList from "./CartItemList";
import PriceDetails from "./PriceDetails";
import Spinners from "../../components/Spinners";

const Cart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchWishlist());
  }, [dispatch]);
  const { cartStatus, cart, selectedSize, coupon, deliveryCharges } =
    useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const wishlistItem = wishlist?.map(({ products }) => products._id);
  //Array with productId's in wishlist array to check if product is already present or not
  const totalPrice = cart?.reduce(
    (acc, cur) => (acc += cur.products.price * cur.quantity),
    0
  );

  const handleRemove = (cartId, productId) => {
    if (selectedSize?.productId) {
      let otherSizes = { ...selectedSize };
      delete otherSizes[`${productId}`];
      dispatch(deleteSizeArr(otherSizes));
    }
    //Removing selected size if clothing product from cart is deleted
    dispatch(deleteCart(cartId));
  };

  const handleWishlist = (productId, cartId) => {
    if (!wishlistItem.includes(productId)) {
      let wishlistProduct = {
        products: productId,
      };
      if (selectedSize?.productId) {
        let otherSizes = { ...selectedSize };
        delete otherSizes[`${productId}`];
        dispatch(deleteSizeArr(otherSizes));
      }
      dispatch(addWishlist(wishlistProduct));
      dispatch(deleteCart(cartId));
    }
  };

  const handleSize = (productSizeId, setProductSize) => {
    let sizeArr = {
      productId: productSizeId,
      size: setProductSize,
    };
    dispatch(setSizeArr(sizeArr));
  };

  const handleQuantity = (cartId, product, productQuantity, step) => {
    let newQuantity;
    if (step === "add") {
      newQuantity = productQuantity + 1;
    } else {
      newQuantity = Math.max(productQuantity - 1, 1);
    }
    const updatedCart = {
      products: product,
      quantity: newQuantity,
    };
    dispatch(updateCart({ cartId, updatedCart }));
  };

  const handleCoupon = (couponPrice) => {
    dispatch(setCoupon(couponPrice));
  };

  return (
    <>
      {cartStatus === "loading" ? (
        <Spinners />
      ) : cart?.length ? (
        <div className="bg-body-tertiary text-center p-3">
          <h3 className="fw-semibold fs-3 text-secondary">
            My Cart ({cart?.length})
          </h3>
          <div className="row p-3 mx-3">
            <CartItemList
              cart={cart}
              selectedSize={selectedSize}
              handleSize={handleSize}
              handleQuantity={handleQuantity}
              handleRemove={handleRemove}
              wishlistItem={wishlistItem}
              handleWishlist={handleWishlist}
            />
            <div className="col-md-4 my-3">
              <PriceDetails
                cart={cart}
                totalPrice={totalPrice}
                coupon={coupon}
                deliveryCharges={deliveryCharges}
                handleCoupon={handleCoupon}
              />
            </div>
          </div>
        </div>
      ) : (
        <h1 className="p-5 text-secondary text-center">Cart is empty</h1>
      )}
    </>
  );
};
export default Cart;
