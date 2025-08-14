import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export const playlistApi = createApi({
    reducerPath: 'playlistApi',
    baseQuery: baseApi,
    endpoints: (builder) => ({
        createPlaylist: builder.mutation({
            query: (body) => ({
                url: `/playlist`,
                method: 'POST',
                body
            })
        }),
        getPlaylistById: builder.query({
            query: (playlistId) => `/playlist/${playlistId}`
        }),
        updatePlaylist: builder.mutation({
            query: ({ playlistId, body }) => ({
                url: `/playlist/${playlistId}`,
                method: 'PATCH',
                body
            })
        }),
        deletePlaylist: builder.mutation({
            query: (playlistId) => ({
                url: `/playlist/${playlistId}`,
                method: 'DELETE'
            })
        }),
        addVideoToPlaylist: builder.mutation({
            query: ({videoId, playlistId}) => ({
                url: `/playlist/add/${videoId}/${playlistId}`,
                method: 'PATCH'
            })
        }),
        removeVideoFromPlaylist: builder.mutation({
            query: ({videoId, playlistId}) => ({
                url: `/playlist/remove/${videoId}/${playlistId}`,
                method: 'PATCH'
            })
        }),
        getUserPlaylists: builder.query({
            query: (userId) => `/playlist/user/${userId}`
        })
    })
})

export const {
    useCreatePlaylistMutation,
    useGetPlaylistByIdQuery,
    useUpdatePlaylistMutation,
    useDeletePlaylistMutation,
    useAddVideoToPlaylistMutation,
    useRemoveVideoFromPlaylistMutation,
    useGetUserPlaylistsQuery
} = playlistApi;