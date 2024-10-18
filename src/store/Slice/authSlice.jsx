import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload; // Save user data to the store
    },
    logout: (state) => {
      state.user = null; // Clear user data on logout
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
