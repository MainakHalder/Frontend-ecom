import { Link } from "react-router-dom";
const ProductLists = ({
  sortedProducts,
  cartItems,
  wishlistItems,
  addCartItem,
  addWishlistItem,
}) => {
  return (
    <div className="row">
      {sortedProducts.length === 0 && (
        <h1 className="my-5 p-5 text-secondary">
          No products availabe with this filter or wait for the products to load
        </h1>
      )}
      {sortedProducts?.map(({ _id, name, image, price }) => (
        <div className="col-md-4" key={_id}>
          <div className="card my-3 mx-3">
            <Link
              to={`/products/${_id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={image}
                style={{
                  height: "300px",
                  width: "1000px",
                  objectFit: "cover",
                }}
                className="card-img-top img-fluid"
                alt={name}
              />
            </Link>
            <div className="card-body text-center">
              <Link
                to={`/products/${_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h5 className="card-title">{name}</h5>
                <p>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-currency-rupee"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                  </svg>
                  {price}
                </p>
              </Link>

              <div className="d-flex justify-content-center flex-wrap">
                {cartItems.includes(_id) ? (
                  <Link className="btn btn-primary mx-3 mb-1" to="/cart">
                    Go to Cart
                  </Link>
                ) : (
                  <button
                    className="btn btn-secondary mx-3 mb-1"
                    onClick={() => addCartItem(_id)}
                  >
                    Add to Cart
                  </button>
                )}
                {wishlistItems.includes(_id) ? (
                  <Link className="btn btn-outline-primary" to="/wishlist">
                    Go to Wishlist
                  </Link>
                ) : (
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => addWishlistItem(_id)}
                  >
                    Add to Wishlist
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductLists;
