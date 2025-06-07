import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../features/cart/cartSlice";
import { productSlice } from "../features/products/productSlice";
import { wishlistSlice } from "../features/wishlist/wishlistSlice";
import { addressSlice } from "../features/address/addressSlice";

export default configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    address: addressSlice.reducer,
  },
});
