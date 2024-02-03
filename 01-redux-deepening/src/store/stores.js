import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uislice";
import cartSlice from "./cartSlice";

const stores = configureStore( {
  reducer: {
   ui: uiSlice.reducer,
   cart: cartSlice.reducer
  }
})

export default stores;