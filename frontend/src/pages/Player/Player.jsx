import { Link, useParams } from 'react-router-dom'
import { useGetVideoByIdQuery } from '../../services/video/videoApi'
import { Aside, CommentsCard, SavePlaylist, VideoCard } from '../../components';
import { formatViews } from '../../utils/formatViews';
import { formatTimeAgo } from '../../utils/formatTimeAgo';
import { useToggleVideoLikeMutation } from '../../services/like/likeApi';
import { useToggleSubscriptionMutation } from '../../services/subscription/subscriptionApi';
import toast from 'react-hot-toast';

function Player() {

  const { videoId } = useParams();
  const { data, error, isLoading, refetch } = useGetVideoByIdQuery(videoId);
  const video = data?.data?.[0];

  const [toggleVideoLike, { isLoading: isLiking }] = useToggleVideoLikeMutation();
  const [toggleSubscription] = useToggleSubscriptionMutation();

  const handleLike = async () => {
    try {
      await toggleVideoLike(videoId).unwrap();
      refetch();
    } catch (error) {
      toast.error(`Failed to toggle like! ${error?.message || ""}`);
    }
  };

  const handleSubscribe = async () => {
    try {
      await toggleSubscription(video.channel?._id).unwrap();
      refetch();
    } catch (error) {
      toast.error("You can't subscribe your own channel");
      console.error(error)
    }
  };

  return (
    <>
      <div>
        <video preload="auto" controls className='hidden'>
          <source src={video?.videoFile} type="video/mp4" />
        </video>
      </div>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Aside />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
            {isLoading && (
              <div className="flex h-full items-center justify-center p-8">
                <div className="w-full max-w-sm text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#08e6f5] mx-auto mb-4"></div>
                  <h5 className="mb-2 font-semibold">Loading video...</h5>
                  <p>Please wait while we load the video for you.</p>
                </div>
              </div>
            )}

            {error && !isLoading && (
              <div className="flex h-full items-center justify-center p-8">
                <div className="w-full max-w-sm text-center">
                  <p className="mb-3 w-full">
                    <span className="inline-flex rounded-full bg-red-100 p-2 text-red-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </span>
                  </p>
                  <h5 className="mb-2 font-semibold">You have to Login</h5>
                  <p className="mb-4">{error?.data?.message || error?.message || 'Failed to load video'}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="rounded bg-[#08e6f5] px-4 py-2 text-white hover:bg-[#9c67ff] transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {!isLoading && !error && video && (
              <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
                <div className="col-span-12 w-full">
                  <div className="relative mb-4 w-full pt-[56%]">
                    <div className="absolute inset-0">
                      <video
                        className="h-full w-full"
                        controls
                        autoPlay
                        muted
                        preload="auto"
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture >
                        <source src={video?.videoFile} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                  <div
                    className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex flex-wrap gap-y-2">
                      <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                        <h1 className="text-lg font-bold">{video?.title}</h1>
                        <p className="flex text-sm text-gray-200">
                          {formatViews(video.views)}&nbsp;Views · {formatTimeAgo(video.createdAt)}
                        </p>
                      </div>
                      <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                        <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                          <div className="flex overflow-hidden rounded-lg border">
                            <button onClick={handleLike}
                              disabled={isLiking}
                              className="group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <span className="inline-block w-5 group-focus/btn:text-[#08e6f5]">
                                {isLiking ? (
                                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                      fill="none"
                                    />
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                    />
                                  </svg>
                                )}
                              </span>
                              {video?.likesCount || 0}
                            </button>
                          </div>
                          <div className="relative block">
                            <button className="peer flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black">
                              <span className="inline-block w-5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                                  />
                                </svg>
                              </span>
                              Save
                            </button>
                            <SavePlaylist videoId={videoId} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-x-4">
                        <Link to={`/channel/${video.channel.username}`} className="mt-2 h-12 w-12 shrink-0">
                          <img
                            src={video.channel?.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                            alt="reactpatterns"
                            className="h-full w-full rounded-full"
                          />
                        </Link>
                        <div className="block">
                          <p className="text-gray-200">{video.channel.fullName}</p>
                          <p className="text-sm text-gray-400">{video.channel.subscribersCount ? video.channel.subscribersCount : 0} Subscribers</p>
                        </div>
                      </div>
                      <div className="block">
                        <button onClick={handleSubscribe} className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#08e6f5] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                          <span className="inline-block w-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                              />
                            </svg>
                          </span>
                          {video.channel?.isSubscribed ? (<span className="group-focus/btn">Subscribed</span>) : (<span className="group-focus/btn">Subscribe</span>)}
                        </button>
                      </div>
                    </div>
                    <hr className="my-4 border-white" />
                    <div className="h-5 overflow-hidden group-focus:h-auto">
                      <p className="text-sm">
                        {video?.description}
                      </p>
                    </div>
                  </div>
                  <CommentsCard videoId={videoId} />
                </div>
                <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
                  <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
                    <VideoCard userSpecificVideos={false} />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>

  )
}

export default Player