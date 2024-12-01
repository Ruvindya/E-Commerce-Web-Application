import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  showEmailExistsModal: false,
  emailCheckError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    signup: (state, action) => {
      // state.user = action.payload;
      // localStorage.setItem('user', JSON.stringify(action.payload));
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const emailExists = users.some(user => user.email === action.payload.email);
      
      if (emailExists) {
        state.showEmailExistsModal = true;
        state.emailCheckError = 'Email already exists';
        return;
      }
      if (!emailExists){
        state.user = action.payload;
        users.push(action.payload);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('user', JSON.stringify(action.payload));
        
        state.showEmailExistsModal = false;
        state.emailCheckError = null;
      }
      
    },
    closeEmailExistsModal: (state) => {
      state.showEmailExistsModal = false;
      state.emailCheckError = null;
    },
  },
});

export const { login, logout, signup, closeEmailExistsModal } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectShowEmailExistsModal = (state) => state.auth.showEmailExistsModal;
export const selectEmailCheckError = (state) => state.auth.emailCheckError;
export default authSlice.reducer;