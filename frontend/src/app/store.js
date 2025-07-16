import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice.js"

const store = configureStore({
    reducer: {
        fun: userReducer
    }
});

export default store