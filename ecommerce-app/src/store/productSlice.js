import { createSlice } from '@reduxjs/toolkit';
import productData from '../data/products.json';

const initialState = {
  products: productData.products,
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Add any product-related reducers here
  }
});

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectProductById = (state, productId) => 
  state.products.products.find(product => product.id === productId);

export default productSlice.reducer;