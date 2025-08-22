import { useState } from "react";
import { Button, Input, Logo } from "../../components";
import { useNavigate, Link } from "react-router-dom";
import { useLoginUserMutation } from "../../services/user/userApi";

function Login() {
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submission
        
        // Basic validation - at least username/email and password required
        if (!formData.password || (!formData.username && !formData.email)) {
            return; // Let browser handle required field validation
        }
        
        try {
            const response = await loginUser(formData).unwrap();
            
            // Store token if provided - backend sends it in response.data.accessToken
            if (response?.data?.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
            }
            
            // Clear form
            setFormData({
                username: "",
                email: "",
                password: ""
            });
            
            // Navigate to home
            navigate('/');
            
        } catch (err) {
            // Error is automatically handled by RTK Query and displayed in the UI
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="h-screen overflow-y-auto bg-[#121212] text-white">
            <div className="mx-auto my-8 flex w-full max-w-sm flex-col px-4">
                <Logo width={20} />
                <hr className="mb-6 border-transparent" />
                {error && (
                    <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-sm">
                        {error?.data?.message || error?.message || 'Login failed'}
                    </div>
                )}
                {/* )} */}

                <form onSubmit={handleSubmit}>
                    <Input 
                        label={'Username'} 
                        type={'text'} 
                        name={'username'}
                        onChange={handleChange}
                        value={formData.username} 
                        placeholder={'Enter your username'} 
                    />
                    <Input 
                        label={'Email'} 
                        type={'email'} 
                        name={'email'}
                        onChange={handleChange}
                        value={formData.email} 
                        placeholder={'Enter your email'} 
                    />
                    <Input 
                        label={'Password*'} 
                        type={'password'} 
                        name={'password'}
                        onChange={handleChange}
                        value={formData.password} 
                        placeholder={'Enter your password'} 
                        required
                    />
                    <Button 
                        type={'submit'}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link 
                        to="/register" 
                        className="text-[#08e6f5] hover:underline font-semibold"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login