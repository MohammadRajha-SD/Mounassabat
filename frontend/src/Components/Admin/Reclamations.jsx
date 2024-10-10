import React, { useEffect, useState } from 'react';
import message from '/src/assets//message.png';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';

const Reclamations = () => {
    const [reclamations, setReclamations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchAllReclamations(currentPage);
    }, [currentPage]);

    const fetchAllReclamations = async (page) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            const response = await fetch(`http://127.0.0.1:8000/api/getAllReclamations?page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setReclamations(data.data);
                setTotalPages(data.last_page);
            } else {
                console.error('Failed to fetch Reclamations:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching Reclamations:', error);
        }
    }

    const deleteReclamation = async (id) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }
            const response = await fetch(`http://127.0.0.1:8000/api/deleteReclamation/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setReclamations(reclamations.filter(reclamation => reclamation.id !== id));
            toast.success('Reclamation deleted successfully');
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        } catch (error) {
            console.error('Error deleting reclamation:', error);
            toast.error('Failed to delete reclamation');
        }
    };

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
            <Sidebar active="reclamations" />

            <section className="bg-black w-full  px-5 py-2.5">
                <div className="flex gap-2 text-center items-center">
                    <svg className="w-9 h-9 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-center items-center mt-2 gap-2">
                        <h1 className="text-3xl text-white font-bold font-mono">Reclamations</h1>
                        <h1 className="text-sm text-gray-300 mt-2">135</h1>
                    </div>
                </div>
                <div className="bg-white w-full h-[1px] my-4"></div>

                {/* reclamations START */}
                {reclamations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reclamations.map((reclamation, index) => (
                            <div key={index} className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl">
                                <div className="px-6 py-4 rounded-lg">
                                    <div className="flex justify-center md:justify-end">
                                        <img className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-yellow-600" src={message} alt="User avatar" />
                                    </div>

                                    <h2 className="mt-2 text-xl font-semibold text-gray-800 font-serif dark:text-white">Messages</h2>

                                    <p className="mt-2 text-sm text-gray-600 font-mono dark:text-gray-200">{reclamation.message}</p>

                                    <div className="flex justify-between items-center mt-4">
                                        <a className="text-lg font-medium text-yellow-600 font-serif hover:underline" tabIndex="0" role="link">
                                            {reclamation.user.firstName} {reclamation.user.lastName}
                                        </a>
                                        <button onClick={() => deleteReclamation(reclamation.id)} className="bg-red-500 hover:bg-red-600 duration-300 px-3 py-2 rounded-full flex items-center">
                                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center w-full text-gray-700 dark:text-gray-200 text-lg font-medium mt-10">No reclamations available</p>
                )}
                {/* reclamations END */}

                {/* PAGINATION START */}
                {reclamations.length > 0 && totalPages > 1 && (
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
            </section>
        </div>
    );
}

export default Reclamations;