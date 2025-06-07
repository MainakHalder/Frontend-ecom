import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchProducts } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchCart } from "../features/cart/cartSlice";
import { fetchWishlist } from "../features/wishlist/wishlistSlice";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchWishlist());
  }, [dispatch]);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  // Fetching Cart and Wishlist for counting them on navbar

  const handleSearch = (event) => {
    navigate("/products");
    dispatch(setSearchProducts(event.target.value));
  };
  // If any element is typed on search bar it will navigate to product page from any current pages

  return (
    <nav className="navbar navbar-expand-lg bg-body-light d-flex justify-content-around">
      <div className="container-fluid row">
        <div className="col">
          <Link className="navbar-brand text-primary fs-3 fw-semibold" to="/">
            <em>EMax</em>
          </Link>
        </div>
        <div className="col-4">
          <input
            className="form-control"
            placeholder="search"
            onChange={handleSearch}
          />
        </div>
        <div className="col ms-5">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav my-3">
              <li className="nav-item">
                <Link className="btn btn-secondary" to="/users">
                  User
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/wishlist">
                  Wishlist ({wishlist.length})
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart ({cart.length})
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
