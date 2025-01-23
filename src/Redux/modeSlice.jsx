import { createSlice } from "@reduxjs/toolkit";


// mode store slice.
const mode = createSlice({
    name: 'mode',
    initialState: {
        mode: false,
    },
    reducers: {
        getMode: (s, a) => {
            s.mode = a.payload;
        }
    }
});

export const { getMode } = mode.actions;
export default mode.reducer;
