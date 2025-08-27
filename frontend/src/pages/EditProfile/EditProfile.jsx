import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { useGetUserChannelProfileQuery, useUpdateUserAvatarMutation, useUpdateUserCoverImageMutation } from "../../services/user/userApi";
import { Aside, Password, Personal } from "../../components";
import toast from "react-hot-toast";


function EditProfile() {

    const { username } = useParams();
    const [switchState, setSwitchState] = useState('personal');

    const { data, refetch } = useGetUserChannelProfileQuery(username);
    const channel = data?.data;

    const [updateUserAvatar] = useUpdateUserAvatarMutation();
    const [updateUserCoverImage] = useUpdateUserCoverImageMutation();

    const handleChangeAvatar = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return;
    
            const formData = new FormData();
            formData.append("avatar", file);
    
            await updateUserAvatar(formData).unwrap();
            toast.success("Avatar updated successfully!");
            refetch();
        } catch (error) {
            toast.error(`Failed to update the avatar! ${error?.message || ""}`);
        }
    };

    const handleChangeCoverImage = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return;
    
            const formData = new FormData();
            formData.append("coverImage", file);
    
            await updateUserCoverImage(formData).unwrap();
            toast.success("Cover image updated successfully!");
            refetch();
        } catch (error) {
            toast.error(`Failed to update the cover image! ${error?.message || ""}`);
        }
    };


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
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <input
                                    type="file"
                                    name="coverImage"
                                    id="coverImage"
                                    className="hidden"
                                    onChange={handleChangeCoverImage}
                                />
                                <label htmlFor="coverImage" className="inline-block h-10 w-10 cursor-pointer rounded-lg bg-white/60 p-1 text-[#08e6f5] hover:bg-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                    </svg>
                                </label>
                            </div>
                        </div>
                        <div className="px-4 pb-4">
                            <div className="flex flex-wrap gap-4 pb-4 pt-6">
                                <div className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                                    <img
                                        src={channel?.avatar || "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                        alt={channel?.username || "channel-avatar"}
                                        className="h-full w-full"
                                    />
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <input
                                            type="file"
                                            name="avatar"
                                            id="avatar"
                                            className="hidden"
                                            onChange={handleChangeAvatar}
                                        />
                                        <label htmlFor="avatar" className="inline-block h-8 w-8 cursor-pointer rounded-lg bg-white/60 p-1 text-[#08e6f5] hover:bg-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                            </svg>
                                        </label>
                                    </div>
                                </div>
                                <div className="mr-auto inline-block">
                                    <h1 className="font-bolg text-xl">{channel?.fullName}</h1>
                                    <p className="text-sm text-gray-400">@{channel?.username}</p>
                                </div>
                                <div className="inline-block">

                                    <Link to={`/mychannel/${channel?.username}`} className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#08e6f5] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                                        View channel
                                    </Link>
                                </div>
                            </div>
                            <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
                                <li className="w-full">
                                    <button
                                        onClick={() => setSwitchState('personal')}
                                        className={`w-full border-b-2 px-3 py-1.5 
                                        ${switchState === 'personal'
                                                ? 'border-[#08e6f5] text-[#08e6f5] bg-white'
                                                : 'border-transparent text-gray-400'}`}>
                                        Personal Information
                                    </button>
                                </li>
                                <li className="w-full">
                                    <button
                                        onClick={() => setSwitchState('password')}
                                        className={`w-full border-b-2 px-3 py-1.5 
                                        ${switchState === 'password'
                                                ? 'border-[#08e6f5] text-[#08e6f5] bg-white'
                                                : 'border-transparent text-gray-400'}`}>
                                        Change Password
                                    </button>
                                </li>
                            </ul>
                            <div className="">
                                {/* Videos, Playlists, Tweet, Subscribed Conditional Rendering Mapping Here */}
                                {switchState === "personal" &&
                                    <Personal refetchUser={refetch} />
                                }
                                {switchState === "password" &&
                                    <Password refetchUser={refetch} />
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default EditProfile