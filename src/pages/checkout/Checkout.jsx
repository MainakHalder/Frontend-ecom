import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchCart,
  setClearCart,
  deleteCart,
} from "../../features/cart/cartSlice";
import { fetchUser } from "../../features/address/addressSlice";
import { Link } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import Spinners from "../../components/Spinners";
const Checkout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchUser());
  }, [dispatch]);
  const {
    cartStatus,
    coupon,
    deliveryCharges,
    cart,
    selectedProduct,
    selectedSize,
    orderHistory,
  } = useSelector((state) => state.cart);
  const { userStatus, user, selectedAddress } = useSelector(
    (state) => state.address
  );
  const totalCheckoutPrice = cart?.reduce(
    (acc, cur) => (acc += cur.products.price * cur.quantity),
    0
  );
  const totalOrderPrice = orderHistory?.reduce(
    (acc, cur) => (acc += cur.products.price * cur.quantity),
    0
  );
  const handleCheckout = () => {
    cart?.map((item) => dispatch(deleteCart(item._id)));
    dispatch(setClearCart());
  };
  //Deleting all cart items if the available cart items is bought
  return (
    <>
      {cartStatus === "loading" && userStatus === "loading" ? (
        <Spinners />
      ) : (
        <div className="bg-body-tertiary mt-3">
          <div className="container text-center p-3">
            <h1 className="text-secondary">Check Out</h1>
            <div className="row">
              <OrderSummary
                cart={cart}
                selectedSize={selectedSize}
                totalCheckoutPrice={totalCheckoutPrice}
                coupon={coupon}
                deliveryCharges={deliveryCharges}
                selectedProduct={selectedProduct}
                handleCheckout={handleCheckout}
              />
              <div className="col-md-4 my-3">
                <div className="card">
                  <h2 className="card-header text-secondary">Address </h2>
                  <div className="card-body p-3">
                    Selected Address: {selectedAddress || user[0]?.address[0]}
                    <br />
                    <Link className="btn btn-secondary my-3" to="/users">
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {orderHistory.length ? (
              <div className="card my-3">
                <h3 className="card-header text-secondary">Order History</h3>
                <div className="card-body">
                  <ul className="list-group">
                    {orderHistory.map((item, index) => (
                      <li
                        className="list-group-item text-secondary fw-semibold"
                        key={index}
                      >
                        {item.products.name} x {item.quantity} - ₹
                        {item.products.price}
                      </li>
                    ))}
                  </ul>
                  <p className="fw-semibold">
                    Total ordered price -{" "}
                    {totalOrderPrice - coupon + deliveryCharges}
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Checkout;
