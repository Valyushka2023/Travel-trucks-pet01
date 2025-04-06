import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCampers = createAsyncThunk('campers/getCampers', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers');
        const campersData = response.data;
        console.log("Data from API:", campersData);

        if (Array.isArray(campersData)) {
            return campersData;
        } else if (typeof campersData === 'object' && campersData !== null && Array.isArray(campersData.items)) {
            return campersData.items;
        } else {
            return rejectWithValue('Incorrect data format from API');
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

