import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const response = await axios.get(
      "https://backend-ecom-beta.vercel.app/V1/wishlist"
    );
    return response.data;
  }
);

export const addWishlist = createAsyncThunk(
  "wishlist/addWishlit",
  async (wishlistItem) => {
    const response = await axios.post(
      "https://backend-ecom-beta.vercel.app/V1/wishlist",
      wishlistItem
    );
    return response?.data.wishlist;
  }
);

export const deleteWishlist = createAsyncThunk(
  "wishlist/deleteWishlist",
  async (wishlistId) => {
    const response = await axios.delete(
      `https://backend-ecom-beta.vercel.app/V1/wishlist/${wishlistId}`
    );
    return wishlistId;
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistStatus: "idle",
    wishlist: [],
    wishlistError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWishlist.pending, (state) => {
      state.wishlistStatus = "loading";
    });
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.wishlistStatus = "Wishlist fetched successfully";
      state.wishlist = action.payload;
    });
    builder.addCase(fetchWishlist.rejected, (state, action) => {
      state.wishlistError = action?.error?.message;
      toast.error(state.wishlistError, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(addWishlist.pending, (state) => {
      state.wishlistStatus = "Adding product to wishlist";
      toast.info(state.wishlistStatus, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(addWishlist.fulfilled, (state, action) => {
      state.wishlistStatus = "Product added to wishlist successfully";
      state.wishlist.push(action.payload);
      toast.success(state.wishlistStatus, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(addWishlist.rejected, (state, action) => {
      state.wishlistError = action?.error?.message;
      toast.error(state.wishlistError, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(deleteWishlist.pending, (state) => {
      state.wishlistStatus = "Deleting product from wishlist";
      toast.info(state.wishlistStatus, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(deleteWishlist.fulfilled, (state, action) => {
      state.wishlistStatus = "Wishlist item deleted successfully";
      state.wishlist = state.wishlist.filter(
        (item) => item._id !== action.payload
      );
      toast.success(state.wishlistStatus, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(deleteWishlist.rejected, (state, action) => {
      state.wishlistError = action?.error?.message;
      toast.error(state.wishlistError, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
  },
});

export default wishlistSlice;
