import { memo, useState } from 'react';
import { Link } from 'react-router-dom'
import { formatViews } from '../utils/formatViews';
import { formatDuration } from '../utils/formatDuration';
import { formatTimeAgo } from '../utils/formatTimeAgo';
import { useGetAllUserVideosQuery, useGetAllVideosQuery, usePublishAVideoMutation } from '../services/video/videoApi';
import toast from 'react-hot-toast';

const VideoCard = memo(({ data, userSpecificVideos=true, addVideoBtn=false }) => {
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    videoFile: null,
    thumbnail: null,
  });
  
  const [isOpen, setIsOpen] = useState(false);

  const { data: allVideos, error: allError, isLoading: allLoading } = useGetAllVideosQuery();
  const { data: userVideos, error: userError, isLoading: userLoading } = useGetAllUserVideosQuery({ userId: data }, { skip: !data });

  const [ publishAVideo ] = usePublishAVideoMutation();

  const videosData = userSpecificVideos ? userVideos : allVideos;
  const videos = videosData?.data?.docs || [];

  const isLoading = userSpecificVideos ? userLoading : allLoading;
  const error = userSpecificVideos ? userError : allError;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }
    
    try {
      await publishAVideo(formData);
      toast.success('Video uploaded successfully!');
      setIsOpen(false);
    } catch (err) {
      toast.error(`Video upload failed: ${err.message || err}`);
    } 
  };


  return (
      <>
        {addVideoBtn && (
          <div className="w-full ml-4">
            <button onClick={() => setIsOpen(true)} className="w-fit mt-4 inline-flex items-center gap-x-2 bg-[#08e6f5] px-3 py-2 font-semibold text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New video
            </button>
          </div>
        )}
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
            {isOpen && (
              <form onSubmit={handleSubmit}>
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                  onClick={() => setIsOpen(false)}
                >
                  <div
                    className="relative flex h-[90vh] w-full max-w-3xl flex-col rounded-lg border bg-black shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between border-b p-4">
                      <h2 className="text-xl font-semibold">Upload Videos</h2>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setIsOpen(false)}
                          className="bg-[#08e6f5] px-3 py-2 font-bold text-black rounded"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-x-icon"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                        <button
                          type="submit"
                          className="bg-[#08e6f5] px-3 py-2 font-bold text-black rounded"
                        >
                          Save
                        </button>
                      </div>
                    </div>

                    <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-4 p-4 h-auto overflow-y-auto">
                      <div className="w-full border-2 border-dashed px-4 py-12 text-center">
                        <span className="mb-4 inline-block w-24 rounded-full bg-[#9ef9ff] p-4 text-[#08e6f5]">
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
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                            />
                          </svg>
                        </span>
                        <h6 className="mb-2 font-semibold">Drag and drop video files to upload</h6>
                        <p className="text-gray-400">Your videos will be private until you publish them.</p>
                        <h1 className='text-2xl font-semibold font-sans text-red-600'>Limit (100MB)</h1>

                        <label
                          htmlFor="videoFile"
                          className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#08e6f5] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                        >
                          <input
                            type="file"
                            id="videoFile"
                            name="videoFile"
                            accept="video/*"
                            onChange={handleChange}
                            className="sr-only"
                          />
                          Select Video
                        </label>
                      </div>

                      <div className="w-full">
                        <label htmlFor="thumbnail" className="mb-1 inline-block">
                          Thumbnail <sup>*</sup>
                        </label>
                        <input
                          id="thumbnail"
                          type="file"
                          name="thumbnail"
                          accept="image/*"
                          onChange={handleChange}
                          className="w-full border p-1 file:mr-4 file:border-none file:bg-[#08e6f5] file:px-3 file:py-1.5"
                        />
                      </div>

                      <div className="w-full">
                        <label htmlFor="title" className="mb-1 inline-block">
                          Title <sup>*</sup>
                        </label>
                        <input
                          id="title"
                          type="text"
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                          className="w-full border bg-transparent px-2 py-1 outline-none"
                        />
                      </div>

                      <div className="w-full">
                        <label htmlFor="desc" className="mb-1 inline-block">
                          Description <sup>*</sup>
                        </label>
                        <textarea
                          id="desc"
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
        </div>
      </>
  );
})

export default VideoCard;
