import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const UserPage = () => {
    const [userState, setUserState] = useState(false); // false = not logged in

    // Dummy user data
    const user = {
        username: 'bishal_adhikari',
        orgName: 'TechNepal Pvt. Ltd.',
        email: 'bishal@example.com',
        phone: '+977-9812345678',
        location: 'Kathmandu, Nepal',
        image: 'https://i.pravatar.cc/150?img=68', // you can replace with real URL
        expiry: '2025-12-31',
    };

    return (
        <div className="min-h-screen flex mt-5  justify-center  px-4">
            <div className="p-6  rounded-xl  w-full max-w-sm text-center">
                {!userState ? (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Welcome!</h2>
                        <Link to="/login" className='text-white'>
                            <button
                                onClick={() => setUserState(true)}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg mb-3 hover:bg-blue-600 transition"
                            >
                                Login
                            </button>
                        </Link>
                        <Link to="/signup" className='text-white'>
                            <button
                                onClick={() => setUserState(true)}
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                Sign Up
                            </button>
                        </Link>
                    </>
                ) : (
                    <div className="max-w-sm w-full      p-4 bg-white rounded-xl shadow-md">
                        <img
                            src={user.image}
                            alt="User"
                            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-200 shadow"
                        />
                        <h2 className="text-xl font-bold text-center text-gray-800 mb-1">@{user.username}</h2>
                        <p className="text-sm text-center text-gray-600 mb-2">{user.orgName}</p>
                        <div className="text-sm text-gray-700 space-y-1 mb-4">
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <p><strong>Location:</strong> {user.location}</p>
                            <p><strong>Software Expiry:</strong> {user.expiry}</p>
                        </div>
                        <button
                            onClick={() => setUserState(false)}
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>

                )}
            </div>
        </div>
    );
};

export default UserPage;
