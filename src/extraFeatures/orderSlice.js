import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchOrder = createAsyncThunk("order/fetchOrder", async () => {
  const response = await axios.get(
    "https://backend-ecom-beta.vercel.app/V1/order"
  );
  return response.data;
});

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (orderHistory) => {
    const response = await axios.post(
      "https://backend-ecom-beta.vercel.app/V1/order",
      orderHistory
    );
    return response.data?.order;
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId) => {
    const response = await axios.delete(
      `https://backend-ecom-beta.vercel.app/V1/order/${orderId}`
    );
    return orderId;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    status: "idle",
    orders: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.orders = action.payload;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.error = `Error occured: ${action?.error?.message}`;
    });
    builder.addCase(addOrder.pending, (state) => {
      state.status = "Adding data to order history";
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.status = "Order history is added";
      state.orders = action.payload;
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.error = `Error occured: ${action?.error?.message}`;
    });
    builder.addCase(deleteOrder.pending, (state) => {
      state.status = "Deleting data from order history";
      toast.info(state.status, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.status = "Order deleted successfully";
      state.orders = state.orders.filter((item) => item._id !== action.payload);
      toast.success(state.status, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
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

export default orderSlice;
