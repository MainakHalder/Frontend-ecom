import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Products from "./features/products/Products";
import Cart from "./features/cart/Cart";
import Wishlist from "./features/wishlist/Wishlist";
import Address from "./features/address/Address";
import ProductDetails from "./pages/details/ProductDetails";
import MainPage from "./pages/MainPage";
import Checkout from "./pages/checkout/Checkout";
import Summary from "./pages/Summary";
import { ToastContainer } from "react-toastify";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Header />
        </header>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/users" element={<Address />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
