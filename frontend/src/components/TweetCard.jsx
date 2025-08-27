import { memo } from 'react';
import { useToggleTweetLikeMutation } from '../services/like/likeApi';
import { useCreateTweetMutation, useDeleteTweetMutation, useGetUserTweetQuery } from '../services/tweet/tweetApi';
import { formatTimeAgo } from '../utils/formatTimeAgo';
import toast from 'react-hot-toast';

const TweetCard = memo(({ data, addTweet = false }) => {

    const { data: tweetsData, refetch } = useGetUserTweetQuery(data, { skip: !data });
    const tweets = tweetsData?.data[0]?.tweets || [];
    const channel = tweetsData?.data[0] || [];

    const [createTweet] = useCreateTweetMutation();
    const [toggleTweetLike] = useToggleTweetLikeMutation();
    const [deleteTweet] = useDeleteTweetMutation();

    const handleLike = async (tweetId) => {
        try {
            await toggleTweetLike(tweetId).unwrap();
            refetch();
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    const handleTweetSubmit = async (e) => {
        e.preventDefault();
        await createTweet({ content: e.target[0].value });
        toast.success('Tweet posted successfully!');
        e.target[0].value = "";
        refetch();
    }

    const handleDelete = async (tweetId) => {
        console.log(tweetId);

        try {
            await deleteTweet(tweetId).unwrap();
            toast.success("Tweet deleted!");
            refetch();
        } catch (err) {
            toast.error(`Failed to delete tweet! ${err?.message || ""}`);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {addTweet && (
                <form onSubmit={handleTweetSubmit} className="w-full">
                    <div className="mt-2 border pb-2">
                        <textarea
                            className="mb-2 h-10 w-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
                            placeholder="Write a tweet"
                            name='content'
                            id='content'
                            defaultValue={""}
                        />
                        <div className="flex items-center justify-end gap-x-3 px-3">
                            <button type='submit' className="bg-[#08e6f5] px-3 py-2 font-semibold text-black">Send</button>
                        </div>
                    </div>
                </form>
            )}
            <div className="w-full">

                {tweets.length > 0 ? [...tweets]?.reverse().map((tweet, idx) => (
                    <div key={tweet._id || idx} className="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
                        <div className="h-14 w-14 shrink-0">
                            <img
                                src={channel?.avatar}
                                alt={channel?.fullName}
                                className="h-full w-full rounded-full"
                            />
                        </div>
                        <div className="w-full">
                            <h4 className="mb-1 flex items-center gap-x-2">
                                <span className="font-semibold">{channel?.fullName}</span>
                                &nbsp;
                                <span className="inline-block text-sm text-gray-400">{formatTimeAgo(tweet?.createdAt)}</span>
                            </h4>
                            <p className="mb-2">
                                {tweet?.content}
                            </p>
                            <div className="flex gap-4">
                                <button onClick={(e) => (
                                    e.preventDefault(),
                                    handleLike(tweet?._id)
                                )}
                                    className="group inline-flex items-center gap-x-1 outline-none ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        className="h-5 w-5 text-[#08e6f5] group-focus:text-inherit"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                        />
                                    </svg>
                                    {tweet?.likesCount ? tweet?.likesCount : 0}
                                </button>
                            </div>
                        </div>
                        <button className='sm:mr-5 flex items-start' onClick={(e) => {
                            e.preventDefault();
                            handleDelete(tweet?._id) }}>
                            <svg
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
                    </div>
                )) : (
                    <div className="flex justify-center p-4">
                        <div className="w-full max-w-sm text-center">
                            <p className="mb-3 w-full">
                                <span className="inline-flex rounded-full bg-[#9ef9ff] p-2 text-[#08e6f5]">
                                    <span className="inline-block w-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                        </svg>
                                    </span>
                                </span>
                            </p>
                            <h5 className="mb-2 font-semibold">No Tweets</h5>
                            <p>
                                This channel has yet to make&nbsp;
                                <strong>Tweet</strong>
                                .
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
});

export default TweetCard