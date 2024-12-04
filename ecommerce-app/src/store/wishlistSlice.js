import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const productExists = state.wishlist.some(product => product.id === action.payload.id);
      if (!productExists) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(product => product.id !== action.payload.id);
    },
  },
});

// Actions
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

// Selectors
export const selectWishlist = (state) => state.wishlist.wishlist;

export default wishlistSlice.reducer;