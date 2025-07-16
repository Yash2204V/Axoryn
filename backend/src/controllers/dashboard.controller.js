import mongoose from "mongoose"
import { Video } from "../models/video.model.js"
import { Subscription } from "../models/subscription.model.js"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

    /* 
    1. Looking to the User, look out to:
        a. videos
        b. subscriptions
        c. likes
    */

    
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel

    const videos = await Video.find({ owner: req.user._id });

    if (!videos) {
        throw new ApiError(400, "Fetching Channel Videos Failed")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, videos, "Fetching Channel Videos Successful")
        )

})

export {
    getChannelStats,
    getChannelVideos
}