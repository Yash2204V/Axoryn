import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js"

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query = "", sortBy = "createdAt", sortType = "desc" } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const sortDirection = sortType === "asc" ? 1 : -1;

    const matchStage = query
        ? { title: { $regex: query, $options: "i" } }
        : {};

    const sortStage = {
        [sortBy]: sortDirection,
    };

    const aggregatePipeline = [
        { $match: matchStage },
        { $sort: sortStage },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "channel"
            }
        },
        {
            $unwind: "$channel",
        },
        {
            $project: {
                _id: 1,
                thumbnail: 1,
                title: 1,
                duration: 1,
                views: 1,
                "channel._id": 1,
                "channel.username": 1,
                "channel.avatar": 1,
                createdAt: 1,
                updatedAt: 1
            }
        }
    ];

    const options = {
        page: pageNumber,
        limit: limitNumber,
    };

    const aggregate = Video.aggregate(aggregatePipeline);

    Video.aggregatePaginate(aggregate, options, (err, result) => {
        if (err) {
            throw new ApiError(400, err.message || "Failed to fetch videos");
        } else {
            return res.status(200).json(
                new ApiResponse(200, result, "All Videos Fetched Successfully.")
            );
        }
    });
});

const getAllUserVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy = "createdAt", sortType = "desc", userId } = req.query;

    //TODO: get all videos based on query, sort, pagination
    if(isValidObjectId(userId)){
        throw new ApiError(400, "Invalid Id")
    }

    const options = {
        page,
        limit
    }

    const myAggregateUsers = User.aggregate([
    
        {
            $match: {
                _id: new mongoose.Types.ObjectId(userId),
            },
        },
        {
            $lookup: {
                from: "videos",
                localField: "_id",
                foreignField: "owner",
                as: "videos",
            },
        },
        {
            $unwind: "$videos",
        },
        {
            $match: {
                ...(query && { "videos.title": { $regex: query, $options: "i" } }),
            },
        },
        {
            $sort: {
                [`videos.${sortBy}`]: sortType === "asc" ? 1 : -1,
            },
        },
        {
            $skip: (pageNumber - 1) * limitNumber,
        },
        {
            $limit: limitNumber,
        },
        {
            $group: {
                _id: "$_id",
                videos: { $push: "$videos" },
            },
        },
    ]);

    User.aggregatePaginate(myAggregateUsers, options, function (err, result) {
        if (err) {
            throw new ApiError(400, err)
        } else {
            return res
                .status(200)
                .json(new ApiResponse(200,  result, "All User Videos"))
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
    getAllUserVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
