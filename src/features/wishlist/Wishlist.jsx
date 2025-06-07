import { fetchWishlist, deleteWishlist } from "./wishlistSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, fetchCart } from "../cart/cartSlice";
import Spinners from "../../components/Spinners";
const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWishlist());
    dispatch(fetchCart());
  }, [dispatch]);
  const { wishlistStatus, wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const cartItems = cart?.map(({ products }) => products._id);

  const handleCart = (productId, wishlistId) => {
    if (!cartItems.includes(productId)) {
      let cartItem = {
        products: productId,
        quantity: 1,
      };
      dispatch(addCart(cartItem));
    }
    dispatch(deleteWishlist(wishlistId));
  };

  const handleDelete = (wishlistId) => {
    dispatch(deleteWishlist(wishlistId));
  };

  return (
    <>
      {wishlistStatus === "loading" ? (
        <Spinners />
      ) : wishlist?.length ? (
        <div className="bg-body-tertiary">
          <div className="container me-5">
            <h1 className="text-secondary text-center">My Wishlist</h1>
            <div className="row text-center">
              {wishlist?.map(({ _id, products }) => (
                <div className="col-md-3 mx-3 my-3 container-fluid" key={_id}>
                  <div className="card">
                    <img
                      src={products?.image}
                      className="card-img-top img-fluid"
                      alt={products?.name}
                      style={{ width: "1000px", height: "300px" }}
                    />
                    <div className="card-body">
                      <p className="card-text">{products?.name}</p>
                      <h4>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-currency-rupee"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                        </svg>
                        {products?.price}
                      </h4>
                    </div>
                    <button
                      className="card-footer btn btn-primary"
                      onClick={() => handleCart(products._id, _id)}
                    >
                      Move to Cart
                    </button>
                    <button
                      className="card-footer btn btn-secondary"
                      onClick={() => handleDelete(_id)}
                    >
                      Delete from Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-secondary text-center">No Wishlist items</h1>
      )}
    </>
  );
};
export default Wishlist;
