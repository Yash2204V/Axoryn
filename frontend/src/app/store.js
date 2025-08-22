import { configureStore } from "@reduxjs/toolkit";
import { videoApi } from "../services/video/videoApi";
import { playlistApi } from "../services/playlist/playlistApi";
import { commentApi } from "../services/comment/commentApi";
import { likeApi } from "../services/like/likeApi";
import { dashboardApi } from "../services/dashboard/dashboardApi.js";
import { userApi } from "../services/user/userApi.js";

const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [videoApi.reducerPath]: videoApi.reducer,
        [playlistApi.reducerPath]: playlistApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        [likeApi.reducerPath]: likeApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userApi.middleware,
            videoApi.middleware,
            playlistApi.middleware,
            commentApi.middleware,
            likeApi.middleware,
            dashboardApi.middleware
        ),
});

export default store;