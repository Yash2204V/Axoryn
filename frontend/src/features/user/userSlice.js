import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        registerSuccess: (state) => {
            state.loading = false;
            state.error = null;
            // Don't login user after registration
        },
        loginUser: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            state.loading = false;
            state.error = null;
        },
        logoutUser: (state) => {
            state.status = false;
            state.userData = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('token');
        },
        checkAuthStatus: (state) => {
            const token = localStorage.getItem('token');
            if (token) {
                // If token exists, we'll assume user is logged in
                // You might want to verify the token with the backend later
                state.status = true;
            } else {
                state.status = false;
                state.userData = null;
            }
        }
    }
});

export const { setLoading, setError, registerSuccess, loginUser, logoutUser, checkAuthStatus } = userSlice.actions;

export default userSlice.reducer;