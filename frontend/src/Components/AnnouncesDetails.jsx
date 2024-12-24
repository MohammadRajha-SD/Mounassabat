import React, { useEffect, useState } from 'react';
import Footer from "./Footer.jsx";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import NavBar from "./Navbar/NavBar";
import Loader from './Loader/Index.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const AnnouncesDetails = () => {
    const { id } = useParams();
    const [annonce, setAnnonce] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [liked, setLiked] = useState(null);
    const [user, setUser] = useState(null);
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        const fetchAnnonceDetails = async () => {
            try {
                const user_ = JSON.parse(localStorage.getItem('user'));
                setUser(user_);
                const response = await fetch(`http://127.0.0.1:8000/api/getAnnonceDetails/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch announcement details');
                }
                const data = await response.json();

                setAnnonce(data.annonce);
                setLiked(data.annonce.likes.includes(user_.id));
                setLikesCount(data.annonce.likes.length);
            } catch (error) {
                console.error('Error fetching announcement details:', error);
            }
        };

        fetchAnnonceDetails();

    }, [id]);



    const goToPreviousSlide = () => {
        if (annonce && annonce.image && annonce.image.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + annonce.image.length) % annonce.image.length);
        }
    };

    const goToNextSlide = () => {
        if (annonce && annonce.image && annonce.image.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % annonce.image.length);
        }
    };

    const handleNewConversation = async (id) => {
        const token = localStorage.getItem('token');
        const payload = { user_id: id };

        try {
            if (token) {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/new-conversation',
                    payload,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                window.location.href = '/Chat';
            } else {
                toast.error('You have to log in');
                window.location.href = '/Login';
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleLikeToggle = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You need to be logged in to like this annonce.');
            return;
        }

        try {
            if (liked) {
                const response = await axios.post(
                    `http://127.0.0.1:8000/api/annonces/${id}/unlike`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.status === 200) {
                    setLiked(false);
                    setLikesCount((prev) => prev > 0 ? prev - 1 : prev);
                }
            } else {
                const response = await axios.post(
                    `http://127.0.0.1:8000/api/annonces/${id}/like`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.status === 200) {
                    setLiked(true);
                    setLikesCount((prev) => prev + 1);
                }
            }
        } catch (error) {
            console.error('Error liking the annonce:', error);
            toast.error('Error liking the annonce');
        }
    };

    if (!annonce) {
        return <div className="flex items-center justify-center h-screen">
            <Loader />
        </div>;
    }

    return (
        <div>
            <NavBar />

            <div className="container px-3 py-16 mx-auto mb-4">
                <div className="border-b pb-2 flex items-center justify-between mb-5">
                    <h1 className="text-4xl">Announces Details </h1>
                    <a href='/AllAnnounces' className="bg-[#e6cf8c] text-white px-5 font-semibold pt-1 pb-2 rounded-lg">Retour</a>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-10 mt-5">
                    <div id={`carousel-${id}`} className="relative rounded-lg overflow-hidden shadow-lg w-full md:w-1/2">
                        <div className="relative w-full rounded-lg h-60 md:h-96" data-carousel-inner>
                            {annonce.image && annonce.image.length > 0 && (
                                <div className="duration-700 ease-in-out h-full" data-carousel-item>
                                    <img
                                        src={`http://127.0.0.1:8000/${annonce.image[currentIndex]}`}
                                        className="object-cover w-full h-full"
                                        alt={`Slide ${currentIndex}`}
                                    />
                                </div>
                            )}
                        </div>

                        {annonce.image && annonce.image.length > 1 && (
                            <>
                                <div className="flex absolute bottom-5 left-1/2 z-30 -translate-x-1/2 space-x-2" data-carousel-indicators>
                                    {annonce.image.map((_, slideIndex) => (
                                        <button
                                            key={slideIndex}
                                            type="button"
                                            className={`w-3 h-3 rounded-full ${slideIndex === currentIndex ? 'bg-[#e6cf8c]' : 'bg-gray-300'} hover:bg-yellow-400 focus:outline-none focus:bg-yellow-400 transition`}
                                            onClick={() => setCurrentIndex(slideIndex)}
                                            aria-label={`Go to slide ${slideIndex + 1}`} // Accessibility
                                        ></button>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className="flex absolute top-1/2 left-3 z-40 items-center justify-center w-10 h-10 bg-[#e6cf8c] rounded-full hover:bg-gray-300 focus:outline-none transition"
                                    onClick={goToPreviousSlide}
                                    aria-label="Previous Slide" // Accessibility
                                >
                                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="flex absolute top-1/2 right-3 z-40 items-center justify-center w-10 h-10 bg-[#e6cf8c] rounded-full hover:bg-gray-300 focus:outline-none transition"
                                    onClick={goToNextSlide}
                                    aria-label="Next Slide" // Accessibility
                                >
                                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className='flex items-center justify-between'>
                            <h1 className="text-black font-serif text-3xl py-2">{annonce.title}</h1>

                            <button
                                onClick={() => handleNewConversation(annonce.user_id)}
                                className="bg-indigo-500 text-white px-5 font-semibold pt-1 pb-2 rounded-lg"
                            >
                               Envoyer un message
                            </button>
                        </div>

                        <div className="py-6">
                            <h1 className="text-black font-serif text-2xl italic py-2">Description</h1>
                            <p className="text-gray-500 text-sm">{annonce.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
                            <div>
                                <h1 className="text-black font-serif text-md">Category: <span className="px-2 text-gray-600 text-sm">{annonce.sub_name}</span></h1>
                                <h1 className="text-black font-serif text-md py-3">Prestataire: <span className="px-2 text-gray-600 text-sm">{annonce.firstName} {annonce.lastName}</span></h1>
                                <h1 className="text-black font-serif text-md">Location: <span className="px-2 text-gray-600 text-sm">{annonce.location}</span></h1>
                            </div>
                            <div>
                                <h1 className="text-black font-serif text-md">Date: <span className="px-2 text-gray-600 text-sm">{format(new Date(annonce.created_at), 'dd MMMM yyyy')}</span></h1>
                                <h1 className="text-black font-serif text-md py-3">Phone: <span className="px-2 text-gray-600 text-sm">+212 {annonce.phone}</span></h1>
                                <h1 className="text-black font-serif text-md">Price: <span className="px-2 text-gray-600 text-sm">{annonce.price} Dhs</span></h1>
                            </div>
                        </div>

                        {/* Like button */}
                        <div className="flex items-center justify-start">
                            <button
                                onClick={handleLikeToggle}
                                className={`px-5 flex  py-2 rounded-lg ${liked ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'} transition`}
                            > <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                                </svg> <span className='ml-2'>({likesCount})</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AnnouncesDetails;
