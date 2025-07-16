import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // all methods
        func: (state, actions) => {

        }
    }
});

export const { func } = userSlice.actions;

export default userSlice.reducer;