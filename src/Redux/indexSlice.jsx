import { createSlice } from "@reduxjs/toolkit";


// index store slice.
const index = createSlice({
    name: 'index',
    initialState: {
        index: 0,
    },
    reducers: {
        getIndex: (s, a) => {
            s.index = a.payload;
        }
    }
});

export const { getIndex } = index.actions;
export default index.reducer;
