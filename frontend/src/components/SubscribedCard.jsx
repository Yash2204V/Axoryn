import { useGetSubscribedChannelsQuery } from '../services/subscription/subscriptionApi';

function SubscribedCard({ data }) {

    const {data: subscribersData } = useGetSubscribedChannelsQuery(data, { skip: !data});
    const subscribers = subscribersData?.data || [];    

    return (
        <>
            {subscribers?.map((subscriber, idx) => (
                <div key={subscriber._id || idx} className="flex w-full justify-between">
                    <div className="flex items-center gap-x-2">
                    <div className="h-14 w-14 shrink-0">
                        <img
                        src={subscriber?.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
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
                    <button className="group/btn px-3 py-2 text-black bg-[#08e6f5] focus:bg-white">
                        <span className="group-focus/btn:hidden">Subscribed</span>
                        <span className="hidden group-focus/btn:inline">Subscribe</span>
                    </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SubscribedCard