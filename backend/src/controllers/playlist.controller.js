import mongoose, { isValidObjectId } from "mongoose"
import { Playlist } from "../models/playlist.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body

    //TODO: create playlist
    /* 
        1. Check for the presence of name & description.
        2. Create the playlist and add up the name & description.
        3. Check for the userId from middleware.
        4. + Add the ObjectId of the User using the middleware req.user.
        4. Then, send the response.
    */
    if (!name || !description) {
        throw new ApiError(400, "Name or Description not found.")
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id
    })

    if (!playlist) {
        throw new ApiError(400, "Playlist Creation Failed")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, playlist, "Playlist Created Successfully")
        )
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params
    //TODO: get user playlists

    if (!userId) {
        throw new ApiError(400, "Invalid UserId");
    }
    const userPlaylists = await Playlist.find({ owner: userId });

    if (!userPlaylists) {
        throw new ApiError(400, "Playlists not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, userPlaylists, "User Playlists Fetched Successfully")
        )

})

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    //TODO: get playlist by id
    if (!playlistId) {
        throw new ApiError(400, "Invalid Playlist Id");
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(400, "Playlist not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, playlist, "Playlist Fetched Successfully")
        )
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params

    if (!playlistId || !videoId) {
        throw new ApiError(400, "Invalid Playlist ID or Video ID");
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $addToSet: { // if uses $push: it includes the same videoId again.
                videos: videoId
            }
        },
        { new: true }
    )

    if (!playlist) {
        throw new ApiError(400, "Adding Video Failed")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, playlist, "Video added to playlist.")
        )

})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params
    // TODO: remove video from playlist
    const video = await Video.findById(videoId);

    if (!playlistId || !video) {
        throw new ApiError(400, "Invalid Playlist ID or Video ID");
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull: {
                videos: videoId
            }
        },
        { new: true }
    )

    if (!playlist) {
        throw new ApiError(400, "Removing Video Failed")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, playlist, "Video removed from playlist.")
        )

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    // TODO: delete playlist

    if (!playlistId) {
        throw new ApiError(400, "Invalid PlaylistId")
    }
    const playlist = await Playlist.findByIdAndDelete(playlistId);

    if (!playlist) {
        throw new ApiError(400, "Removing Playlist Failed")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, playlist, "Playlist removed successfully")
        )
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;
    //TODO: update playlist

    if (!playlistId) {
        throw new ApiError(400, "Invalid PlaylistId")
    }

    if (!name || !description) {
        throw new ApiError(400, "Name or Description not found.")
    }

    const playlist = await Playlist.findOneAndUpdate(
        new mongoose.Types.ObjectId(playlistId),
        {
            $set: {
                name,
                description
            }
        },
        { new: true }
    );

    if (!playlist) {
        throw new ApiError(400, "Updating Playlist Failed")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, playlist, "Playlist updated successfully")
        )


})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
