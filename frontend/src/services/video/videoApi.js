import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export const videoApi = createApi({
    reducerPath: 'videoApi',
    baseQuery: baseApi,
    tagTypes: ['Video'],
    endpoints: (builder) => ({
        getAllVideos: builder.query({
            query: () => '/videos',
            providesTags: ['Video']
        }),
        publishAVideo: builder.mutation({
            query: (formData) => ({
                url: '/videos',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Video']
        }),
        getAllUserVideos: builder.query({
            query: ({ userId, page = 1, limit = 10, sortBy = "createdAt", sortType = "desc" }) => 
                `/videos/user/videos?userId=${userId}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortType=${sortType}`,
            providesTags: ['Video'],
        }),
        getVideoById: builder.query({
            query: (videoId) => `/videos/${videoId}`,
            providesTags: (result, error, videoId) => [
                { type: 'Video', id: videoId }
            ]
        }),
        deleteVideo: builder.mutation({
            query: (videoId) => ({
                url: `/videos/${videoId}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, videoId) => [
                { type: 'Video', id: videoId },
                'Video'
            ]
        }),
        updateVideo: builder.mutation({
            query: ({formData, videoId}) => ({
                url: `/videos/${videoId}`,
                method: 'PATCH',
                body: formData
            }),
            invalidatesTags: (result, error, {videoId}) => [
                { type: 'Video', id: videoId },
                'Video'
            ]
        }),
        togglePublishStatus: builder.mutation({
            query: (videoId) => ({
                url: `/videos/toggle/publish/${videoId}`,
                method: 'PATCH'
            }),
            invalidatesTags: (result, error, videoId) => [
                { type: 'Video', id: videoId },
                'Video'
            ]
        })

    })
})

export const { 
    useGetAllVideosQuery, 
    usePublishAVideoMutation, 
    useGetAllUserVideosQuery, 
    useGetVideoByIdQuery, 
    useDeleteVideoMutation, 
    useUpdateVideoMutation, 
    useTogglePublishStatusMutation
} = videoApi;