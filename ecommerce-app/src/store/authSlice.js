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
      try {
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
  
        // state.user = action.payload;
        // state.loginError = null;
        state.user = user;
        state.loginError = null;
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Error getting data for Login', error);
        return [];
      }
     
    },
    logout: (state) => {
      try {
        state.user = null;
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Error removing user from local storage for Logout', error);
        return [];
      }
     
    },
    signup: (state, action) => {
      try {
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
      } catch (error) {
        console.error('Error in Signup', error);
        return [];
      }
      
      
    },
    closeEmailExistsModal: (state) => {
      try {
        state.showEmailExistsModal = false;
        state.emailCheckError = null;
      } catch (error) {
        console.error('Error in closing email exist modal', error);
        return [];
      }
      
    },
    clearLoginError: (state) => {
      try {
        state.loginError = null;
      } catch (error) {
        console.error('Error in clear login', error);
        return [];
      }
      
    },
  },
});

export const { login, logout, signup, closeEmailExistsModal, clearLoginError } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectShowEmailExistsModal = (state) => state.auth.showEmailExistsModal;
export const selectEmailCheckError = (state) => state.auth.emailCheckError;
export const selectLoginError = (state) => state.auth.loginError;

export default authSlice.reducer;