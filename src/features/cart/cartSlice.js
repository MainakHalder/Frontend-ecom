import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get(
    "https://backend-ecom-beta.vercel.app/V1/cart"
  );
  return response.data;
});

export const addCart = createAsyncThunk("cart/addCart", async (cartItem) => {
  const response = await axios.post(
    "https://backend-ecom-beta.vercel.app/V1/cart",
    cartItem
  );
  return response?.data?.cart;
});

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ cartId, updatedCart }) => {
    const response = await axios.post(
      `https://backend-ecom-beta.vercel.app/V1/cart/${cartId}`,
      updatedCart
    );
    return response.data.cart;
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (cartId) => {
    const response = await axios.delete(
      `https://backend-ecom-beta.vercel.app/V1/cart/${cartId}`
    );
    return cartId;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartStatus: "idle",
    cart: [],
    cartError: null,
    selectedSize: {}, //dynamically allocates productId with selected size
    deliveryCharges: 30,
    coupon: 500,
    selectedProduct: {},
  },
  reducers: {
    setSizeArr: (state, action) => {
      state.selectedSize = {
        ...state.selectedSize,
        [action.payload.productId]: action.payload.size,
      };
    },
    deleteSizeArr: (state, action) => {
      state.selectedSize = action.payload;
    },
    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    setSelectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setClearCart: (state) => {
      state.cart = [];
      state.selectedProduct = {};
      state.selectedSize = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.cartStatus = "Cart is loading";
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cartStatus = "Cart fetched successfully";
      state.cart = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.cartError = action?.error?.message;
      toast.error(state.cartError, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(addCart.pending, (state) => {
      state.cartStatus = "Adding cart";
      toast.info(state.cartStatus, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(addCart.fulfilled, (state, action) => {
      state.cartStatus = "Product is added to the cart";
      state.cart.push(action.payload);
      toast.success(state.cartStatus, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(addCart.rejected, (state, action) => {
      state.cartError = action?.error?.message;
      toast.error(state.cartError, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(updateCart.pending, (state) => {
      state.cartStatus = "Updating cart item's quantity";
      toast.info(state.cartStatus, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.cartStatus = "Quantity is updated in cart";
      const cartItemIndex = state.cart.findIndex(
        (item) => item._id === action.payload?._id
      );
      if (cartItemIndex !== -1) {
        state.cart[cartItemIndex] = action.payload;
      }
      toast.success(state.cartStatus, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(updateCart.rejected, (state, action) => {
      state.cartError = action?.error?.message;
      toast.error(state.cartError, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(deleteCart.pending, (state) => {
      state.cartStatus = "Deleting cart items or clearing the cart";
      toast.info(state.cartStatus, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.cartStatus = "Cart item is deleted successfully";
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      toast.success(state.cartStatus, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(deleteCart.rejected, (state, action) => {
      state.cartError = action?.error?.message;
      toast.error(state.cartError, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
  },
});

export const {
  setSizeArr,
  setCoupon,
  deleteSizeArr,
  setSelectProduct,
  setClearCart,
} = cartSlice.actions;

export default cartSlice;
