import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  showEmailExistsModal: false,
  emailCheckError: null,
  loginError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => 
        user.email === action.payload.email && 
        user.password === action.payload.password
      );

      if (!user) {
        state.loginError = 'Invalid email or password';
        state.user = null;
        return;
      }

      state.user = action.payload;
      state.loginError = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    signup: (state, action) => {
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

      console.group('User Login Details');
      console.log('User ID:', action.payload.id);
      console.log('Email:', action.payload.email);
      console.log('Created At:', action.payload.createdAt);
      console.log('Full User Object:', action.payload);
      console.groupEnd();
      
    },
    closeEmailExistsModal: (state) => {
      state.showEmailExistsModal = false;
      state.emailCheckError = null;
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
  },
});

export const { login, logout, signup, closeEmailExistsModal, clearLoginError } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectShowEmailExistsModal = (state) => state.auth.showEmailExistsModal;
export const selectEmailCheckError = (state) => state.auth.emailCheckError;
export const selectLoginError = (state) => state.auth.loginError;

export default authSlice.reducer;