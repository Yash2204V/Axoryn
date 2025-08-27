import { useGetChannelStatsQuery } from '../../services/dashboard/dashboardApi';
import {
    useDeleteVideoMutation,
    usePublishAVideoMutation,
    useTogglePublishStatusMutation,
    useUpdateVideoMutation,
} from '../../services/video/videoApi';
import { Aside } from '../../components';
import { useState } from 'react';
import toast from 'react-hot-toast';

function Admin() {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [editingVideoId, setEditingVideoId] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        videoFile: null,
        thumbnail: null,
    });


    const { data: statsDetails, refetch, isLoading: statsLoading } = useGetChannelStatsQuery();

    const [deleteVideo] = useDeleteVideoMutation();
    const [updateVideo] = useUpdateVideoMutation();
    const [togglePublishStatus, { isLoading: toggleLoading }] = useTogglePublishStatusMutation();
    const [publishAVideo] = usePublishAVideoMutation();

    const stats = statsDetails?.data?.[0];

    const handleDelete = async (id) => {
        try {
            await deleteVideo(id).unwrap();
            refetch();
        } catch (e) {
            toast.error(`Failed to delete the video! ${e?.message || ""}`);
        }
    };

    const handleToggle = async (video) => {
        try {
            await togglePublishStatus(video._id).unwrap();
            refetch();
        } catch (err) {
            toast.error(`Failed to toggle publish status! ${err?.message || ""}`);
        }
    };

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

    const handleSubmitUpload = async (e) => {
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
            setIsUploadOpen(false);
            setForm({
                title: "",
                description: "",
                videoFile: null,
                thumbnail: null,
            });
            refetch();
        } catch (err) {
            toast.error(`Failed to upload the video! ${err?.message || ""}`);
        }
    };

    const handleSubmitEdit = async (e, id) => {
        e.preventDefault();
        const formData = new FormData();

        for (let key in form) {
            if (form[key]) {
                formData.append(key, form[key]);
            }
        }

        try {

            await updateVideo({ formData, videoId: id }).unwrap();
            toast.success("Video edited successfully!");
            setEditingVideoId(null);
            setForm({
                title: "",
                description: "",
                videoFile: null,
                thumbnail: null,
            });
            refetch();
        } catch (err) {
            toast.error(`Failed to edit the video! ${err?.message || ""}`);
        }
    };


    return (
        <>

            <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                <h1 className="sm:ml-[70px] text-4xl sm:text-5xl font-bold pl-4 pt-4 bg-gradient-to-r from-gray-100 via-gray-400 to-gray-700 bg-clip-text text-transparent">Admin Panel</h1>

                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <Aside />
                    {isUploadOpen && (
                        <form onSubmit={handleSubmitUpload}>
                            <div
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                                onClick={() => setIsUploadOpen(false)}
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
                                                onClick={() => setIsUploadOpen(false)}
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
                    {editingVideoId && (
                        <form onSubmit={(e) => handleSubmitEdit(e, editingVideoId)}>
                            <div
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                                onClick={() => setEditingVideoId(null)}
                            >
                                <div
                                    className="relative flex h-fit w-full max-w-3xl flex-col rounded-lg border bg-black shadow-lg"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center justify-between border-b p-4">
                                        <h2 className="text-xl font-semibold">Edit Video</h2>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setEditingVideoId(null)}
                                                className="bg-[#08e6f5] px-3 py-2 font-bold text-black rounded"
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-[#08e6f5] px-3 py-2 font-bold text-black rounded"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>

                                    {/* FORM FIELDS */}
                                    <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-4 p-4 h-fit overflow-y-auto">
                                        <div className="w-full">
                                            <label htmlFor="thumbnail">Thumbnail</label>
                                            <input
                                                id="thumbnail"
                                                type="file"
                                                name="thumbnail"
                                                accept="image/*"
                                                onChange={handleChange}
                                                className="w-full border p-1 file:bg-[#08e6f5]"
                                            />
                                        </div>

                                        <div className="w-full">
                                            <label htmlFor="title">Title</label>
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
                                            <label htmlFor="desc">Description</label>
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

                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-y-6 px-4 py-8 pb-[70px] sm:ml-[70px] sm:pb-0">
                        <div className="flex flex-wrap justify-between gap-4">
                            <div className="block">
                                <h1 className="text-2xl font-bold">
                                    Welcome Back, <span className="capitalize">{stats?.username}</span>
                                </h1>
                                <p className="text-sm text-gray-300">Seamless Video Management, Elevated Results.</p>
                            </div>
                            <div className="block">
                                <button onClick={() => setIsUploadOpen(true)} className="inline-flex items-center gap-x-2 bg-[#08e6f5] px-3 py-2 font-semibold text-black">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        className="h-5 w-5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>{' '}
                                    Upload video
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
                            <div className="border p-4">
                                <div className="mb-4 block">
                                    <span className="inline-block h-7 w-7 rounded-full bg-[#9ef9ff] p-1 text-[#08e6f5]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </span>
                                </div>
                                <h6 className="text-gray-300">Total views</h6>
                                <p className="text-3xl font-semibold">{statsLoading ? '—' : stats?.totalViews}</p>
                            </div>

                            <div className="border p-4">
                                <div className="mb-4 block">
                                    <span className="inline-block h-7 w-7 rounded-full bg-[#9ef9ff] p-1 text-[#08e6f5]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </span>
                                </div>
                                <h6 className="text-gray-300">Total subscribers</h6>
                                <p className="text-3xl font-semibold">{statsLoading ? '—' : stats?.totalSubscribers}</p>
                            </div>

                            <div className="border p-4">
                                <div className="mb-4 block">
                                    <span className="inline-block h-7 w-7 rounded-full bg-[#9ef9ff] p-1 text-[#08e6f5]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    </span>
                                </div>
                                <h6 className="text-gray-300">Total likes</h6>
                                <p className="text-3xl font-semibold">{statsLoading ? '—' : stats?.totalLikes}</p>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="w-full overflow-auto">
                            <table className="w-full min-w-[1200px] border-collapse border text-white">
                                <thead>
                                    <tr>
                                        <th className="border-collapse border-b p-4">Toggle</th>
                                        <th className="border-collapse border-b p-4">Status</th>
                                        <th className="border-collapse border-b p-4">Uploaded</th>
                                        <th className="border-collapse border-b p-4">Date uploaded</th>
                                        <th className="border-collapse border-b p-4" />
                                        <th className="border-collapse border-b p-4" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats?.videosDetails?.length > 0 &&
                                        stats.videosDetails.map((video, idx) => (
                                            <tr key={video._id || idx} className="group border">
                                                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                                    <div className="flex justify-center">
                                                        <label htmlFor={`vid-pub-${video?._id}`} className="relative inline-block w-12 cursor-pointer overflow-hidden">
                                                            <input
                                                                type="checkbox"
                                                                id={`vid-pub-${video?._id}`}
                                                                className="peer sr-only"
                                                                checked={!!video?.isPublished}
                                                                onChange={() => handleToggle(video)}
                                                                disabled={toggleLoading}
                                                            />
                                                            <span className="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-[#08e6f5] peer-checked:after:left-7" />
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                                    <div className="flex justify-center">
                                                        {video?.isPublished ? (
                                                            <span className="inline-block rounded-2xl border px-1.5 py-0.5 border-green-600 text-green-600">Published</span>
                                                        ) : (
                                                            <span className="inline-block rounded-2xl border px-1.5 py-0.5 border-red-600 text-red-600">Unpublished</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                                    <div className="flex items-center gap-4">
                                                        <img className="h-10 w-10 rounded-full" src={video?.thumbnail} alt={video?.title || 'Video thumbnail'} />
                                                        <h3 className="font-semibold">{video?.title}</h3>
                                                    </div>
                                                </td>
                                                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                                    {new Date(video.createdAt).toLocaleDateString('en-IN', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: '2-digit',
                                                    })}
                                                </td>
                                                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                                    <div className="flex gap-4">
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleDelete(video._id);
                                                            }}
                                                            className="h-5 w-5 hover:text-[#08e6f5]"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>

                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setEditingVideoId(video._id);
                                                                setForm({
                                                                    title: video.title || "",
                                                                    description: video.description || "",
                                                                    videoFile: null,
                                                                    thumbnail: null,
                                                                });
                                                            }}
                                                            className="h-5 w-5 hover:text-[#08e6f5]">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none" />
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;