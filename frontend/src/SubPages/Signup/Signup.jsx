import { useState } from "react";
import axios from "axios";
import { userAuthStore } from "../../authstore/Authstore";
const Signup = () => {
    const { signup }=userAuthStore()
    const [formData, setFormData] = useState({
        userName: "",
        organizationName: "",
        password: "",
        phoneNumber: "",
        email: "",
        location: "",
        avatar: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, avatar: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            // const res = await axios.post("http://localhost:3000/user/register", data, {
            //     headers: { "Content-Type": "multipart/form-data" },
            // });
            // alert(res.data.message);
            await signup(data)
        } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-4">
            <div className="bg-white shadow-2xl rounded-xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden border border-white/20">
                {/* Left Side - Vector Image (Hidden on mobile) */}
                <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center p-8">
                    <div className="text-center ">
                        <img
                            src="https://res.cloudinary.com/dv9noi4np/image/upload/v1743167601/dp3lifdz7r5nlmpz8dkz.png"
                            alt="Signup"
                            className="max-w-full h-auto mb-6"
                        />
                        <h3 className="text-2xl font-bold text-white mb-2">Join Our Community</h3>
                        <p className="text-white/80">Create your account and get started with our platform</p>
                    </div>
                </div>

                {/* Right Side - Signup Form */}
                <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-10">
                    <div className="mb-8 text-center ">
                        <h2 className="text-3xl font-bold text-gray-800  mt-4 mb-2">Create an Account</h2>
                        <p className="text-gray-600">Fill in your details to get started</p>
                    </div>
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="space-y-5 mb-2 p-3" >
                            <div>
                                <input
                                    className="w-full px-4 py-3 mb-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    type="text"
                                    name="userName"
                                    placeholder="User Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    className="w-full px-4 py-3 rounded-lg mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    type="text"
                                    name="organizationName"
                                    placeholder="Organization Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    className="w-full px-4 py-3 rounded-lg mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    className="w-full px-4 py-3 rounded-lg mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    className="w-full px-4 py-3 rounded-lg mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    className="w-full px-4 py-3 rounded-lg border mb-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="hidden md:block">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture (Optional)</label>
                                <input
                                    className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                                    type="file"
                                    name="avatar"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                            <button
                                className="w-full bg-gradient-to-r  from-blue-500 to-purple-500 text-white py-3 rounded mt-3   hover:opacity-90 transition font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 md:transition-all duration-200"
                                type="submit"
                            >
                                Register Now
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account? <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Sign in</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;