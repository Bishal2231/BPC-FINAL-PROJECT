    import { useState } from "react";
import axios from "axios";
    import { userAuthStore } from "../../authstore/Authstore";

    const Login = () => {
        const [formData, setFormData] = useState({ email: "", password: "" });

        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
        const { setToken } = userAuthStore()
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const res = await axios.post("http://localhost:3000/user/login", { email:formData.email,password:formData.password });
                console.log(res)
                setToken(res.data.token);  // Store token in Zustand

                alert("Login Successful!");
            } catch (error) {
                console.error(error);
                alert("Invalid credentials");
            }
        };

        return (
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-7">
                <div className="bg-white shadow-2xl gap-x-2  rounded-xl flex flex-col md:flex-row overflow-hidden border border-white/20">
                    {/* Left Side - Vector Image (Hidden on mobile) */}
                    <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center p-12">
                        <div className="text-center mx-auto max-w-xs">
                            <img
                                src="https://res.cloudinary.com/dv9noi4np/image/upload/v1743168727/xhywjutc2dwfilbptnzl.svg"
                                alt="Login Illustration"
                                className="w-full h-auto mb-10"
                            />
                            <h3 className="text-2xl font-bold text-white mb-3">Welcome Back!</h3>
                            <p className="text-white/80 text-sm">Login to access your dashboard and continue your journey</p>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center p-8 sm:p-10 md:p-12 gap-y-2">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Login to Your Account</h2>
                            <p className="text-gray-600">Enter your credentials to continue</p>
                        </div>
                        <form className="w-full max-w-md mx-auto">
                            <div className="">
                                <div>
                                    <input
                                        className="w-full px-4 py-3 mb-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        className="w-full px-4 py-3  mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center mb-3">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <button
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded hover:opacity-90 transition font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                        <div className="mt-6 text-center text-sm text-gray-600">
                            Don't have an account? <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Sign up</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default Login;
