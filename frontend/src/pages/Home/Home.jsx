import { Aside, VideoCard } from '../../components'
import { useGetAllVideosQuery } from '../../services/video/videoApi';

function Home() {
  const { data, error, isLoading } = useGetAllVideosQuery();
  const videos = data?.data?.docs || [];
  
  return (
    <>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
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
            <div>
                <VideoCard userSpecificVideos={false} />
            </div>

            {/* Empty State */}
            {!isLoading && !error && (!videos || videos.length === 0) && (
              <div className="flex h-full items-center justify-center p-8">
                <div className="w-full max-w-sm text-center">
                  <p className="mb-3 w-full">
                    <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#08e6f5]">
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
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                        />
                      </svg>
                    </span>
                  </p>
                  <h5 className="mb-2 font-semibold">No videos available</h5>
                  <p>There are no videos here available. Please try to search something else.</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}

export default Home