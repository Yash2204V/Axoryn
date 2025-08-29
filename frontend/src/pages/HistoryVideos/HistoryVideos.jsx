import { Link } from 'react-router-dom';
import { Aside } from '../../components'
import { formatDuration } from '../../utils/formatDuration';
import { formatViews } from '../../utils/formatViews';
import { formatTimeAgo } from '../../utils/formatTimeAgo';
import { useGetWatchHistoryQuery } from '../../services/user/userApi';
import { useEffect, useMemo } from 'react';
import { memo } from 'react';

const HistoryVideos = memo(() => {
    const { data, error, isLoading, refetch } = useGetWatchHistoryQuery();
    const videos = useMemo(() => data?.data || [], [data]);

    console.log("History", videos);
    
    useEffect(() => {
        refetch();
    }, [videos, refetch]);
    

    return (
        <>
            <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                <h1 className="sm:ml-[70px] text-4xl sm:text-5xl font-bold p-4 bg-gradient-to-r from-gray-100 via-gray-500 to-gray-800 bg-clip-text text-transparent">Your History</h1>
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <Aside />
                    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex h-full items-center justify-center p-8">
                                <div className="w-full max-w-sm text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#08e6f5] mx-auto mb-4"></div>
                                    <h5 className="mb-2 font-semibold">Loading videos...</h5>
                                    <p>Please wait while we fetch the latest videos for you.</p>
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
                                    <h5 className="mb-2 font-semibold">Error loading videos</h5>
                                    <p className="mb-4">{error?.data?.message || error?.message || 'Failed to load videos'}</p>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="rounded bg-[#08e6f5] px-4 py-2 text-white hover:bg-[#9c67ff] transition-colors"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Videos Grid */}
                        {/* This Start */}
                        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
                            {!isLoading && !error && videos?.length > 0 ? videos?.map((video, idx) => (
                                <div key={video._id || idx} className="w-full">
                                    {video?.isPublished ? (
                                        <div className="w-full">
                                            <div className="relative mb-2 w-full pt-[56%]">
                                                <Link to={`/player/${video._id}`}>
                                                    <div className="absolute inset-0">
                                                        <img
                                                            src={video.thumbnail}
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
                                                    to={`/channel/${video.owner?.username}`}
                                                    className="h-10 w-10 shrink-0"
                                                >
                                                    <img
                                                        src={video.owner?.avatar}
                                                        alt={video.owner?.username}
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
                                                        @{video.owner?.username}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ): null}
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
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* This End */}
                    </section>
                </div>
            </div>
        </>
    )
})

export default HistoryVideos