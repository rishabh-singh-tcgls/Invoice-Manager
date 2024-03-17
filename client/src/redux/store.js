import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./invoiceFormSlice";

const store = configureStore({
  reducer: {
    formData: formSlice,
  },
});

export default store;
