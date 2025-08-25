import { Link } from "react-router-dom";
import { useGetUserPlaylistsQuery } from "../../services/playlist/playlistApi";
import { formatTimeAgo } from "../../utils/formatTimeAgo"

function PlaylistCard({ data }) {

    const { data: playlistsData } = useGetUserPlaylistsQuery(data, { skip: !data });
    const playlists = playlistsData?.data || [];

    return (
        <>
            {playlists?.length > 0 ? playlists?.map((playlist, idx) => (
                <div key={playlist._id || idx} className="w-full">
                    <Link to={`/playlist/${playlist._id}`}>
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
                                                <span className="inline-block">{playlist?.videos.length}&nbsp;videos</span>
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
        </>
    )
}

export default PlaylistCard