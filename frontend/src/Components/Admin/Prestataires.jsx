import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Sidebar from './Sidebar';
import axios from 'axios';

const Prestataires = () => {
    const [prestataires, setPrestataires] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        fetchAllPrestataires();
    }, []);

    const fetchAllPrestataires = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            const response = await axios.get('https://mounassabat.ma/api/getAllPrestataires', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            setPrestataires(response.data);
        } catch (error) {
            console.error('Error fetching Prestataires:', error);
        }
    };

    const handleDelete = (id) => {
        console.log(id);
        closeModal();
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
                        <th>ID</th>
                        <th>FULL NAME</th>
                        <th>ADRESS EMAIL</th>
                        <th>PHONE</th>
                        <th>CREATED DATE</th>
                        <th class="py-6">ACTION</th>
                    </thead>
                    <tbody class="text-white text-md text-center">
                        {prestataires.map((prestataire, index) => (
                            <tr className="text-white" key={prestataire.id}>
                                <td className="text-white font-medium font-serif">{index + 1}</td>
                                <td className="text-white font-medium font-serif">{prestataire.user.firstName} {prestataire.user.lastName}</td>
                                <td className="text-white font-medium font-serif">{prestataire.user.email}</td>
                                <td className="text-white font-medium font-serif">{prestataire.user.phone}</td>
                                <td className="text-white font-medium font-serif">{format(new Date(prestataire.user.created_at), 'dd MMMM yyyy')}</td>
                                <td>
                                    <button onClick={() => openModal(prestataire.id)} className="text-white bg-red-600 font-medium font-serif px-5 py-1 rounded">BAN</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>



                </table>

            </section>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                        <p className="text-gray-700 mb-4">Are you sure you want to delete this item?</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Prestataires;