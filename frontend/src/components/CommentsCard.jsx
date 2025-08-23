import { memo, useState } from 'react'
import { useAddCommentMutation, useGetVideoCommentsQuery } from '../services/comment/commentApi';
import { formatTimeAgo } from '../utils/formatTimeAgo';
import Button from './Button';

const CommentsCard = memo(({videoId}) => {

    const { data: commentsData, refetch } = useGetVideoCommentsQuery(videoId);
    const comments = commentsData?.data?.docs || [];

    const [addingComment, setAddingComment] = useState("");
    const [addComment] = useAddCommentMutation();

    const handleAddComment = async () => {
    try {
        await addComment({
        videoId,
        body: { content: addingComment }
        }).unwrap();
        setAddingComment("");
        
        refetch();
    } catch (err) {
        console.error("Failed to add comment:", err);
    }
    };

    return (
        <>
            <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
            <h6 className="font-semibold">{comments?.length} Comments...</h6>
            </button>
            <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
            <div className="block">
            <h6 className="mb-4 font-semibold">{comments?.length} Comments</h6>
            <input
                type="text"
                className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
                placeholder="Add a Comment"
                value={addingComment}
                onChange={(e) => setAddingComment(e.target.value)}    
            />
            <Button onClick={handleAddComment} className='mt-4'>Comment</Button>
            </div>
            <hr className="my-4 border-white" />
            {comments && comments && comments.length > 0 ? (
                comments.map((comment, idx) => (
                    <div key={comment._id || idx} className="mb-4 last:mb-0">
                        <div className="flex gap-x-4">
                            <div className="mt-2 h-11 w-11 shrink-0">
                                <img
                                    src={comment?.commentor.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                    alt={comment?.commentor.username}
                                    className="h-full w-full rounded-full" />
                            </div>
                            <div className="block">
                                <p className="flex items-center text-gray-200">
                                    {comment?.commentor.fullName}&nbsp;·&nbsp;
                                    <span className="text-sm">{formatTimeAgo(comment?.commentor.createdAt)}</span>
                                </p>
                                <p className="text-sm text-gray-200">@{comment?.commentor.username}</p>
                                <p className="mt-3 text-sm">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                        <hr className="my-4 border-white" />
                    </div>
            ))
            ) : (
                <p className="text-gray-400">No comments yet. Be the first to comment!</p>
            )}
            </div>
        </>
        )
    })

export default CommentsCard