import { useState } from 'react';

const Carousel = ({ images, height = '250px' }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToPreviousSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative">
            <div className="relative rounded-lg overflow-hidden" data-carousel="static">
                <div className={`w-full h-[${height}]`}>
                    {images.length > 0 && (
                        <img
                            src={`http://127.0.0.1:8000/${images[currentSlide]}`}
                            className="w-full h-full object-cover"
                            alt={`Slide ${currentSlide}`}
                        />
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
                                    className={`w-3 h-3 rounded-full transition ${slideIndex === currentSlide ? 'bg-yellow-600' : 'bg-gray-300'}`}
                                    onClick={() => setCurrentSlide(slideIndex)}
                                />
                            ))}
                        </div>

                        {/* Previous/Next Buttons */}
                        <button
                            type="button"
                            className="absolute top-1/2 left-3 transform -translate-y-1/2 z-40 p-2 bg-yellow-600 rounded-full hover:bg-yellow-400 focus:outline-none transition"
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
                        <button
                            type="button"
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 z-40 p-2 bg-yellow-600 rounded-full hover:bg-yellow-400 focus:outline-none transition"
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
