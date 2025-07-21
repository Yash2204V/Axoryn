import React, { useState } from "react";
import userService, { UserService } from "../../services/userService";  // Adjust path if needed


const Demo = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData();
    for (let key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }
    
    try {
      console.log({formData});
      const res = await userService.registerUser({formData});
      setSuccessMsg("User registered successfully!");
      console.log(res);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register</h2>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />

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

      <label className="block mb-2">Avatar:</label>
      <input
        type="file"
        name="avatar"
        accept="image/*"
        onChange={handleChange}
        className="mb-4"
      />

      <label className="block mb-2">Cover Image:</label>
      <input
        type="file"
        name="coverImage"
        accept="image/*"
        onChange={handleChange}
        className="mb-4"
      />

      {errorMsg && <p className="text-red-600">{errorMsg}</p>}
      {successMsg && <p className="text-green-600">{successMsg}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Demo;
