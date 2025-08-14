import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export const videoApi = createApi({
    reducerPath: 'videoApi',
    baseQuery: baseApi,
    endpoints: (builder) => ({
        getAllVideos: builder.query({
            query: () => '/videos'
        }),
        publishAVideo: builder.mutation({
            query: (formData) => ({
                url: '/videos',
                method: 'POST',
                body: formData
            })
        }),
        getAllUserVideos: builder.query({
            query: () => '/videos/user/videos'
        }),
        getVideoById: builder.query({
            query: (videoId) => `/videos/${videoId}`
        }),
        deleteVideo: builder.mutation({
            query: (videoId) => ({
                url: `/videos/${videoId}`,
                method: 'DELETE'
            })
        }),
        updateVideo: builder.mutation({
            query: ({formData, videoId}) => ({
                url: `/videos/${videoId}`,
                method: 'PATCH',
                body: formData
            })
        }),
        togglePublishStatus: builder.mutation({
            query: (videoId) => ({
                url: `/videos/toggle/publish/${videoId}`,
                method: 'PATCH'
            })
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