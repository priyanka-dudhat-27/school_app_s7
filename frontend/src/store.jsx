import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import courseReducer from './features/courseSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    courses: courseReducer,
  },
});

export default store;
