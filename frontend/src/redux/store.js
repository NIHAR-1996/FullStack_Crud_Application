import { configureStore } from "@reduxjs/toolkit";
import ApiSlice from "./ApiSlice";

export const store = configureStore({
  reducer: {
    Api: ApiSlice,
  },
});
