import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../hooks/userStore';

function Home() {
    const nav = useNavigate();
    const { user } = useUserStore();

    return (
        <div className="flex flex-col justify-between">
            <div className="relative w-full min-h-screen">
                <div
                    className="hero min-h-screen"
                    style={{
                        backgroundImage:
                            'url(https://i.pinimg.com/736x/c9/67/68/c96768a9b806950aee4547436620b5ec.jpg)',
                    }}
                >
                    <div className="hero-overlay bg-opacity-10"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-2x1 mx-auto flex">
                            <div className="avatar w-1/4">
                                <div className="w-47 h-65 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full relative bg-pink-100 border border-pink-100">
                                    <img
                                        className="w-16 md:w-32 lg:w-48 border border-pink-100 rounded-full"
                                        src="https://www.dummies.com/wp-content/uploads/real-estate-license-agent.jpg"
                                        alt="Avatar"
                                    />
                                </div>
                            </div>
                            <div className="w-2/4 min-h-screen flex justify-center rounded-lg items-center bg-pink-100">
                                <div className="container p-11 mx-1 my-1 min-h-screen bg-white rounded-lg shadow-lg">
                                    <h1 className="font-montserrat text-5xl font-semibold mb-6 text-center text-black">
                                        BUYING or SELLING a home?
                                    </h1>
                                    <h2 className="font-cursive text-4xl mb-4 text-center text-black">
                                        Let's work together!
                                    </h2>
                                    <p className="font-cursive text-lg mb-8 text-center text-gray-600">
                                        Buying or selling a home can be a stressful process. I've got YOUR back!
                                        Dedicated, responsive & authentic. You can rely on me to get you the best
                                        possible result.
                                    </p>
                                    <img
                                        className="logo-home"
                                        src="https://christopher1farwell.files.wordpress.com/2013/05/chrisroof.png"
                                        alt="Logo"
                                    />
                                    <p className="font-montserrat text-4xl mb-4 text-center text-black">
                                        Cindie Perry
                                    </p>
                                    <p className="font-cursive text-lg mb-4 text-center text-gray-600">
                                        Real Estate Agent
                                    </p>
                                    <div className="flex justify-center space-x-4">
                                        <p className="font-cursive text-lg mb-4 text-black">
                                            Phone: (123) 456-7890
                                        </p>
                                        <p className="font-cursive text-lg mb-8 text-black">
                                            Email: cindie@example.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
