


import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCampers = createAsyncThunk('campers/getCampers', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/campers'); // Запит на масив кемперів
        const campersData = response.data;
        console.log("Data from API via proxy (operations):", campersData); // Лог отриманих даних

        if (Array.isArray(campersData)) {
            return campersData; // Повертаємо безпосередньо масив кемперів
        } else {
            console.error("Error: API did not return an array of campers", campersData);
            return rejectWithValue('Incorrect data format from API');
        }
    } catch (error) {
        console.error("Error fetching campers (operations):", error);
        return rejectWithValue(error.message);
    }
});

