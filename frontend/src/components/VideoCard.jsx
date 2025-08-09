import React from 'react'
import { Link } from 'react-router-dom'

function VideoCard({ video }) {

  // Format duration from seconds to MM:SS format
  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Format views count
  const formatViews = (views) => {
    if (!views) return "0";
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} months ago`;
  };

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
        <Link to={`/channel/${video.channel._id}`} className="h-10 w-10 shrink-0">
          <img
            src={video.channel?.avatar || "https://images.pexels.com/photos/1144277/pexels-photo-1144277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
            alt={video.channel.username}
            className="h-full w-full rounded-full object-cover"
          />
        </Link>
        <div className="w-full captalize">
          <h6 className="mb-1 font-semibold line-clamp-2">
            {video.title}
          </h6>
          <p className="flex text-sm text-gray-200">
            {formatViews(video.views)}&nbsp;Views · {formatTimeAgo(video.createdAt)}
          </p>
          <p className="text-sm text-gray-200">{video.channel.username}</p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
