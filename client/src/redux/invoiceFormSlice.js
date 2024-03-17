import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localHost:8080/api",
});

export const fetchProductMaster = createAsyncThunk(
  "productMaster/fetchProductMaster",
  async () => {
    try {
      const response = await api.get("/productMaster/fetchProductMaster");
      return response.data;
    } catch (error) {
      console.log("Failed to fetch products");
    }
  }
);

export const createInvoice = createAsyncThunk(
  "productMaster/createInvoice",
  async (payload) => {
    try {
      const response = await api.post("/invoiceDetail/createInvoice", payload);
      return response.data;
    } catch (error) {
      console.log("Failed to create Invoice");
    }
  }
);

const formSlice = createSlice({
  name: "productMaster",
  initialState: {
    productMaster: [],
    status: "idle",
    error: "",
    isLoading: false,
    createInvoiceMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductMaster.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchProductMaster.fulfilled, (state, action) => {
        state.status = false;
        state.productMaster = action.payload.data;
      })
      .addCase(fetchProductMaster.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createInvoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createInvoiceMessage = action.payload;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default formSlice.reducer;
