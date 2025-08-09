import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice.js"
import videoReducer from "../features/video/videoSlice.js"

const store = configureStore({
    reducer: {
        user: userReducer,
        video: videoReducer
    }
});

export default store