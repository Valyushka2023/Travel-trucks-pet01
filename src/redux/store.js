import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campers/slice';

const store = configureStore({
  reducer: {
    campers: campersReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
