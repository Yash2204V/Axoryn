import { Link } from 'react-router-dom'
import { formatViews } from '../utils/formatViews';
import { formatDuration } from '../utils/formatDuration';
import { formatTimeAgo } from '../utils/formatTimeAgo';

function VideoCard({ video }) {

  return (
    <div className="w-full">
      <div className="relative mb-2 w-full pt-[56%]">
        <Link to={`/player/${video._id}`}>
          <div className="absolute inset-0">
            <img
              src={video.thumbnail || "https://images.pexels.com/photos/1144276/pexels-photo-1144276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
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
        <Link to={`/channel/${video.channel.username}`} className="h-10 w-10 shrink-0">
          <img
            src={video.channel?.avatar || "https://images.pexels.com/photos/1144277/pexels-photo-1144277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
            alt={video.channel.username}
            className="h-full w-full rounded-full object-cover"
          />
        </Link>
        <div className="w-full captalize">
          <h6 className="mb-1 font-semibold line-clamp-2">
            {video?.title}
          </h6>
          <p className="flex text-sm text-gray-200">
            {formatViews(video.views)}&nbsp;Views · {formatTimeAgo(video.createdAt)}
          </p>
          <p className="text-sm text-gray-200">@{video.channel.username}</p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
