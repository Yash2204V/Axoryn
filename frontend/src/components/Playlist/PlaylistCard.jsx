import { Link } from "react-router-dom";
import { useDeletePlaylistMutation, useGetUserPlaylistsQuery, useUpdatePlaylistMutation } from "../../services/playlist/playlistApi";
import { formatTimeAgo } from "../../utils/formatTimeAgo"
import { useState } from "react";
import toast from 'react-hot-toast';
import { confirmDelete } from "../../utils/confirmDelete.jsx";

function PlaylistCard({ data, editAndDelete = false }) {

    const [form, setForm] = useState({
        name: "",
        description: ""
    });

    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    const { data: playlistsData, refetch } = useGetUserPlaylistsQuery(data, { skip: !data });
    const playlists = playlistsData?.data || [];

    const [deletePlaylist] = useDeletePlaylistMutation();
    const [updatePlaylist] = useUpdatePlaylistMutation();

    const handleDelete = async (playlistId) => {
        confirmDelete(async () => {
            try {
                await deletePlaylist(playlistId).unwrap();
                refetch();
            } catch (error) {
                console.error("Failed to delete the playlist: ", error);
                toast.error("Failed to delete the playlist!");
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOpenEdit = (playlist) => {
        setSelectedPlaylist(playlist);
        setForm({
            name: playlist.name,
            description: playlist.description || ""
        });
        setIsOpen(true);
    };

    const handleEdit = async () => {
        if (!selectedPlaylist?._id) return;
        try {
            await updatePlaylist({ playlistId: selectedPlaylist._id, body: form }).unwrap();
            toast.success("Playlist updated successfully");
            setIsOpen(false);
            setSelectedPlaylist(null);
            refetch();
        } catch (error) {
            toast.error(`Failed to update the playlist! ${error?.message || ""}`);
        }
    };

    return (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
            {playlists?.length > 0 ? [...playlists].reverse().map((playlist, idx) => (
                <div key={playlist._id || idx} className="w-full">
                    <Link to={`/playlist/${playlist._id}`}>
                        <div className="relative mb-2 w-full pt-[56%]">
                            <div className="absolute inset-0">
                                <img
                                    src={playlist?.videos[0]?.thumbnail || "https://wallpaperaccess.com/full/2861682.jpg"}
                                    alt={playlist?.name}
                                    className="h-full w-full"
                                />
                                {editAndDelete && (
                                    <>
                                        <button
                                            onClick={(e) => (
                                                e.preventDefault(),
                                                handleOpenEdit(playlist)
                                            )} className="absolute right-14 top-2 z-[2] rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/50">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-pencil-icon lucide-pencil"
                                            >
                                                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                                <path d="m15 5 4 4" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(playlist._id)
                                            }}
                                            className="absolute right-2 top-2 z-[2] rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/50"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-trash-icon lucide-trash"
                                            >
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                                <path d="M3 6h18" />
                                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </>
                                )}
                                <div className="absolute inset-x-0 bottom-0">
                                    <div className="relative z-[1]">
                                        <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                                            <p className="flex justify-between">
                                                <span className="inline-block">{playlist?.name}</span>
                                                <span className="inline-block">{playlist?.videos?.length}&nbsp;videos</span>
                                            </p>
                                            <p className="text-sm text-gray-200">
                                                {formatTimeAgo(playlist?.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    {isOpen && selectedPlaylist && (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleEdit();
                        }}>
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                                onClick={() => setIsOpen(false)}>
                                <div className="relative flex h-auto w-full max-w-3xl flex-col rounded-lg border bg-black shadow-lg"
                                    onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center justify-between border-b p-4">
                                        <h2 className="text-xl font-semibold">Edit Playlist</h2>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsOpen(false)}
                                                className="bg-[#08e6f5] px-3 py-2 font-bold text-black rounded"
                                            >
                                                ✕
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-[#08e6f5] px-3 py-2 font-bold text-black rounded"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>

                                    <div className="w-full p-4">
                                        <label htmlFor="name" className="mb-1 inline-block">Title *</label>
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            className="w-full border bg-transparent px-2 py-1 outline-none"
                                        />
                                    </div>

                                    <div className="w-full p-4">
                                        <label htmlFor="desc" className="mb-1 inline-block">Description *</label>
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
                        </form>
                    )}
                </div>
            )) : (
                <div className="flex items-center justify-center p-4">
                    <div className="w-full max-w-sm text-center">
                        <p className="mb-3 w-full">
                            <span className="inline-flex rounded-full bg-[#9ef9ff] p-2 text-[#08e6f5]">
                                <span className="inline-block w-6">
                                    <svg
                                        style={{ width: "100%" }}
                                        viewBox="0 0 22 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 5L10.8845 2.76892C10.5634 2.1268 10.4029 1.80573 10.1634 1.57116C9.95158 1.36373 9.69632 1.20597 9.41607 1.10931C9.09916 1 8.74021 1 8.02229 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.0799 1 4.2V5M1 5H16.2C17.8802 5 18.7202 5 19.362 5.32698C19.9265 5.6146 20.3854 6.07354 20.673 6.63803C21 7.27976 21 8.11984 21 9.8V14.2C21 15.8802 21 16.7202 20.673 17.362C20.3854 17.9265 19.9265 18.3854 19.362 18.673C18.7202 19 17.8802 19 16.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V5Z"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </span>
                        </p>
                        <h5 className="mb-2 font-semibold">No playlist created</h5>
                        <p>There are no playlist created on this channel.</p>
                    </div>
                </div>
            )}

        </div>
    )
}

export default PlaylistCard