


import { createSlice } from '@reduxjs/toolkit';
import { getCampers } from './operations';

const campersSlice = createSlice({
    name: 'campers',
    initialState: {
        items: [],
        loading: false,
        error: null,
        currentCamper: null, // Додаємо currentCamper
    },
    reducers: {
        setCamper: (state, action) => {
            state.currentCamper = action.payload; // Додаємо редюсер setCamper
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCampers.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log("Fetching campers..."); // Лог початку завантаження
            })
            .addCase(getCampers.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                console.log("Campers fetched successfully (slice):", action.payload); // Лог успішного отримання та оновлення стану
            })
            .addCase(getCampers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error("Error fetching campers (slice):", action.payload); // Лог помилки оновлення стану
            });
    },
});

export const { setCamper } = campersSlice.actions; // Експортуємо setCamper
export const selectCampers = (state) => state.campers.items;
export const selectCurrentCamper = (state) => state.campers.currentCamper; // Додаємо селектор для currentCamper

export default campersSlice.reducer;