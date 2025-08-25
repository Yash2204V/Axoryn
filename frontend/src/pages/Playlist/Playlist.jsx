import Aside from "../../components/Aside/Aside.jsx"
import { useGetPlaylistByIdQuery } from '../../services/playlist/playlistApi.js';
import { Link, useParams } from 'react-router-dom';
import { formatTimeAgo } from '../../utils/formatTimeAgo.js';
import { formatDuration } from '../../utils/formatDuration.js';
import { formatViews } from '../../utils/formatViews.js';

function Playlist() {
  const { playlistId } = useParams(); 

  const { data: playlistData } = useGetPlaylistByIdQuery(playlistId);
  const playlist = playlistData?.data;

  return (
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Aside />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
          <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
            <div className="w-full shrink-0 sm:max-w-md xl:max-w-sm">
              <div className="relative mb-2 w-full pt-[56%]">
                <div className="absolute inset-0">
                  <img
                    src={playlist?.videos[0]?.thumbnail || "https://wallpaperaccess.com/full/2861682.jpg"}
                    alt={playlist?.name}
                    className="h-full w-full"
                  />
                  <div className="absolute inset-x-0 bottom-0">
                    <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                      <div className="relative z-[1]">
                        <p className="flex justify-between">
                          <span className="inline-block">{playlist?.name}</span>
                          <span className="inline-block">{playlist?.videos?.length}&nbsp;videos</span>
                        </p>
                        <p className="text-sm text-gray-200">
                          {formatTimeAgo(playlist?.createdAt)}&nbsp;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h6 className="mb-1 font-semibold">{playlist?.name}</h6>
              <p className="flex text-sm text-gray-200">
                {playlist?.description || "No description available."}
              </p>
              <Link to={`/channel/${playlist?.owner?.username}`} className="text-sm text-gray-300 hover:underline">
                <div className="mt-6 flex items-center gap-x-3">
                  <div className="h-16 w-16 shrink-0">
                    <img
                      src={playlist?.owner?.avatar}
                      alt={playlist?.owner?.username || "channel-avatar"}
                      className="h-full w-full rounded-full"
                    />
                  </div>
                  <div className="w-full">
                    <h6 className="font-semibold capitalize">{playlist?.owner.fullName}</h6>
                    <p className="text-sm text-gray-300">@{playlist?.owner.username}</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex w-full flex-col gap-y-4">
              {playlist?.videos?.length > 0 ? playlist?.videos?.map((video, idx) => (
                <div key={video._id || idx} className="border">
                  <div className="w-full max-w-3xl gap-x-4 sm:flex">
                    <div className="relative mb-2 w-full sm:mb-0 sm:w-5/12">
                    <Link to={`/player/${video?._id}`}>
                      <div className="w-full pt-[56%]">
                        <div className="absolute inset-0">
                          <img
                            src={video?.thumbnail || "https://wallpaperaccess.com/full/2861682.jpg"}
                            alt={video?.title}
                            className="h-full w-full"
                          />
                        </div>
                        <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                          {formatDuration(video?.duration)}
                        </span>
                      </div>
                    </Link>
                    </div>
                    <div className="flex gap-x-2 px-2 sm:w-7/12 sm:px-0">
                    <Link to={`/player/${video?._id}`}>
                      <div className="h-10 w-10 shrink-0 sm:hidden">
                        <img
                          src={video?.owner?.avatar || "https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                          alt={video?.owner?.username || "channel-avatar"}
                          className="h-full w-full rounded-full"
                        />
                      </div>
                    </Link>
                      <div className="w-full">
                        <h6 className="mb-1 font-semibold sm:max-w-[75%] mt-2">
                          {video?.title}
                        </h6>
                        <p className="flex text-sm text-gray-200 sm:mt-3">
                          {formatViews(video?.views)}&nbsp;Views · {formatTimeAgo(video?.createdAt)}
                        </p>
                        <Link to={`/channel/${video?.owner?.username}`}>
                          <div className="flex items-center gap-x-4">
                            <div className="mt-2 hidden h-10 w-10 shrink-0 sm:block">
                              <img
                                src={video?.owner?.avatar || "https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                alt={video?.owner?.username || "channel-avatar"}
                                className="h-full w-full rounded-full"
                              />
                            </div>
                            <p className="text-sm text-gray-200">@{video?.owner.username}</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-center text-2xl text-gray-400 mt-5">No videos in this playlist yet.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>

  )
}

export default Playlist