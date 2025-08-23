import { formatTimeAgo } from "../../utils/formatTimeAgo"

function PlaylistCard({ playlist }) {
    
  return (
    <div className="w-full">
        <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
            <img
            src={playlist?.videos?.thumbnail || "https://wallpaperaccess.com/full/2861682.jpg"}
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
    </div>
  )
}

export default PlaylistCard