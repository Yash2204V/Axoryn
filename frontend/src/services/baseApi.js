import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import conf from '../conf/conf.js'

export const baseApi = fetchBaseQuery({
    baseUrl: conf.backendUrl,
    prepareHeaders: (headers, { endpoint }) => {
        const token = localStorage.getItem('token');
        
        const noAuthEndpoints = ['registerUser', 'loginUser', 'refreshAccessToken' ,'getAllVideos', 'getVideoById'];

        if(!noAuthEndpoints.includes(endpoint) && token){
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    }
})