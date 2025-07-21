import React, { useState } from "react";
import userService from "../../services/userService";  // Adjust path if needed


const Demo1 = () => {
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            console.log(form);

            const res = await userService.login(form);
            setSuccessMsg("User login successfully!");
            console.log(res);

            // Set token in Authorization header for future requests
            const token = res.data?.accessToken || res?.data
            console.log(token);

            if (token) {
                localStorage.setItem('token', token);
            }

            setForm({
                email: "",
                username: "",
                password: "",
            });
        } catch (err) {
            console.error(err);
            setErrorMsg(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-2 mb-2 border rounded"
                />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full p-2 mb-2 border rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-2 mb-2 border rounded"
                />

                {errorMsg && <p className="text-red-600">{errorMsg}</p>}
                {successMsg && <p className="text-green-600">{successMsg}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>
            <div className="flex justify-center">
                <button onClick={async () => {
                    const res = await userService.logout();
                    localStorage.removeItem('token');

                    console.log(res);
                }} className="text-red-600">Logout</button>

                <button onClick={async () => {
                    const res = await userService.getCurrentUser()
                    console.log(res);
                }} className="text-green-600 ml-10">Current-User</button>
            </div>
        </>
    );
};

export default Demo1;