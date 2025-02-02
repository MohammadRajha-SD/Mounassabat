import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Sidebar from './Sidebar';
import axios from 'axios';
import { toast } from 'react-toastify';
import API from '../../api.js';

const Prestataires = () => {
    const [prestataires, setPrestataires] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        fetchAllPrestataires(currentPage);
    }, [currentPage]);
    const fetchAllPrestataires = async (page) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }
            const response = await API.get(`api/getAllPrestataires?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            // Check if the response is successful
            if (response.status === 200) {
                const data = response.data;
                setPrestataires(data.prestataires.data);
                setTotalPages(data.last_page);
            } else {
                console.error('Failed to fetch clients:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching Prestataires:', error);
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
    const handleBanned = async (id, is_banned) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            const response = await API.post(
                'api/user-banned',
                { id, is_banned },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            toast.success(response.data.message);

            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            toast.error('Error updating user ban status:', error);
        } finally {
            closeModal();
        }
    };


    return (
        <div class="flex">
            <Sidebar active="prestataires" />

            <section className="bg-black w-full h-[100vh] px-5 py-2.5">
                <div class="flex gap-2 text-center items-center">
                    <svg class="w-9 h-9 text-orange-500 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="flex text-center items-center mt-2 gap-2">
                        <h1 class="text-3xl text-white font-bold font-mono">Prestataires</h1>
                    </div>

                </div>
                <div class="bg-white w-full h-[1px] mt-4"></div>

                <table class="w-full">
                    <thead class="text-white text-sm">
                        <th>NOM COMPLET</th>
                        <th>ADRESSE E-MAIL</th>
                        <th>TÉLÉPHONE</th>
                        <th>DATE DE CRÉATION</th>
                        <th class="py-6">ACTION</th>
                    </thead>
                    <tbody class="text-white text-md text-center">
                        {prestataires.map((prestataire) => (
                            <tr className="text-white" key={prestataire.id}>
                                <td className="text-white font-medium font-serif">{prestataire.user.firstName} {prestataire.user.lastName}</td>
                                <td className="text-white font-medium font-serif">{prestataire.user.email}</td>
                                <td className="text-white font-medium font-serif">{prestataire.user.phone}</td>
                                <td className="text-white font-medium font-serif">{format(new Date(prestataire.user.created_at), 'dd MMMM yyyy')}</td>
                                <td>
                                    <button
                                        // onClick={() => openModal()}
                                        onClick={() => handleBanned(prestataire.user.id, prestataire.user.is_banned)}
                                        className={`text-white ${prestataire.user.is_banned ? 'bg-yellow-600' : 'bg-red-600'} font-medium font-serif px-5 py-1 rounded`}
                                    >
                                        {prestataire.user.is_banned ? 'Unban' : 'Ban'}
                                    </button>

                                    {/* Modal */}
                                    {isModalOpen && (
                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                            <div className="bg-white p-5 rounded shadow-lg max-w-sm w-full">
                                                <h2 className="text-lg font-bold mb-4">Confirm</h2>
                                                <p className="text-gray-700 mb-4">Are you sure ?</p>
                                                <div className="flex justify-end space-x-3">
                                                    <button
                                                        onClick={closeModal}
                                                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => handleBanned(prestataire.user.id, prestataire.user.is_banned)}
                                                        className={`px-4 py-2 ${prestataire.user.is_banned ? 'bg-yellow-600' : 'bg-red-600'} text-white rounded`}
                                                    >
                                                        {prestataire.user.is_banned ? 'Unban' : 'Ban'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* PAGINATION START */}
                {prestataires.length > 0 && totalPages > 1 && (
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
};

export default Prestataires;