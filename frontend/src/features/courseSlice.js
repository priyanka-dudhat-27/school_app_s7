import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'courses',
  initialState: [],
  reducers: {
    setCourses: (state, action) => {
      return action.payload;
    },
    addCourse: (state, action) => {
      state.push(action.payload);
    },
    updateCourse: (state, action) => {
      const index = state.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteCourse: (state, action) => {
      return state.filter(course => course.id !== action.payload);
    },
  },
});

export const { setCourses, addCourse, updateCourse, deleteCourse } = courseSlice.actions;
export default courseSlice.reducer;
