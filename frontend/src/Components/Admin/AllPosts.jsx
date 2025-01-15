import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const Posts = () => {
    const [annonces, setAnnonces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredAnnonces_, setFilteredAnnonces] = useState([]);

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
            const response = await axios.get(`https://monassabatmaroc.online/api/getAllPosts?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            // Check if the response is successful
            if (response.status === 200) {
                const data = response.data;
                setAnnonces(data.data);
                // setFilteredAnnonces(data.data);
                setTotalPages(data.last_page);
            } else {
                console.error('Failed to fetch Annonces:', response.statusText);
            }
        } catch (error) {
            // Catch and log any errors from the request
            console.error('Error fetching Annonces:', error);
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

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    useEffect(() => {
        if (selectedCategory === '') {
            fetchAllAnnonces(1);
        } else {
            filteringAnnonces(selectedCategory);
        }
    }, [selectedCategory]);

    const filteringAnnonces = async (category = null, city = null) => {
        try {
            const response = await axios.get('https://monassabatmaroc.online/api/filter-all-annonces2', {
                params: {
                    category,
                },
            });

            if (response.data.status === 'success') {
                setAnnonces(response.data.annonces);
            }
        } catch (error) {
            console.error('Error fetching filtered annonces:', error);
            return [];
        }
    };

    return (
        <div className="flex">
            <Sidebar active="allposts" />

            {/* POSTS START */}
            <section className="bg-black w-full h-[100vh] px-5 py-2.5">
                <div className="flex gap-2 text-center items-center">
                    <svg className="w-9 h-9 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-center items-center mt-2 gap-2">
                        <h1 className="text-3xl text-white font-bold font-mono">Annonces</h1>
                    </div>
                </div>

                <div className="bg-white w-full h-[1px] mt-4"></div>

                {/* Categories START */}
                <div className=" rounded-lg shadow-md md:m-5 p-4">
                    {/* sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 */}
                    <div className="grid grid-cols-1 gap-6">

                        {/* Category Dropdown */}
                        <div className="relative w-full">
                            <select
                                className="w-full py-3 pl-10 pr-4 border md:h-12 h-12 border-gray-300 font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-sm"
                                onChange={handleCategoryChange} value={selectedCategory}>
                                <option value="">Tous les categories</option>
                                {[
                                    { id: 1, to: 'Marriage', name: 'Mariage' },
                                    { id: 2, to: 'Anniversaire', name: 'Anniversaire' },
                                    { id: 3, to: 'Fete+De+Naissance', name: 'Fête de naissance' },
                                    { id: 4, to: 'BabyShower', name: 'BabyShower' },
                                    { id: 5, to: 'Conférence', name: 'Conférence' }
                                ].map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {/* CATEGORIES END */}

                <div className="bg-white w-full h-[1px] mt-4"></div>

                <table className="w-full">
                    <thead className="text-white text-sm">
                        <tr>
                            <th>TITRE</th>
                            <th>CATÉGORIE</th>
                            <th>NOM COMPLET</th>
                            <th>PRIX</th>
                            <th>CRÉÉ</th>
                            <th>STATUT</th>
                        </tr>
                    </thead>

                    <tbody className="text-white">
                        {annonces.map((annonce, index) => (
                            <tr className="text-white" key={annonce.id}>
                                <td className="text-white font-medium font-serif">{annonce.title}</td>
                                <td className="text-white font-medium font-serif">{annonce.category}</td>
                                <td className="text-white font-medium font-serif">{annonce.user.firstName} {annonce.user.lastName}</td>
                                <td className="text-white font-medium font-serif">{annonce.price} <span className="text-gray-500 font-serif font-bold">MAD</span></td>
                                <td className="text-white font-medium font-serif">{format(new Date(annonce.created_at), 'dd MMMM yyyy')}</td>
                                <td className="text-white font-medium font-serif">{annonce.accepted_at === null ? 'Pending' : 'Approved'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
            </section>
            {/* POSTS END */}

        </div>
    );
}

export default Posts;