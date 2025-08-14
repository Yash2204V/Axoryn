import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: baseApi,
    endpoints: (builder) => ({
        getChannelStats: builder.query({
            query: () => '/dashboard/stats'
        }),
        getChannelVideos: builder.query({
            query: () => '/dashboard/videos'
        })
    })
})

export const {
    useGetChannelStatsQuery,
    useGetChannelVideosQuery
} = dashboardApi;