import { useEffect, useState } from 'react'
import { Aside, PlaylistCard, SubscribedCard, TweetCard, VideoCard } from '../../components'
import { useGetUserChannelProfileQuery } from '../../services/user/userApi';
import { Link, useLocation, useParams } from 'react-router-dom';

function MyChannel() {
  const { username } = useParams();
  const location = useLocation();
  const [switchState, setSwitchState] = useState('videos');
  
  const { data } = useGetUserChannelProfileQuery(username);
  const channel = data?.data;

  useEffect(() => {
    if (location.state?.switchState) {
      setSwitchState(location.state.switchState);
    }
  }, [location.state]);

  return (
    <div>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Aside />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
            <div className="relative min-h-[150px] w-full pt-[16.28%]">
              <div className="absolute inset-0 overflow-hidden">
                <img src={channel?.coverImage} alt="cover-photo" />
              </div>
            </div>
            <div className="px-4 pb-4">
              <div className="flex flex-wrap gap-4 pb-4 pt-6">
                <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                  <img
                    src={channel?.avatar}
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
                    <Link to={`/mychannel/${channel?.username}/edit`} className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#08e6f5] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                      <span className="inline-block w-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                      </span>
                      Edit
                    </Link>
                </div>
              </div>
              <ul className="no-scrollbar flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
                <li className="w-full">
                  <button
                    onClick={() => setSwitchState('videos')}
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
                    <VideoCard data={channel?._id} addVideoBtn={true} />
                  }
                  {switchState === "tweets" &&
                    <TweetCard data={channel?._id} addTweet={true} />
                  }
                  {switchState === "playlists" && 
                    <PlaylistCard data={channel?._id} editAndDelete={true} />
                  }
                  {switchState === "subscribed" && 
                    <SubscribedCard data={channel?._id} />
                  }
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default MyChannel