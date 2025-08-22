import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export const likeApi = createApi({
    reducerPath: 'likeApi',
    baseQuery: baseApi,
    tagTypes: ['Like', 'Video'],
    endpoints: (builder) => ({
        toggleVideoLike: builder.mutation({
            query: (videoId) => ({
                url: `/likes/toggle/v/${videoId}`,
                method: 'POST'
            }),
            invalidatesTags: (result, error, videoId) => [
                { type: 'Like', id: videoId },
                { type: 'Video', id: videoId }
            ]
        }),
        toggleCommentLike: builder.mutation({
            query: (commentId) => ({
                url: `/likes/toggle/c/${commentId}`,
                method: 'POST'
            }),
            invalidatesTags: (result, error, commentId) => [
                { type: 'Like', id: commentId }
            ]
        }),
        toggleTweetLike: builder.mutation({
            query: (tweetId) => ({
                url: `/likes/toggle/t/${tweetId}`,
                method: 'POST'
            }),
            invalidatesTags: (result, error, tweetId) => [
                { type: 'Like', id: tweetId }
            ]
        }),
        getLikedVideos: builder.query({
            query: () => '/likes/videos',
            providesTags: ['Like']
        })
    })
})

export const {
    useToggleVideoLikeMutation,
    useToggleCommentLikeMutation,
    useToggleTweetLikeMutation,
    useGetLikedVideosQuery,
} = likeApi;