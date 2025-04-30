import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campers/slice';
// import authReducer from "./auth/slice";
// import contactsReducer from "./contacts/slice";
// import filtersReducer from "./filters/slice";

const store = configureStore({
  reducer: {
    campers: campersReducer,
    // auth: authReducer,
    // contacts: contactsReducer,
    // filters: filtersReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
