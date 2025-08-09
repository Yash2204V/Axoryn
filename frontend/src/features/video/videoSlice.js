import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videos: [],
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        totalPages: 0,
        totalDocs: 0,
        hasNextPage: false,
        hasPrevPage: false
    }
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setVideos: (state, action) => {
            state.videos = action.payload.docs || [];
            state.pagination = {
                page: action.payload.page || 1,
                limit: action.payload.limit || 10,
                totalPages: action.payload.totalPages || 0,
                totalDocs: action.payload.totalDocs || 0,
                hasNextPage: action.payload.hasNextPage || false,
                hasPrevPage: action.payload.hasPrevPage || false
            };
            state.loading = false;
            state.error = null;
        },
        clearVideos: (state) => {
            state.videos = [];
            state.pagination = initialState.pagination;
        }
    }
});

export const { setLoading, setError, setVideos, clearVideos } = videoSlice.actions;

export default videoSlice.reducer;
