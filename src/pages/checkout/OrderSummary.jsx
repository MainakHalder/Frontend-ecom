import { Link } from "react-router-dom";
const OrderSummary = ({
  cart,
  selectedSize,
  totalCheckoutPrice,
  coupon,
  deliveryCharges,
  selectedProduct,
  handleCheckout,
}) => {
  return (
    <div className="col-md-8 my-3">
      {cart.length ? (
        <div className="card">
          <h2 className="card-header text-secondary">Orders</h2>
          {cart.length ? (
            <div>
              {cart.length ? (
                <ul className="list-group">
                  {cart.map((item, index) => (
                    <li className="list-group-item float-start" key={index}>
                      <strong>{item.products.name}</strong>
                      {item.products?.category?.name === "clothing" ||
                      item.products?.category === "6822cfa8138e8f40adc3a801" ? (
                        <span className="mx-3">
                          (size: {selectedSize[item.products._id] || "small"})
                        </span>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
                  <p className="my-3">
                    <strong>
                      Total Price:{" "}
                      {totalCheckoutPrice - coupon + deliveryCharges}
                    </strong>{" "}
                  </p>
                </ul>
              ) : (
                <div className="card-body p-3">
                  <h4 className="my-3 text-secondary">Cart is empty</h4>
                </div>
              )}
            </div>
          ) : selectedProduct.name ? (
            <div className="my-3">
              <h3>{selectedProduct.name}</h3>
              <p className="fs-4">
                <strong>
                  Price:{" "}
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
                </strong>
                {selectedProduct.price}
              </p>
            </div>
          ) : (
            <div className="card-body p-3">
              <h4 className="my-3 text-secondary">Cart is empty</h4>
            </div>
          )}
          <div className="row my-3">
            <div className="col-md-6">
              <Link
                className="btn btn-primary my-1"
                to="/summary"
                onClick={handleCheckout}
              >
                Confirm Order
              </Link>
            </div>
            <div className="col-md-6">
              <Link className="btn btn-outline-secondary" to="/cart">
                Edit Orders
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-secondary">No item in cart</h3>
      )}
    </div>
  );
};
export default OrderSummary;
