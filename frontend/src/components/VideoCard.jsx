import { memo } from 'react';
import { Link } from 'react-router-dom'
import { formatViews } from '../utils/formatViews';
import { formatDuration } from '../utils/formatDuration';
import { formatTimeAgo } from '../utils/formatTimeAgo';
import { useGetAllUserVideosQuery, useGetAllVideosQuery } from '../services/video/videoApi';

const VideoCard = memo(({ data, userSpecificVideos=true }) => {

  const { data: allVideos, error: allError, isLoading: allLoading } = useGetAllVideosQuery();
  const { data: userVideos, error: userError, isLoading: userLoading } = useGetAllUserVideosQuery(
    { userId: data },
    { skip: !data }
  );

  const videosData = userSpecificVideos ? userVideos : allVideos;
  const videos = videosData?.data?.docs || [];

  const isLoading = userSpecificVideos ? userLoading : allLoading;
  const error = userSpecificVideos ? userError : allError;

  return (
    <>
      {!isLoading && !error && videos?.length > 0 ? videos?.map((video, idx) => (
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
      )) : (
        <div className="flex justify-center p-4">
          <div className="w-full max-w-sm text-center">
            <p className="mb-3 w-full">
              <span className="inline-flex rounded-full bg-[#9ef9ff] p-2 text-[#08e6f5]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
              </span>
            </p>
            <h5 className="mb-2 font-semibold">No videos uploaded</h5>
            <p>This page has yet to upload a video. Search another page in order to find more videos.</p>
            <button className="mt-4 inline-flex items-center gap-x-2 bg-[#08e6f5] px-3 py-2 font-semibold text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New video
            </button>
          </div>
        </div>
      )}
    </>
  );
})

export default VideoCard;
