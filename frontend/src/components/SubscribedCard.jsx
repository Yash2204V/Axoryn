import { useGetSubscribedChannelsQuery, useToggleSubscriptionMutation } from '../services/subscription/subscriptionApi';

function SubscribedCard({ data }) {

    const { data: subscribersData, refetch } = useGetSubscribedChannelsQuery(data, { skip: !data });
    const subscribers = subscribersData?.data || [];
    
    const [toggleSubscription] = useToggleSubscriptionMutation();

    const handleSubscribe = (id) => {
        toggleSubscription(id).unwrap();
        refetch();
    };

    return (
        <>
            {subscribers?.map((subscriber, idx) => (
                <div key={subscriber._id || idx} className="flex w-full justify-between">
                    <div className="flex items-center gap-x-2">
                        <div className="h-14 w-14 shrink-0">
                            <img
                                src={subscriber?.avatar}
                                alt="Code Master"
                                className="h-full w-full rounded-full"
                            />
                        </div>
                        <div className="block">
                            <h6 className="font-semibold">{subscriber?.fullName}</h6>
                            <p className="text-sm text-gray-300">
                                {subscriber?.subscriberCount}{" "}
                                {subscriber?.subscriberCount === 1 ? "Subscriber" : "Subscribers"}
                            </p>
                        </div>
                    </div>
                    <div className="block">
                        <button onClick={() => handleSubscribe(subscriber?._id)} className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#08e6f5] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                            <span className="inline-block w-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                    />
                                </svg>
                            </span>
                            <span className="group-focus/btn">Subscribed</span>
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SubscribedCard