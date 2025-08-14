import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export const subscriptionApi = createApi({
    reducerPath: 'subscriptionApi',
    baseQuery: baseApi,
    endpoints: (builder) => ({
        getUserChannelSubscribers: builder.query({
            query: (channelId) => `/subscriptions/c/${channelId}`
        }),
        toggleSubscription: builder.mutation({
            query: (channelId) => ({
                url: `/subscriptions/c/${channelId}`,
                method: 'POST'
            })
        }),
        getSubscribedChannels: builder.query({
            query: (subscriberId) => `/subscriptions/u/${subscriberId}`
        })
    })
})

export const {
    useGetUserChannelSubscribersQuery,
    useToggleSubscriptionMutation,
    useGetSubscribedChannelsQuery
} = subscriptionApi;