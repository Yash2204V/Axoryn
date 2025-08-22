import { Link } from 'react-router-dom'
import { formatViews } from '../utils/formatViews';
import { formatDuration } from '../utils/formatDuration';
import { formatTimeAgo } from '../utils/formatTimeAgo';
import { useGetAllUserVideosQuery, useGetAllVideosQuery } from '../services/video/videoApi';

function VideoCard({ data, userSpecificVideos=false }) {

const { data: videosData, isLoading, error } = userSpecificVideos ? useGetAllVideosQuery() : useGetAllUserVideosQuery(
      { userId: data },
      { skip: !data }
    );

const videos = videosData?.data?.docs || [];

  return (
    <>
      {videos?.map((video, idx) => (
        <div key={video._id || idx} className="w-full">
          <div className="relative mb-2 w-full pt-[56%]">
            <Link to={`/player/${video._id}`}>
              <div className="absolute inset-0">
                <img
                  src={
                    video.thumbnail ||
                    "https://images.pexels.com/photos/1144276/pexels-photo-1144276.jpeg"
                  }
                  alt={video.title}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            </Link>
            <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
              {formatDuration(video.duration)}
            </span>
          </div>
          <div className="flex gap-x-2">
            <Link
              to={`/channel/${video.channel.username}`}
              className="h-10 w-10 shrink-0"
            >
              <img
                src={
                  video.channel?.avatar ||
                  "https://images.pexels.com/photos/1144277/pexels-photo-1144277.jpeg"
                }
                alt={video.channel.username}
                className="h-full w-full rounded-full object-cover"
              />
            </Link>
            <div className="w-full capitalize">
              <h6 className="mb-1 font-semibold line-clamp-2">
                {video?.title}
              </h6>
              <p className="flex text-sm text-gray-200">
                {formatViews(video.views)}&nbsp;Views ·{" "}
                {formatTimeAgo(video.createdAt)}
              </p>
              <p className="text-sm text-gray-200 lowercase">
                @{video.channel.username}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default VideoCard;
