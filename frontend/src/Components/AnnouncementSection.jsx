import React from 'react';
import Carousel from './Carousel/Index.jsx';
const AnnouncementSection = ({ title, annonces, handleFavoritsClick, handleDetailsClick }) => {
    return (
        <>
            <div className="border-b-2 border-b-yellow-500 m-2 mb-6 p-2 flex items-center justify-between">
                <h2 className="text-4xl text-black font-serif font-medium pt-5">{title}</h2>
                <a href='/AllAnnounces' className="bg-yellow-500 text-white px-5 font-semibold pt-1 pb-2 rounded-lg">
                    Toutes Les annonces
                </a>
            </div>

            {annonces.length > 0 ? (
                <div className="overflow-x-auto whitespace-nowrap py-4">
                    <div className="inline-flex gap-5">
                        {annonces.map((annonce, index) => (
                            <div
                                key={index}
                                className="card relative bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer w-80 flex-shrink-0"
                            >
                                <Carousel images={annonce.images} isVip={annonce.type === 'vip'} />

                                <div className="p-5"
                                    onClick={() => handleDetailsClick(annonce.id)}
                                >
                                    <h2 className="text-xl font-semibold text-gray-800">{annonce.title}</h2>
                                    <div className="flex items-center">
                                        <svg
                                            className="w-5 h-5 bg-yellow-600 px-1 py-1 dark:text-white rounded-full"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                            />
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.12.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                                            />
                                        </svg>
                                        <p className="text-md font-serif font-medium ml-1 text-gray-500">
                                            {annonce.location}
                                        </p>
                                    </div>

                                    <div className="w-full h-[1px] bg-gray-500 my-2"></div>

                                    <p className="text-gray-500 font-serif font-medium my-2">
                                        {annonce.sub_name}
                                    </p>

                                    <div className="flex justify-between items-center gap-x-1">
                                        <div
                                            id="details"
                                            className="border-gray-400 border px-1 py-1 rounded-full hover:border-yellow-500 duration-500"
                                        >
                                            <svg
                                                className="w-5 h-5 text-gray-900 hover:text-yellow-500 duration-300"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                                />
                                                <path
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                            </svg>
                                        </div>
                                        <div
                                            id="favorits"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent card click from triggering when clicking favorite
                                                handleFavoritsClick(annonce.id);
                                            }}
                                            className={`border border-gray-400 px-1 py-1 rounded-full cursor-pointer transition duration-300 ${annonce.isFavorited ? 'bg-yellow-500 hover:bg-white' : 'text-gray-900'
                                                } hover:text-yellow-500 hover:border-yellow-500`}
                                        >
                                            <svg
                                                className={`w-5 h-5 duration-300 ${annonce.isFavorited ? 'text-white' : 'text-gray-900'
                                                    } hover:text-yellow-500`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center w-full text-gray-700 dark:text-gray-200">
                    No {title} available
                </p>
            )}
        </>
    );
};

export default AnnouncementSection;
