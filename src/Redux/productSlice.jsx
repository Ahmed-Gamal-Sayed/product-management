import { createSlice } from "@reduxjs/toolkit";

const product = createSlice({
  name: "product",
  initialState: {
    product: JSON.parse(localStorage.getItem("product")) || [],
  },
  reducers: {
    // Add a new product
    addProduct: (state, action) => {
      state.product.push(action.payload); // Add new product to the array
      localStorage.setItem("product", JSON.stringify(state.product)); // Update localStorage
    },
    // Update an existing product
    updateProduct: (state, action) => {
      const { index, updatedProduct } = action.payload;
      state.product[index] = updatedProduct;
      localStorage.setItem("product", JSON.stringify(state.product));
    },
    // Delete a product by index
    deleteProduct: (state, action) => {
      const updatedStore = state.product.filter((_, index) => index !== action.payload); // Filter out the product
      state.product = updatedStore; // Update state
      localStorage.setItem("product", JSON.stringify(state.product)); // Update localStorage
    },
    // Delete all products
    deleteAllProduct: (state) => {
      state.product = []; // Reset state
      localStorage.removeItem("product"); // Clear localStorage
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, deleteAllProduct } = product.actions;
export default product.reducer;
