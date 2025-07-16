import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js"

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    /* 
        1. Extract all videos from the Video Schema through the User Id searching.
        2. Apply the MongoDB Aggregation & get the:
            a. all videos
        3. send the response
    */
    const options = {
        page,
        limit
    }
    // const videos = await Video.find();
    // console.log(videos);

    const myAggregateVideos = Video.aggregate();

    Video.aggregatePaginate(myAggregateVideos, options, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);

        }
    })


})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    // TODO: get video, upload to cloudinary, create video

    /* 
        1. get the thumbnail and videofile name from multer.
        2. then, take the filePath and send it to cloudinary.
        3. extract the duration from the cloudinary output. 
        4. take the userId as owner.
        5. ignore for now: duration, views, isPublished.
        6. extract the duration from the cloudinary output.
        7. save all videoFile, thumbnail, owner, title, description.
    */

    if (!(title || description)) {
        throw new ApiError(400, "Title or Description is invalid")
    }

    const videoLocalPath = req.files?.videoFile[0]?.path;
    if (!videoLocalPath) {
        throw new ApiError(400, "Video path is required")
    }

    let thumbnailLocalPath;
    if (req.files && Array.isArray(req.files.thumbnail) && req.files.thumbnail.length > 0) {
        thumbnailLocalPath = req.files?.thumbnail[0]?.path;
    }

    const videoFile = await uploadOnCloudinary(videoLocalPath);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!(videoFile || thumbnail)) {
        throw new ApiError("Error while uploading file on cloudinary")
    }

    const video = await Video.create({
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        owner: req.user._id,
        title,
        description,
        duration: videoFile.duration
    })
    await video.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, video, "Video published successfully")
        )

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    //TODO: get video by id
    if (!(videoId)) {
        throw new ApiError(400, "Video Id is invalid");
    }

    const video = await Video.findByIdAndUpdate(
        videoId,
        { 
            $inc: { views: 1 }
        },
        { new: true }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, video, "Video Details Fetched Successfully")
        )
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail
    if (!videoId) {
        throw new ApiError(400, "Video Id is invalid")
    }

    const { title, description } = req.body;

    if (!(title || description)) {
        throw new ApiError(400, "Title or Description is invalid")
    }

    const thumbnailLocalPath = req.file?.path;
    const oldVideo = await Video.findById(videoId);
    const response = await deleteOnCloudinary(oldVideo);

    if (!response) {
        throw new ApiError(400, "Video deletion failed on cloudinary")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                title,
                description,
                thumbnail: thumbnail.url
            }
        },
        { new: true }

    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, video, "Video updated successfully")
        )
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    //TODO: delete video

    if (!videoId) {
        throw new ApiError(400, "Video Id is invalid")
    }

    const video = await Video.findByIdAndDelete(videoId);

    return res
        .status(200)
        .json(
            new ApiResponse(200, video, "Video is deleted successfully")
        )
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!videoId) {
        throw new ApiError(400, "Video Id is invalid")
    }
    const video = await Video.findById(videoId);

    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                isPublished: !(video.isPublished)
            }
        },
        { new: true }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedVideo, "Publish status toggled successfully")
        );

})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
