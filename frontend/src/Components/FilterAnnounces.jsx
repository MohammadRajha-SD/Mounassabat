import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Carousel from './Carousel/Index';
import axios from 'axios';
import { useAnnonces } from './AnnonceContext';
import NavBar from "./Navbar/NavBar";

const FilterAnnounces = () => {
    const { annonces, filterAnnonces, setAnnonces } = useAnnonces();
    const location = useLocation();
    const navigate = useNavigate();

    const formatCategoryName = (category) => {
        if (!category) return '';
        return category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const category = params.get('category') ?? null;
        const subCategory = formatCategoryName(params.get('subCategory')) ?? null;
        const sousCategory = formatCategoryName(params.get('sousCategory')) ?? null;
        const city = params.get('city') ?? null;
        const search = params.get('search') ?? null;

        filterAnnonces(category, subCategory, sousCategory, city, search);
    }, []);

    const handleFavoritsClick = async (annonceId) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            const response = await axios.post('http://127.0.0.1:8000/api/favoris',
                { annonce_id: annonceId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }

            // Update the state to toggle the favorited status
            const updatedAnnonces = annonces.map(annonce => {
                if (annonce.id === annonceId) {
                    return {
                        ...annonce,
                        isFavorited: !annonce.isFavorited
                    };
                }
                return annonce;
            });

            setAnnonces(updatedAnnonces);

        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleDetailsClick = (id) => {
        navigate(`/AnnouncesDetails/${id}`);
    };
    return (
        <div>
            <NavBar />

            <div className="border-b m-2 p-2 flex items-center justify-between">
                <h1 className="text-4xl">Filtered Announces</h1>
                <a href='/' className="bg-yellow-500 text-white px-5 font-semibold pt-1 pb-2 rounded-lg">Retour</a>
            </div>

            <div className="container px-3 mx-auto py-10">
                {/* Announces Start */}
                {annonces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {annonces.map((annonce, index) => (
                            <div
                                key={index}
                                className="card relative bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
                                onClick={() => handleDetailsClick(annonce.id)}
                            >
                                        <Carousel images={annonce.images} isVip={annonce.type === 'vip'} />

                                {/* Card content */}
                                <div className="p-5">
                                    <h2 className="text-xl font-semibold text-gray-800">{annonce.title}</h2>
                                    <div className="flex items-center">
                                        <svg
                                            className="w-5 h-5 bg-yellow-600 px-1 py-1 dark:text-white rounded-full"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.12.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
                                        </svg>
                                        <p className="text-md font-serif font-medium ml-1 text-gray-500">{annonce.location}</p>
                                    </div>

                                    <div className="w-full h-[1px] bg-gray-500 my-2"></div>

                                    <p className="text-gray-500 font-serif font-medium my-2">{annonce.sub_name}</p>

                                    <div className="flex justify-between items-center gap-x-1">
                                        <div className="border-gray-400 border px-1 py-1 rounded-full hover:border-yellow-500 duration-500">
                                            <svg
                                                className="w-5 h-5 text-gray-900 hover:text-yellow-500 duration-300"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path stroke="currentColor" strokeWidth="2"
                                                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                <path stroke="currentColor" strokeWidth="2"
                                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </div>
                                        <div
                                            onClick={(e) => { e.stopPropagation(); handleFavoritsClick(annonce.id); }}
                                            className={`border border-gray-400 px-1 py-1 rounded-full cursor-pointer transition duration-300 ${annonce.isFavorited ? 'bg-yellow-500 hover:bg-white' : 'text-gray-900'} hover:text-yellow-500 hover:border-yellow-500`}
                                        >
                                            <svg
                                                className={`w-5 h-5 duration-300 ${annonce.isFavorited ? 'text-white' : 'text-gray-900'} hover:text-yellow-500`}
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
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
                ) : (
                    <p className="text-center w-full text-gray-700 dark:text-gray-200">No posts available</p>
                )}

                {/* Announces END */}
            </div>
        </div>
    );
};

export default FilterAnnounces;
