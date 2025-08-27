import { useState } from 'react'
import { Aside, PlaylistCard, SubscribedCard, VideoCard } from '../../components'
import { useGetUserChannelProfileQuery } from '../../services/user/userApi';
import { useParams } from 'react-router-dom';
import { useToggleSubscriptionMutation } from '../../services/subscription/subscriptionApi';
import TweetCard from '../../components/TweetCard';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function Channel() {
  const { username } = useParams();
  const [switchState, setSwitchState] = useState(
    () => localStorage.getItem('switchState') || 'videos'
  );
  
  const { data, refetch } = useGetUserChannelProfileQuery(username);
  const channel = data?.data;

  const [toggleSubscription] = useToggleSubscriptionMutation();

  useEffect(() => {
    localStorage.setItem('switchState', switchState);
  }, [switchState]);

  const handleSubscribe = () => {
    toggleSubscription(channel?._id).unwrap();
    toast.success(channel?.isSubscribed ? "Unsubscribed successfully" : "Subscribed successfully");
    refetch();
  }

  return (
    <>
      <div>
          <link
            rel="preload"
            as="image"
            href={channel?.avatar}
          />
          <link
            rel="preload"
            as="image"
            href={channel?.coverImage}
          />
      </div>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Aside />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
            <div className="relative min-h-[150px] w-full pt-[16.28%]">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={channel?.coverImage || "https://images.pexels.com/photos/1092424/pexels-photo-1092424.jpeg?auto=compress"}
                  alt="cover-photo"
                />
              </div>
            </div>
            <div className="px-4 pb-4">
              <div className="flex flex-wrap gap-4 pb-4 pt-6">
                <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                  <img
                    src={channel?.avatar || "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    alt={channel?.username || "channel-avatar"}
                    className="h-full w-full"
                  />
                </span>
                <div className="mr-auto inline-block">
                  <h1 className="font-bolg text-xl">{channel?.fullName}</h1>
                  <p className="text-sm text-gray-400">@{channel?.username}</p>
                  <p className="text-sm text-gray-400">
                    {channel?.subscribersCount} Subscribers&nbsp;·&nbsp;{channel?.channelsSubscribedToCount} Subscribed
                  </p>
                </div>
                <div className="inline-block">
                  <div className="inline-flex min-w-[145px] justify-end">
                    <button onClick={handleSubscribe} className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#08e6f5] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
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
                      {channel?.isSubscribed ? (<span className="group-focus/btn">Subscribed</span>) : (<span className="group-focus/btn">Subscribe</span>)}
                    </button>
                  </div>
                </div>
              </div>
              <ul className="no-scrollbar flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
                <li className="w-full">
                  <button
                    onClick={() => setSwitchState('videos')}
                    value={'videos'}
                    className={`w-full border-b-2 px-3 py-1.5 
                      ${switchState === 'videos' 
                        ? 'border-[#08e6f5] text-[#08e6f5] bg-white' 
                        : 'border-transparent text-gray-400'}`}
                  >
                    Videos
                  </button>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => setSwitchState('playlists')}
                    value={'playlists'}
                    className={`w-full border-b-2 px-3 py-1.5 
                      ${switchState === 'playlists' 
                        ? 'border-[#08e6f5] text-[#08e6f5] bg-white' 
                        : 'border-transparent text-gray-400'}`}
                  >
                    Playlists
                  </button>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => setSwitchState('tweets')}
                    value={'tweets'}
                    className={`w-full border-b-2 px-3 py-1.5 
                      ${switchState === 'tweets' 
                        ? 'border-[#08e6f5] text-[#08e6f5] bg-white' 
                        : 'border-transparent text-gray-400'}`}
                  >
                    Tweets
                  </button>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => setSwitchState('subscribed')}
                    value={'subscribed'}
                    className={`w-full border-b-2 px-3 py-1.5 
                      ${switchState === 'subscribed' 
                        ? 'border-[#08e6f5] text-[#08e6f5] bg-white' 
                        : 'border-transparent text-gray-400'}`}
                  >
                    Subscribed
                  </button>
                </li>
              </ul>
              <div className="">
                  {/* Videos, Playlists, Tweet, Subscribed Conditional Rendering Mapping Here */}
                  { switchState === "videos" && 
                    <VideoCard data={channel?._id} /> 
                  }
                  {switchState === "tweets" &&
                    <TweetCard data={channel?._id} />
                  }
                  {switchState === "playlists" && 
                    <PlaylistCard data={channel?._id} />
                  }
                  {switchState === "subscribed" && 
                    <SubscribedCard data={channel?._id} />
                  }
              </div>
            </div>
          </section>
        </div>
      </div>
    </>

  )
}

export default Channel