import { useEffect, useState } from 'react';
import Footer from '../Footer.jsx';
import HeaderAnnounces from './HeaderAnnounces.jsx';
import axios from 'axios';

const Annonces = () => {
    const [annonces, setAnnonces] = useState([]);
    const [currentSlides, setCurrentSlides] = useState([]);

    useEffect(() => {
        fetchAllAnnonces();
    }, []);

    const fetchAllAnnonces = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            const response = await axios.get('http://127.0.0.1:8000/api/getMyAnnonces', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status == 'success') {
                setAnnonces(response.data.annonces);
            }
        } catch (error) {
            if (error.response) {
                console.error('Failed to fetch annonces:', error.response.statusText, error.response.data);
            } else if (error.request) {
                console.error('No response received from server:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    useEffect(() => {
        const initialSlides = annonces.map(() => 0);
        setCurrentSlides(initialSlides);
    }, [annonces]);

    const goToPreviousSlide = (index) => {
        if (annonces[index].image.length > 0) {
            const prevSlide = (currentSlides[index] - 1 + annonces[index].image.length) % annonces[index].image.length;
            setCurrentSlides(prevSlides => [...prevSlides.slice(0, index), prevSlide, ...prevSlides.slice(index + 1)]);
        }
    };

    const goToNextSlide = (index) => {
        if (annonces[index].image.length > 0) {
            const nextSlide = (currentSlides[index] + 1) % annonces[index].image.length;
            setCurrentSlides(prevSlides => [...prevSlides.slice(0, index), nextSlide, ...prevSlides.slice(index + 1)]);
        }
    };

    return (
        <div>
            <HeaderAnnounces annc_length={annonces.length} />

            <div className="container mx-auto px-4 sm:px-8">
                {annonces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
                        {annonces.map((annonce, index) => (
                            <div key={annonce.id} className="card relative bg-white shadow-lg rounded-lg overflow-hidden">
                                {/* Carousel */}
                                <div className="relative">
                                    <div id={`carousel-${index}`} className="relative rounded-lg overflow-hidden" data-carousel="static">
                                        <div className="w-full h-[250px]">
                                            {annonce.image.length > 0 && (
                                                <img
                                                    src={`http://127.0.0.1:8000/${annonce.image[currentSlides[index]]}`}
                                                    className="w-full h-full object-cover"
                                                    alt={`Slide ${currentSlides[index]}`}
                                                />
                                            )}
                                        </div>

                                        {/* Carousel Controls */}
                                        {annonce.image.length > 1 && (
                                            <>
                                                {/* Indicators */}
                                                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
                                                    {annonce.image.map((_, slideIndex) => (
                                                        <button
                                                            key={slideIndex}
                                                            type="button"
                                                            className={`w-3 h-3 rounded-full transition ${slideIndex === currentSlides[index] ? 'bg-yellow-600' : 'bg-gray-300'
                                                                }`}
                                                            onClick={() =>
                                                                setCurrentSlides((prevSlides) => [
                                                                    ...prevSlides.slice(0, index),
                                                                    slideIndex,
                                                                    ...prevSlides.slice(index + 1),
                                                                ])
                                                            }
                                                        />
                                                    ))}
                                                </div>

                                                {/* Previous/Next Buttons */}
                                                <button
                                                    type="button"
                                                    className="absolute top-1/2 left-3 transform -translate-y-1/2 z-40 p-2 bg-yellow-600 rounded-full hover:bg-yellow-400 focus:outline-none transition"
                                                    onClick={() => goToPreviousSlide(index)}
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
                                                    onClick={() => goToNextSlide(index)}
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

                                {/* Card content */}
                                <div className="p-5">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{annonce.title}</h2>
                                    <div className="flex items-center gap-2 mb-4">
                                        <svg
                                            className="w-5 h-5 text-yellow-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.12.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                                            />
                                        </svg>
                                        <p className="text-md text-gray-500">{annonce.location}</p>
                                    </div>
                                    <p className="text-md text-gray-600 mb-4">{annonce.sub_name}</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-yellow-600 font-medium">
                                            {annonce.accepted_at ? 'Accepted' : 'Not accepted yet'}
                                        </p>

                                        <p className="text-lg text-gray-500 font-bold font-serif">
                                            {annonce.price} <span className="text-gray-500 font-serif font-bold">MAD</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-16 flex justify-center items-center text-center">
                        <div className="border-2 border-gray-400 p-10 rounded-lg">
                            <h1 className="text-black text-2xl font-semibold mb-6">You do not have any ads yet.</h1>
                            <svg
                                className="w-36 h-36 text-gray-400 mx-auto mb-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9"
                                />
                            </svg>
                            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-3 rounded-md">
                                Publish Your Ad
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Annonces;