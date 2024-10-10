import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Carousel from '../Carousel/Index';
import axios from 'axios';
import { toast } from 'react-toastify';

const Posts = () => {
    const [annonces, setAnnonces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchAllAnnonces(currentPage);
    }, [currentPage]);

    const fetchAllAnnonces = async (page) => {
        try {
            // Get token from localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            // Make the API call using axios
            const response = await axios.get(`http://127.0.0.1:8000/api/getAllAnnonces?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            // Check if the response is successful
            if (response.status === 200) {
                const data = response.data;

                setAnnonces(data.data);
                setTotalPages(data.last_page);
            } else {
                console.error('Failed to fetch Annonces:', response.statusText);
            }
        } catch (error) {
            // Catch and log any errors from the request
            console.error('Error fetching Annonces:', error);
        }
    };

    const deleteAnnonce = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            const response = await axios.delete(`http://127.0.0.1:8000/api/deleteAnnonces/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            // Check if the response is successful
            if (response.status === 200) {
                setAnnonces(annonces.filter(annonce => annonce.id !== id));
                toast.success('Annonce deleted successfully')
                setTimeout(() => {
                    window.location.reload(); 
                }, 1000); 
            }
        } catch (error) {
            toast.error('Failed to delete annonce')
        }
    };

    const acceptAnnonce = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            const response = await axios.post(`http://127.0.0.1:8000/api/acceptAnnonce/${id}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            // Check if the response is successful
            if (response.status === 200) {
                const data = response.data;

                const updatedAnnonces = annonces.map(annonce => {
                    if (annonce.id === id) {
                        return { ...annonce, accepted_at: data.accepted_at };
                    }
                    return annonce;
                });

                setAnnonces(updatedAnnonces);

                toast.success('Annonce accepted successfully');

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            toast.error('Failed to accept annonce');
        }
    };

    // pagination 
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex">
            <Sidebar active="posts" />

            <section className="bg-black w-full h-[100vh] px-5 py-2.5">
                {/* HEADER START */}
                <div className="flex gap-2 text-center items-center">
                    <svg className="w-9 h-9 text-orange-500 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" strokeLinecap="round" stroke-linejoin="round" />
                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" strokeLinecap="round" stroke-linejoin="round" />
                    </svg>
                    <div className="flex text-center items-center mt-2 gap-2">
                        <h1 className="text-3xl text-white font-bold font-mono">Annonces</h1>
                        <h1 className="text-sm text-gray-300 mt-2">135</h1>
                    </div>
                </div>
                {/* HEADER END */}

                {/* DIVIDER */}
                <div className="bg-white w-full h-[1px] my-2"></div>

                {/* POSTS START */}
                {annonces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {annonces.map((annonce, index) => (
                            <div key={index} className="card relative bg-white shadow-lg rounded-lg overflow-hidden">
                                {/* Carousal START */}
                                <Carousel images={annonce.image} />
                                {/* Carousal END */}

                                {/* Card content */}
                                <div className="p-5">
                                    <h2 className="text-xl font-semibold text-gray-800">{annonce.title}</h2>
                                    <p className="text-gray-700 dark:text-gray-400">{annonce.description}</p>

                                    <h1 className=" my-2 font-serif font-bold text-sm">{annonce.user.id} : {annonce.user.firstName} {annonce.user.lastName}</h1>
                                    <div className="flex justify-between items-center">
                                        <div className='flex items-start gap-1'>
                                            <button id="accepte" onClick={() => acceptAnnonce(annonce.id)} className="bg-blue-500 hover:bg-blue-600 duration-500  px-2 py-2 rounded-full">
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                                </svg>
                                            </button>
                                            <button id="delete" onClick={() => deleteAnnonce(annonce.id)} className="bg-red-500 hover:bg-red-600 duration-500  px-2 py-2 rounded-full">
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                </svg>
                                            </button>
                                        </div>
                                        <p className="text-lg text-gray-500 font-bold font-serif">
                                            {annonce.price} <span className="text-gray-500 font-serif font-bold">MAD</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center w-full text-gray-700 dark:text-gray-200">No posts available</p>
                )}
                {/* POSTS END */}

                {/* PAGINATION START */}
                {annonces.length > 0 && totalPages > 1 && (
                    <div className="flex justify-between items-center mt-5">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`px-8 py-3 mx-2 text-sm font-medium text-white bg-yellow-600 rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-700'}`}>
                            Previous
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-8 py-3 mx-2 text-sm font-medium text-white bg-yellow-600 rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-700'}`}>
                            Next
                        </button>
                    </div>
                )}
                {/* PAGINATION END */}
            </section >
        </div >
    );
}

export default Posts;