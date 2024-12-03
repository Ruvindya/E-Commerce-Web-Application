import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

const loadLoggedUserDetail = () => {
  try {
    const userdata = localStorage.getItem('user');
    console.log("user data",userdata)
    return userdata ? JSON.parse(userdata).id : null;
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
    return null;
  }
};

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
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
      try {
        const cartItemId = nanoid();
        const { userId, ...product } = action.payload;

        const newItem = {
          ...product,
          cartItemId,
          userId,
          quantity: 1
        };
        
        state.items.push(newItem);
        state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
        localStorage.setItem('cart', JSON.stringify(state.items));
      } catch(error) {
        console.log("Error in addToCart: ",error)
      }
      
    },
    removeFromCart: (state, action) => {
      try {
        state.items = state.items.filter(item => item.cartItemId !== action.payload);
        state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
        localStorage.setItem('cart', JSON.stringify(state.items));

      } catch(error) {
        console.log("Error in removeFromCart: ",error)
      }
      
    },
    updateQuantity: (state, action) => {
      try {
        const { cartItemId, quantity } = action.payload;
        const item = state.items.find(item => item.cartItemId === cartItemId);
        if (item) {
          item.quantity = Math.max(0, quantity);
        }
        state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
        localStorage.setItem('cart', JSON.stringify(state.items));
      } catch(error) {
        console.log("Error in updateQuantity: ",error)
      }
      
    },
    clearCart: (state, action) => {
      try {
        const { userId } = action.payload;
        state.items = state.items.filter(item => item.userId !== userId);
        localStorage.setItem('cart', JSON.stringify(state.items));
        // state.items = [];
        // localStorage.removeItem('cart');
      } catch(error) {
        console.log("Error in clearCart: ",error)
      }
      
    }
  },
});


export const { addToCart, removeFromCart, updateQuantity, clearCart  } = cartSlice.actions;
export const selectCart = (state) => state.cart.items;
export const selectTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartCount = (state) => state.cart.itemCount;
export default cartSlice.reducer;