import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registerUser: (state, action) => {
            state.status = false;
            state.userData = action.payload.userData;
        },
        loginUser: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logoutUser: (state, action) => {
            state.status = false,
            state.userData = null
        }
    }
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;