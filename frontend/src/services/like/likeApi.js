import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export const likeApi = createApi({
    reducerPath: 'likeApi',
    baseQuery: baseApi,
    endpoints: (builder) => ({
        toggleVideoLike: builder.mutation({
            query: (videoId) => ({
                url: `/likes/toggle/v/${videoId}`,
                method: 'POST'
            })
        }),
        toggleCommentLike: builder.mutation({
            query: (commentId) => ({
                url: `/likes/toggle/c/${commentId}`,
                method: 'POST'
            })
        }),
        toggleTweetLike: builder.mutation({
            query: (tweetId) => ({
                url: `/likes/toggle/t/${tweetId}`,
                method: 'POST'
            })
        }),
        getLikedVideos: builder.query({
            query: () => '/likes/videos'
        })
    })
})

export const {
    useToggleVideoLikeMutation,
    useToggleCommentLikeMutation,
    useToggleTweetLikeMutation,
    useGetLikedVideosQuery,
} = likeApi;