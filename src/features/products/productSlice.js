import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchProducts = createAsyncThunk(
  "Products/fetchProduct",
  async () => {
    const response = await axios.get(
      "https://backend-ecom-beta.vercel.app/V1/products"
    );
    return response?.data;
  }
);

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(
      "https://backend-ecom-beta.vercel.app/V1/categories"
    );
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    status: "idle",
    products: [],
    error: null,
    filter: {
      price: 0,
      category: [],
      rating: 0,
    },
    sortBy: "low",
    searchedProducts: "",
    categories: [],
  },
  reducers: {
    setFilter: (state, action) => {
      if (action.payload.filterBy === "price") {
        state.filter.price = action.payload.filterValue;
      } else if (action.payload.filterBy === "category") {
        state.filter.category = action.payload.filterValue;
      } else {
        state.filter.rating = action.payload.filterValue;
      }
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearchProducts: (state, action) => {
      state.searchedProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "Loading products";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "Products fetched successfully";
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action?.error?.message;
      toast.error(state.error, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "Categories fetched successfully";
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.error = action?.error?.message;
      toast.error(state.error, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
  },
});

export const { setFilter, setSortBy, setSearchProducts } = productSlice.actions;

export default productSlice;
