import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: baseApi,
    endpoints: (builder) => ({
        getVideoComments: builder.query({
            query: (videoId) => `/comments/${videoId}`
        }),
        addComment: builder.mutation({
            query: ({videoId, body}) => ({
                url: `/comments/${videoId}`,
                method: 'POST',
                body
            })
        }),
        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: `/comments/c/${commentId}`,
                method: 'DELETE'
            })
        }),
        updateComment: builder.mutation({
            query: ({commentId, body}) => ({
                url: `/comments/c/${commentId}`,
                method: 'PATCH',
                body
            })
        })
    })
})

export const {
    useGetVideoCommentsQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useUpdateCommentMutation
} = commentApi;