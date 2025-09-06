// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const getCampers = createAsyncThunk(
//   'campers/getCampers',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('/campers'); // Запит на масив кемперів
//       const campersData = response.data;

//       if (Array.isArray(campersData)) {
//         return campersData; // Повертаємо безпосередньо масив кемперів
//       } else {
//         return rejectWithValue('Incorrect data format from API');
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Імпортуємо змінну оточення
const BACKEND_BASE_URL = import.meta.env.VITE_API_URL;

export const getCampers = createAsyncThunk(
  'campers/getCampers',
  async (_, { rejectWithValue }) => {
    try {
      // Використовуємо повний шлях до API
      const response = await axios.get(`${BACKEND_BASE_URL}/campers`);
      const campersData = response.data;

      if (Array.isArray(campersData)) {
        return campersData;
      } else {
        return rejectWithValue('Incorrect data format from API');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
