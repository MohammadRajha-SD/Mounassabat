import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom'; // Import the navigation hook

const Carousel = ({ images, isVip = false, width = '320px', height = '250px', id=null }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate(); // Initialize the navigation hook

    const goToPreviousSlide = () => {
        setCurrentSlide((prev) => {
            const prevSlide = prev === 0 ? images.length - 1 : prev - 1;
            return prevSlide;
        });
    };

    const goToNextSlide = () => {
        setCurrentSlide((prev) => {
            const nextSlide = prev === images.length - 1 ? 0 : prev + 1;
            return nextSlide;
        });
    };

    const handleImageClick = () => {
        navigate(`/AnnouncesDetails/${id}`);
    };

    return (
        <div className="relative" style={{ width, height }}>
            <div className="relative w-full h-full rounded-lg overflow-hidden" data-carousel="static">
                <div className="w-full h-full">
                    {images.length > 0 && (
                        <img
                            src={`https://monassabatmaroc.online/${images[currentSlide]}`}
                            className="w-full h-full object-cover cursor-pointer"
                            alt={`Slide ${currentSlide}`}
                            onClick={handleImageClick} // Add click event to the image
                        />
                    )}

                    {/* VIP Badge */}
                    {isVip && (
                        <div className="absolute top-5 left-5 bg-yellow-500 text-white flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-full shadow-lg">
                            <StarIcon className="w-5 h-5" />
                            <span>VIP</span>
                        </div>
                    )}
                </div>

                {/* Carousel Controls */}
                {images.length > 1 && (
                    <>
                        {/* Indicators */}
                        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
                            {images.map((_, slideIndex) => (
                                <button
                                    key={slideIndex}
                                    type="button"
                                    className={`w-3 h-3 rounded-full transition ${
                                        slideIndex === currentSlide ? 'bg-yellow-600' : 'bg-gray-300'
                                    }`}
                                    onClick={() => setCurrentSlide(slideIndex)}
                                />
                            ))}
                        </div>

                        {/* Previous Button */}
                        <button
                            type="button"
                            className="absolute top-1/2 left-3 -translate-y-1/2 z-40 p-2 bg-yellow-600 rounded-full hover:bg-yellow-400 focus:outline-none transition"
                            onClick={goToPreviousSlide}
                        >
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Next Button */}
                        <button
                            type="button"
                            className="absolute top-1/2 right-3 -translate-y-1/2 z-40 p-2 bg-yellow-600 rounded-full hover:bg-yellow-400 focus:outline-none transition"
                            onClick={goToNextSlide}
                        >
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Carousel;
