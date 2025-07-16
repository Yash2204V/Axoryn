See what's easy and you can cooperate in there.
Seek help from previous codebase.

2. User -> all done✨
3. Tweet -> all done✨
5. Playlist -> all done✨
7. HealthCheck -> all done✨
9. Comment -> all done✨
6. Like -> all done✨
4. Subscription -> all done✨

1. Video -> (1 controller left)
8. Dashboard -> (1 controller left)

https://github.com/Umeshchaurasiya123/BackendProject/
https://devuiv2.vercel.app/templates/youtube
https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj

    const stats = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "_id",
                foreignField: "owner",
                as: "allVideos"
            }
        },
        {
            $unwind: {
                path: "$allVideos",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "allVideos._id",
                foreignField: "video",
                as: "videoLikes"
            }
        },
        {
            $group: {
                _id: "$_id",
                username: { $first: "$username" },
                allVideos: { $push: "$allVideos" },
                totalVideos: { $sum: 1 },
                totalLikes: { $sum: { $size: "$videoLikes" } }
            }
        }
    ]);
    console.log(stats);
    