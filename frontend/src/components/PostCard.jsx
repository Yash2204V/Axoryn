function PostCard({  
    _id,  
    title, 
    thumbnail, 
    duration, 
    views, 
    updatedAt, 
    channel: { channelId, username, avatar } = {}
}) {

    function formatDuration(duration) {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const updatedHours = Math.floor((Date.now() - new Date(updatedAt)) / 3600000);
    
    return (
        <div className="w-full">
            <div className="relative mb-2 w-full pt-[56%]">
                <Link to={`player/${_id}`}>
                    <div className="absolute inset-0">
                        <img
                            src={thumbnail}
                            alt={title}
                            className="h-full w-full"
                        />
                    </div>
                </Link>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                    {formatDuration(duration)}
                </span>
            </div>
            <div className="flex gap-x-2">
                <Link to={`channel/${channelId}`} className="h-10 w-10 shrink-0">
                    <img
                        src={avatar}
                        alt={username}
                        className="h-full w-full rounded-full"
                    />
                </Link>
                <div className="w-full">
                    <h6 className="mb-1 font-semibold">
                        {title}
                    </h6>
                    <p className="flex text-sm text-gray-200">
                        {views}&nbsp;Views · {updatedHours} ago
                    </p>
                    <p className="text-sm text-gray-200">{username}</p>
                </div>
            </div>
        </div>
    )
}

export default PostCard