import { createSlice } from '@reduxjs/toolkit';


const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    const allCartItems = savedCart ? JSON.parse(savedCart) : [];
    return userId ? allCartItems.filter(item => item.userId === userId) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};


const initialState = {
  items: loadCartFromStorage(),
  itemCount: loadCartFromStorage().reduce((total, item) => total + item.quantity, 0),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = Math.max(0, quantity);
      }
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    }
  },
});


export const { addToCart, removeFromCart, updateQuantity, clearCart  } = cartSlice.actions;
export const selectCart = (state) => state.cart.items;
export const selectTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartCount = (state) => state.cart.itemCount;
export default cartSlice.reducer;