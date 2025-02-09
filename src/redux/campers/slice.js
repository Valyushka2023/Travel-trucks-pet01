import { createSlice } from '@reduxjs/toolkit';
import { getCampers } from './operations';

const campersSlice = createSlice({
    name: 'campers',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
 extraReducers: (builder) => {
    builder
        .addCase(getCampers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCampers.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(getCampers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
},
});


export const campersActions = campersSlice.actions;


export default campersSlice.reducer;