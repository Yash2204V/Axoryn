import React, { useState } from 'react'
import { Input, Button, Logo } from "../../components"
import { useNavigate, Link } from 'react-router-dom'
import { useRegisterUserMutation } from '../../services/user/userApi'

function Register() {
    const navigate = useNavigate()
    const [registerUser, { isLoading, error }] = useRegisterUserMutation();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
        avatar: null,
        coverImage: null,
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0]
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email || !formData.username || !formData.password) {
            return; 
        }

        if (!formData.avatar) {
            return;
        }

        const data = new FormData();
        for(let key in formData) {
            if(formData[key]){
                data.append(key, formData[key]);
            }
        }

        try {
            await registerUser(data).unwrap();
            
            setFormData({
                fullName: "",
                email: "",
                username: "",
                password: "",
                avatar: null,
                coverImage: null,
            });
            
            navigate('/login');
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="h-screen overflow-y-auto bg-[#121212] text-white">
            <div className="mx-auto my-8 flex w-full max-w-sm flex-col px-4">
                <Logo width={20} />
                <hr className="mb-6 border-transparent" />
                {error && (
                    <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-sm">
                        {error?.data?.message || error?.message || 'Registration failed'}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <Input 
                        label={'Fullname*'} 
                        type={'text'} 
                        name={'fullName'}
                        onChange={handleChange} 
                        value={formData.fullName} 
                        placeholder={'Enter your Fullname'} 
                        required
                    />
                    <Input 
                        label={'Username*'} 
                        type={'text'} 
                        name={'username'}
                        onChange={handleChange} 
                        value={formData.username} 
                        placeholder={'Enter your Username'} 
                        required
                    />
                    <Input 
                        label={'Avatar*'} 
                        type={'file'} 
                        name={'avatar'}
                        onChange={handleChange} 
                        placeholder={'Upload your Avatar'} 
                        accept="image/*"
                        required
                    />
                    <Input 
                        label={'Cover Image'} 
                        type={'file'} 
                        name={'coverImage'}
                        onChange={handleChange} 
                        placeholder={'Upload your Cover Image (Optional)'} 
                        accept="image/*"
                    />
                    <Input 
                        label={'Email*'} 
                        type={'email'} 
                        name={'email'}
                        onChange={handleChange} 
                        value={formData.email} 
                        placeholder={'Enter your email'} 
                        required
                    />
                    <Input 
                        label={'Password*'} 
                        type={'password'} 
                        name={'password'}
                        onChange={handleChange} 
                        value={formData.password} 
                        placeholder={'Enter your password'} 
                        required
                        minLength={6}
                    />
                    <Button 
                        type={'submit'} 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                </form>
                
                <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link 
                        to="/login" 
                        className="text-[#08e6f5] hover:underline font-semibold"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Register