import { Link } from "react-router-dom";
const CartItemList = ({
  cart,
  selectedSize,
  handleSize,
  handleQuantity,
  handleRemove,
  wishlistItem,
  handleWishlist,
}) => {
  return (
    <div className="col-md-8 my-3">
      {cart?.map(({ _id, products, quantity }) => (
        <div className="card mb-3" style={{ maxWidth: "540px" }} key={_id}>
          <div className="row g-0 d-flex flex-wrap">
            <div className="col-md-5">
              <img
                src={products?.image}
                alt={products?.name}
                className="img-fluid rounded-start"
                style={{
                  objectFit: "cover",
                  width: "1000px",
                  height: "375px",
                }}
              />
            </div>
            <div className="col-md-7 text-start">
              <div className="card-body">
                <h4 className="card-title fw-normal">{products?.name}</h4>
                <p className="fs-3 fw-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-currency-rupee"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                  </svg>{" "}
                  {products?.price} {"  "}
                  <span
                    style={{ textDecoration: "line-through" }}
                    className="fs-5 text-secondary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      fill="currentColor"
                      className="bi bi-currency-rupee"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                    </svg>
                    {products?.price + products?.price * 0.5}
                  </span>
                </p>
                <p className="fs-4 text-secondary fw-bold">50% off</p>
                {products?.category === "6822cfa8138e8f40adc3a801" ? (
                  <p className="fs-5">
                    Size : {selectedSize[products?._id] || "small"}
                    <select
                      onChange={(event) => {
                        handleSize(products._id, event.target.value);
                      }}
                      className="form-select-sm mx-3"
                    >
                      <option value="small">sm</option>
                      <option value="medium">md</option>
                      <option value="large">lg</option>
                      <option value="extra large">ex lg</option>
                    </select>
                  </p>
                ) : (
                  ""
                )}
                <div className="d-flex">
                  Quantity:{"  "}
                  <button
                    className="btn btn-secondary btn-sm circle-btn ms-1"
                    onClick={() =>
                      handleQuantity(_id, products._id, quantity, "add")
                    }
                  >
                    +
                  </button>
                  <span className="text-secondary mx-3">{quantity}</span>
                  <button
                    className="btn btn-secondary btn-sm circle-btn"
                    onClick={() =>
                      handleQuantity(_id, products._id, quantity, "substract")
                    }
                  >
                    -
                  </button>
                </div>
                <div className="d-grid gap-2 my-3">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => handleRemove(_id, products?._id)}
                  >
                    Remove from cart
                  </button>
                  {wishlistItem.includes(products._id) ? (
                    <Link to="/wishlist" className="btn btn-primary">
                      Go to Wishlist
                    </Link>
                  ) : (
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => handleWishlist(products._id, _id)}
                    >
                      Add to Wishlist
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CartItemList;
