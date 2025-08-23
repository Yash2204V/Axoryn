import { memo, useEffect, useState } from 'react'
import { useAddVideoToPlaylistMutation, useCreatePlaylistMutation, useGetUserPlaylistsQuery } from '../../services/playlist/playlistApi';
import { useGetCurrentUserQuery } from '../../services/user/userApi';
import Button from '../Button';

const SavePlaylist = memo(({videoId}) => {
    const [addPlaylist, setAddPlaylist] = useState("");
    const user = useGetCurrentUserQuery();
    const userId = user?.data?.data?._id;
    
    const { data: playlistsData, refetch } = useGetUserPlaylistsQuery(userId);
    const playlists = playlistsData?.data;

    const [createPlaylist] = useCreatePlaylistMutation();
    
    const handlePlaylist = async () => {
        await createPlaylist({ name: addPlaylist }).unwrap();
        setAddPlaylist("");
        
        refetch();
    }

    const [ addVideoToPlaylist ] = useAddVideoToPlaylistMutation();
    const [savedPlaylists, setSavedPlaylists] = useState(new Set());

    useEffect(() => {
        const preSaved = new Set(
            playlists
            ?.filter(p => p.videos?.includes(videoId))
            .map(p => p._id)
        );
        setSavedPlaylists(preSaved);
    }, [playlists, videoId]);

    const handleSaveToPlaylist = async (id) => {
        
        await addVideoToPlaylist({
            videoId,
            playlistId: id
        }).unwrap();

        setSavedPlaylists((prev) => new Set(prev).add(id));
    }

    return (
        <div className="absolute right-0 top-full z-10 hidden w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30 hover:block peer-focus:block">
            <h3 className="mb-4 text-center text-lg font-semibold">
                Save to playlist
            </h3>
            <ul className="mb-4">
                {playlists?.length > 0 ? (
                    playlists.map((playlist, idx) => (
                    <li key={playlist._id || idx} className="mb-2 last:mb-0">
                        <label
                        className="group/label inline-flex cursor-pointer items-center gap-x-3"
                        htmlFor={`Collections-checkbox-${idx}`} 
                        >
                        <input
                            type="checkbox"
                            className="peer hidden"
                            id={`Collections-checkbox-${idx}`}
                            checked={savedPlaylists.has(playlist._id)}   // ✅ controlled
                            onChange={() => handleSaveToPlaylist(playlist._id)} // ✅ triggers mutation
                        />
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#08e6f5] peer-checked:border-[#08e6f5] peer-checked:text-[#08e6f5]">
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
                        {playlist?.name}
                        </label>
                    </li>
                    ))
                ) : (
                    <li className="mb-2 last:mb-0 text-gray-400">No Playlists Found</li>
                )}
            </ul>
            <div className="flex flex-col">
                <label
                    htmlFor="playlist-name"
                    className="mb-1 inline-block text-sm cursor-pointer">
                    Name
                </label>
                <input
                    className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-[#08e6f5]"
                    id="playlist-name"
                    value={addPlaylist}
                    placeholder="Enter playlist name"
                    onChange={(e) => setAddPlaylist(e.target.value)}
                />
                <Button className='mt-2' children={'Create'} onClick={handlePlaylist} />
            </div>
        </div>
    )
})

export default SavePlaylist