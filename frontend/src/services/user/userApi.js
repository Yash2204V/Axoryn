import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseApi,
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (formData) => ({
                url: '/users/register',
                method: 'POST',
                body: formData
            })
        }),
        loginUser: builder.mutation({
            query: (body) => ({
                url: '/users/login',
                method: 'POST',
                body
            })
        }),
        refreshAccessToken: builder.mutation({
            query: (body) => ({
                url: '/users/refresh-token',
                method: 'POST',
                ...(body ? { body } : {})
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'POST'
            })
        }),
        changeCurrentPassword: builder.mutation({
            query: (body) => ({
                url: '/users/change-password',
                method: 'POST',
                body
            })
        }),
        getCurrentUser: builder.query({
            query: () => '/users/current-user'
        }),
        updateAccountDetails: builder.mutation({
            query: (body) => ({
                url: '/users/update-account',
                method: 'PATCH',
                body
            })
        }),
        updateUserAvatar: builder.mutation({
            query: (formData) => ({
                url: '/users/avatar',
                method: 'PATCH',
                body: formData
            })
        }),
        updateUserCoverImage: builder.mutation({
            query: (formData) => ({
                url: '/users/cover-image',
                method: 'PATCH',
                body: formData
            })
        }),
        getUserChannelProfile: builder.query({
            query: (username) => `/users/c/${username}`
        }),
        getWatchHistory: builder.query({
            query: () => '/users/history'
        })
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useRefreshAccessTokenMutation,
    useLogoutUserMutation,
    useChangeCurrentPasswordMutation,
    useGetCurrentUserQuery,
    useUpdateAccountDetailsMutation,
    useUpdateUserAvatarMutation,
    useUpdateUserCoverImageMutation,
    useGetUserChannelProfileQuery,
    useGetWatchHistoryQuery
} = userApi;