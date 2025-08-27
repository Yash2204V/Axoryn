import { useState } from "react";
import { useChangeCurrentPasswordMutation } from "../../services/user/userApi";
import toast, { Toaster } from "react-hot-toast";

function Password({ refetchUser }) {

    const [form, setForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [changeCurrentPassword] = useChangeCurrentPasswordMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            toast.error("New password & Confirm password don't match!");
            return;
        }

        try {
            await changeCurrentPassword({
                oldPassword: form.oldPassword,
                newPassword: form.newPassword,
                confirmPassword: form.confirmPassword
            }).unwrap();

            setForm({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

            toast.success("Password changed successfully!");
            refetchUser();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to change password!");
        }
    };

    return (

        <form onSubmit={handleChangePassword} className="flex flex-wrap justify-center gap-y-4 py-4">
            <div className="w-full sm:w-1/2 lg:w-1/3">
                <h5 className="font-semibold">Password</h5>
                <p className="text-gray-300">
                    Please enter your current password to change your password.
                </p>
            </div>
            <div className="w-full sm:w-1/2 lg:w-2/3">
                <div className="rounded-lg border">
                    <div className="flex flex-wrap gap-y-4 p-4">
                        <div className="w-full">
                            <label className="mb-1 inline-block" htmlFor="oldPassword">
                                Current password
                            </label>
                            <input
                                type="password"
                                id="oldPassword"
                                name="oldPassword"
                                value={form.oldPassword}
                                onChange={handleChange}
                                className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                placeholder="Current password"
                            />
                        </div>
                        <div className="w-full">
                            <label className="mb-1 inline-block" htmlFor="newPassword">
                                New password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={form.newPassword}
                                onChange={handleChange}
                                className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                placeholder="New password"
                            />
                            <p className="mt-0.5 text-sm text-gray-300">
                                {form.newPassword.length < 8 ? "Password must be at least 8 characters long." : "Good password!"}
                            </p>
                        </div>
                        <div className="w-full">
                            <label className="mb-1 inline-block" htmlFor="confirmPassword">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                placeholder="Confirm password"
                            />
                        </div>
                    </div>
                    <hr className="border border-gray-300" />
                    <div className="flex items-center justify-end gap-4 p-4">
                        <button type="submit" className="inline-block bg-[#08e6f5] px-3 py-1.5 text-black">
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        </form>

    )
}

export default Password