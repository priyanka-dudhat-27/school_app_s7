// src/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    role: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.userInfo = null; // Clear user info
      state.role = null; // Clear user role
    },
  },
});

// Export the actions
export const { setUser, logout } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
