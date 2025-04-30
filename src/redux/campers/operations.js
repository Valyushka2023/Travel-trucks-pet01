import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCampers = createAsyncThunk(
  'campers/getCampers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/campers'); // Запит на масив кемперів
      const campersData = response.data;

      if (Array.isArray(campersData)) {
        return campersData; // Повертаємо безпосередньо масив кемперів
      } else {
        return rejectWithValue('Incorrect data format from API');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
