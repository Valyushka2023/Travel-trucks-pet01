import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './slices/campersSlice';

const store = configureStore({
  reducer: {
    campers: campersReducer,
  },
});

export default store;
