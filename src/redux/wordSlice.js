import {
    createSlice
} from "@reduxjs/toolkit";

export const wordSlice = createSlice({
    name: "word",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchDataStart: (state) => {
            state.loading = true;
            state.data = []
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        fetchDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchDataStart,
    fetchDataSuccess,
    fetchDataFailure
} = wordSlice.actions;

export default wordSlice.reducer;