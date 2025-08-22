import { Link, useParams } from 'react-router-dom'
import { useGetVideoByIdQuery } from '../../services/video/videoApi'
import { Aside } from '../../components';
import { formatViews } from '../../utils/formatViews';
import { formatTimeAgo } from '../../utils/formatTimeAgo';
import { useToggleVideoLikeMutation } from '../../services/like/likeApi';

function Player() {
  const { videoId } = useParams();
  
  const { data, error, isLoading, refetch } = useGetVideoByIdQuery(videoId);
  const [toggleVideoLike, { isLoading: isLiking }] = useToggleVideoLikeMutation();

  const video = data?.data?.[0];

  const handleLike = async () => {
    try {
      await toggleVideoLike(videoId).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };
  
  return (
    <>
      <div>
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-woman-reading-book-on-a-bench.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/18107025/pexels-photo-18107025/free-photo-of-man-reading-newspaper.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/18096595/pexels-photo-18096595/free-photo-of-music-on-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/18094275/pexels-photo-18094275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/13847596/pexels-photo-13847596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/7775637/pexels-photo-7775637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/3532552/pexels-photo-3532552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/2519817/pexels-photo-2519817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/1739849/pexels-photo-1739849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/1739854/pexels-photo-1739854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/1144256/pexels-photo-1144256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/1144260/pexels-photo-1144260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/1144276/pexels-photo-1144276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/1144274/pexels-photo-1144274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/1144231/pexels-photo-1144231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/1144250/pexels-photo-1144250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/1115824/pexels-photo-1115824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/1115808/pexels-photo-1115808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Aside />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
            {/* Loading State */}
            {isLoading && (
              <div className="flex h-full items-center justify-center p-8">
                <div className="w-full max-w-sm text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AE7AFF] mx-auto mb-4"></div>
                  <h5 className="mb-2 font-semibold">Loading video...</h5>
                  <p>Please wait while we load the video for you.</p>
                </div>
              </div>
            )}

            {/* Error State */}
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
                  <h5 className="mb-2 font-semibold">Error loading video</h5>
                  <p className="mb-4">{error?.data?.message || error?.message || 'Failed to load video'}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="rounded bg-[#AE7AFF] px-4 py-2 text-white hover:bg-[#9c67ff] transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Video Player Content */}
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
                            <span className="inline-block w-5 group-focus/btn:text-[#ae7aff]">
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
                          <div className="absolute right-0 top-full z-10 hidden w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30 hover:block peer-focus:block">
                            <h3 className="mb-4 text-center text-lg font-semibold">
                              Save to playlist
                            </h3>
                            <ul className="mb-4">
                              <li className="mb-2 last:mb-0">
                                <label
                                  className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                  htmlFor="Collections-checkbox"
                                >
                                  <input
                                    type="checkbox"
                                    className="peer hidden"
                                    id="Collections-checkbox"
                                  />
                                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={3}
                                      stroke="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                      />
                                    </svg>
                                  </span>
                                  Collections
                                </label>
                              </li>
                              <li className="mb-2 last:mb-0">
                                <label
                                  className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                  htmlFor="JavaScript Basics-checkbox"
                                >
                                  <input
                                    type="checkbox"
                                    className="peer hidden"
                                    id="JavaScript Basics-checkbox"
                                  />
                                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={3}
                                      stroke="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                      />
                                    </svg>
                                  </span>
                                  JavaScript Basics
                                </label>
                              </li>
                              <li className="mb-2 last:mb-0">
                                <label
                                  className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                  htmlFor="C++ Tuts-checkbox"
                                >
                                  <input
                                    type="checkbox"
                                    className="peer hidden"
                                    id="C++ Tuts-checkbox"
                                  />
                                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={3}
                                      stroke="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                      />
                                    </svg>
                                  </span>
                                  C++ Tuts
                                </label>
                              </li>
                              <li className="mb-2 last:mb-0">
                                <label
                                  className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                  htmlFor="Feel Good Music-checkbox"
                                >
                                  <input
                                    type="checkbox"
                                    className="peer hidden"
                                    id="Feel Good Music-checkbox"
                                  />
                                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={3}
                                      stroke="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                      />
                                    </svg>
                                  </span>
                                  Feel Good Music
                                </label>
                              </li>
                              <li className="mb-2 last:mb-0">
                                <label
                                  className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                  htmlFor="Ed Sheeran-checkbox"
                                >
                                  <input
                                    type="checkbox"
                                    className="peer hidden"
                                    id="Ed Sheeran-checkbox"
                                  />
                                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={3}
                                      stroke="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                      />
                                    </svg>
                                  </span>
                                  Ed Sheeran
                                </label>
                              </li>
                              <li className="mb-2 last:mb-0">
                                <label
                                  className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                  htmlFor="Python-checkbox"
                                >
                                  <input
                                    type="checkbox"
                                    className="peer hidden"
                                    id="Python-checkbox"
                                  />
                                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={3}
                                      stroke="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                      />
                                    </svg>
                                  </span>
                                  Python
                                </label>
                              </li>
                            </ul>
                            <div className="flex flex-col">
                              <label
                                htmlFor="playlist-name"
                                className="mb-1 inline-block cursor-pointer"
                              >
                                Name
                              </label>
                              <input
                                className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-[#ae7aff]"
                                id="playlist-name"
                                placeholder="Enter playlist name"
                              />
                              <button className="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black">
                                Create new playlist
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                      <Link to={`/channel/:channelId`} className="mt-2 h-12 w-12 shrink-0">
                        <img
                          src={video.channel?.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
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
                      <button className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
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
                        <span className="group-focus/btn:hidden">Subscribe</span>
                        <span className="hidden group-focus/btn:block">
                          Subscribed
                        </span>
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
                <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
                  <h6 className="font-semibold">573 Comments...</h6>
                </button>
                <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
                  <div className="block">
                    <h6 className="mb-4 font-semibold">573 Comments</h6>
                    <input
                      type="text"
                      className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
                      placeholder="Add a Comment"
                    />
                  </div>
                  <hr className="my-4 border-white" />
                  {/* Comments Starts from here */}
                  {/* Make the map to let this div get replicated if comment exist.*/}
                  {/* ----------- */}
                  <div>
                    <div className="flex gap-x-4">
                      <div className="mt-2 h-11 w-11 shrink-0">
                        <img
                          src="https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-woman-reading-book-on-a-bench.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="sarahjv"
                          className="h-full w-full rounded-full"
                        />
                      </div>
                      <div className="block">
                        <p className="flex items-center text-gray-200">
                          Sarah Johnson&nbsp;·&nbsp;
                          <span className="text-sm">17 hour ago</span>
                        </p>
                        <p className="text-sm text-gray-200">@sarahjv</p>
                        <p className="mt-3 text-sm">
                          This series is exactly what I've been looking for! Excited
                          to dive into these advanced React patterns. Thanks for
                          putting this together!
                        </p>
                      </div>
                    </div>
                    <hr className="my-4 border-white" />
                  </div>
                  {/* ----------- */}
                </div>
              </div>
              <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
                {/* Recommended Video List Starts from here */}
                {/* Make the map to let this div get replicated if videos exist.*/}
                {/* ----------- */}
                <div className="w-full gap-x-2 border pr-2 md:flex">
                  <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                    <div className="w-full pt-[56%]">
                      <div className="absolute inset-0">
                        <img
                          src="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="JavaScript Fundamentals: Variables and Data Types"
                          className="h-full w-full"
                        />
                      </div>
                      <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                        20:45
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                    <div className="h-12 w-12 shrink-0 md:hidden">
                      <img
                        src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="reactpatterns"
                        className="h-full w-full rounded-full"
                      />
                    </div>
                    <div className="w-full pt-1 md:pt-0">
                      <h6 className="mb-1 text-sm font-semibold">
                        JavaScript Fundamentals: Variables and Data Types
                      </h6>
                      <p className="mb-0.5 mt-2 text-sm text-gray-200">
                        Code Master
                      </p>
                      <p className="flex text-sm text-gray-200">
                        10.3k&nbsp;Views · 44 minutes ago
                      </p>
                    </div>
                  </div>
                </div>
                {/* ----------- */}
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