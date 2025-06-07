import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get(
    "https://backend-ecom-beta.vercel.app/V1/users"
  );
  return response.data;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, updatedUser }) => {
    const response = await axios.post(
      `https://backend-ecom-beta.vercel.app/V1/users/${userId}`,
      updatedUser
    );
    return response.data.user;
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    userStatus: "idle",
    user: [],
    userError: null,
    selectedAddress: "", //selected address by user for delivery
  },
  reducers: {
    setAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.userStatus = "User Data Loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userStatus = "User Data fetched successfully";
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.userError = action?.error?.message;
      toast.error(state.userError, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(updateUser.pending, (state) => {
      state.userStatus = "Updating user";
      toast.info(state.userStatus, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.userStatus = "User updated successfully";
      const userIndex = state.user.findIndex(
        (item) => item._id === action.payload._id
      );
      if (userIndex !== -1) {
        state.user[userIndex] = action.payload;
      } //As user is an array of object updated details is assigned to that particular user
      toast.success(state.userStatus, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.userError = action?.error?.message;
      toast.error(state.userError, {
        autoClose: 1000,
        theme: "light",
        pauseOnHover: true,
        draggable: true,
        position: "bottom-right",
      });
    });
  },
});

export const { setAddress } = addressSlice.actions;

export default addressSlice;
