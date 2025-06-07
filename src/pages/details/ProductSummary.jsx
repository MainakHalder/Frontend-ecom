import { Link } from "react-router-dom";
const ProductSummary = ({
  selectedProducts,
  handleSelectProduct,
  isCartItem,
  handleCart,
  isWishlistItem,
  handleWishlist,
}) => {
  return (
    <div className="col-md-4">
      <img
        src={selectedProducts?.image}
        alt={selectedProducts?.name}
        className="img-fluid my-3"
        style={{ height: "250px", width: "1000px" }}
      />
      <div className="d-grid gap-2">
        <Link
          className="btn btn-primary"
          to="/checkout"
          onClick={handleSelectProduct}
        >
          Buy Now
        </Link>
        {isCartItem.includes(selectedProducts._id) ? (
          <Link className="btn btn-primary" to="/cart">
            Go to Cart
          </Link>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={() => handleCart(selectedProducts?._id)}
          >
            Add to Cart
          </button>
        )}
        {isWishlistItem.includes(selectedProducts._id) ? (
          <Link className="btn btn-outline-primary" to="/wishlist">
            Go to Wishlist
          </Link>
        ) : (
          <button
            className="btn btn-outline-secondary"
            onClick={() => handleWishlist(selectedProducts?._id)}
          >
            Add to Wishlist
          </button>
        )}
      </div>
    </div>
  );
};
export default ProductSummary;
