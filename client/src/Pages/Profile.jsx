import React from 'react';
import useUserStore from '../hooks/userStore';
import { useNavigate } from 'react-router';

function Profile() {
    const { user } = useUserStore();
    const nav = useNavigate();

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-pink-200 to-pink-700">
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        'url(https://www.tileclub.com/cdn/shop/files/roman-flower-blue-celeste-marble-mosaic-tile-kitchen-new-colorway.jpg?v=1684529970)',
                }}
            >
                <div className="max-w-md mx-auto p-4 mt-8 bg-white rounded-lg shadow-lg border border-gray-300">
                    <h2 className="text-3xl text-center font-bold text-pink-500 mb-4">Hello Future Homeowner!</h2>

                    <div className="mb-4 text-black">
                        <strong className="text-lg">Username:</strong> {user.username}
                    </div>
                    <div className="mb-4 text-black">
                        <strong className="text-lg">Email:</strong> {user.email}
                    </div>
                    <div className="mb-4 text-black">
                        <strong className="text-lg">First Name:</strong> {user.first_name}
                    </div>
                    <div className="mb-4 text-black">
                        <strong className="text-lg">Last Name:</strong> {user.last_name}
                    </div>
                    <div className="mb-4 text-black">
                        <strong className="text-lg">Buyer:</strong> {user.buyer ? 'Yes' : 'No'}
                    </div>
                    <div className="mb-4 text-black">
                        <strong className="text-lg">Age:</strong> {user.age}
                    </div>
                    <div className="mb-4 text-black">
                        <strong className="text-lg">City:</strong> {user.city}
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => nav('/EditProfile')}
                            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                            Edit Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
