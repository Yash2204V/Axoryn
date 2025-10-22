import { memo, useState } from 'react'
import { useAddCommentMutation, useDeleteCommentMutation, useGetVideoCommentsQuery } from '../services/comment/commentApi';
import { formatTimeAgo } from '../utils/formatTimeAgo';
import Button from './Button';
import toast from 'react-hot-toast';
import { useGetCurrentUserQuery } from '../services/user/userApi';

const CommentsCard = memo(({ videoId }) => {

    const token = localStorage.getItem('token');
    const userId = useGetCurrentUserQuery(undefined, { skip: !token })?.data?.data._id;
    
    const { data: commentsData, refetch } = useGetVideoCommentsQuery(videoId);
    const comments = commentsData?.data?.docs || [];
    

    const [addingComment, setAddingComment] = useState("");
    const [addComment] = useAddCommentMutation();
    const [deletePlaylist] = useDeleteCommentMutation();
    // const [updatePlaylist] = useUpdateCommentMutation();


    const handleAddComment = async () => {
        try {
            await addComment({
                videoId,
                body: { content: addingComment }
            }).unwrap();
            setAddingComment("");

            toast.success("Comment added!");
            refetch();
        } catch (err) {
            toast.error(`Failed to add comment! ${err?.message || ""}`);
        }
    };

    const handleDelete = async (commentId) => {
        
        try {
            await deletePlaylist(commentId).unwrap();
            toast.success("Comment deleted!");
            refetch();
        } catch (err) {
            toast.error(`Failed to delete comment! ${err?.message || ""}`);
        }
    }

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
                                        src={comment?.commentor.avatar}
                                        alt={comment?.commentor.username}
                                        className="h-full w-full rounded-full" />
                                </div>
                                <div className="block">
                                    <p className="flex items-center text-gray-200 ">
                                        {comment?.commentor.fullName}&nbsp;·&nbsp;
                                        <span className="text-sm">{formatTimeAgo(comment?.commentor.createdAt)}</span>
                                    </p>
                                    <p className="text-sm">@{comment?.commentor.username}</p>
                                    <p className="mt-3 text-sm">
                                        {comment.content}
                                    </p>
                                </div>
                                {comment?.commentor._id === userId && (
                                    <div className='ml-auto flex gap-x-3 mt-2 items-start'>
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            handleDelete(comment?._id)
                                        }}><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            height={20}
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
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            // handleEdit(comment._id)
                                        }}><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            height={20}
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
                                    </div>
                                )}
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