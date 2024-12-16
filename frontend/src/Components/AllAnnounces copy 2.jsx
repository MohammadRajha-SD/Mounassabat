import React, { useEffect, useState } from 'react';
import NavBar from "./Navbar/NavBar";
import Footer from "/src/Components/Footer.jsx";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Carousel from './Carousel/Index.jsx'
import { Link } from 'react-router-dom';
import Loader from './Loader/Index.jsx';
import { useAnnonces } from './AnnonceContext';

const AllAnnounces = () => {
    const [city, setCity] = useState(null);
    const [cities, setCities] = useState([]);
    const [annonces_, setAnnonces_] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('');
    const { filterAnnonces, annonces } = useAnnonces();
    const [showCities, setShowCities] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        fetchAllAnnonces(currentPage);
    }, [currentPage]);

    useEffect(() => {
        setFilteredCities(
            cities.filter(city => city.asciiname.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [searchQuery, cities]);

    const fetchAllAnnonces = async (page) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get('https://mounassabat.ma/api/getAnnonces', {
                    params: { page },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setAnnonces_(response.data.data);
                    setTotalPages(response.data.last_page);
                } else {
                    console.error('Failed to fetch annonces:', response.statusText);
                }
            } else {
                const response = await axios.get(`https://mounassabat.ma/api/getAllAnnoncesNoLogin`, {
                    params: { page },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setAnnonces_(response.data.data);
                    setTotalPages(response.data.last_page);
                } else {
                    console.error('Failed to fetch annonces:', response.statusText);
                }
            }
        } catch (error) {
            console.error('Error fetching annonces:', error);
        }
    };

    const handleDetailsClick = (id) => {
        navigate(`/AnnouncesDetails/${id}`);
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

    const handleFavoritsClick = async (annonceId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            const response = await axios.post('https://mounassabat.ma/api/favoris',
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
            const updatedAnnonces = annonces_.map(annonce => {
                if (annonce.id === annonceId) {
                    return {
                        ...annonce,
                        isFavorited: !annonce.isFavorited
                    };
                }
                return annonce;
            });

            setAnnonces_(updatedAnnonces);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        // fetching Morroco cities
        const fetchData = async () => {
            try {
                const where = encodeURIComponent(JSON.stringify({
                    "asciiname": {
                        "$exists": true
                    }
                }));

                const response = await fetch(
                    'https://parseapi.back4app.com/classes/List_of_Morroco_cities?limit=1000&order=asciiname&keys=asciiname,population',
                    {
                        headers: {
                            'X-Parse-Application-Id': '2ZOfB60kP39M5kE4WynRqyP7lNGKZ9MB8fVWqAM9',
                            'X-Parse-Master-Key': 'Qq7lEIoEEzRris3IM6POE5ewvYuzACVyA6VKtiVb',
                        }
                    }
                );

                const data = await response.json();
                setCities(data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    });

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    useEffect(() => {
        if (selectedCategory == '' && selectedCity == '') {
            fetchAllAnnonces(1);
            setAnnonces_(annonces);
            console.log(annonces);
        }
        else if (selectedCategory != '' && selectedCity == '') {
            filterAnnonces(selectedCategory);
            setAnnonces_(annonces);
            console.log(annonces);
        }
        else if (selectedCategory == '' && selectedCity != '') {
            filterAnnonces(null, null, null, selectedCity);
            setAnnonces_(annonces);
            console.log(selectedCity);
            console.log(annonces);
        }
        else {
            filterAnnonces(selectedCategory, null, null, selectedCity);
            setAnnonces_(annonces);
            console.log(annonces);
        }
    }, [selectedCategory, selectedCity]);

    const handleCitySelection = (cityName) => {
        setSelectedCity(cityName);
        setShowCities(false);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center w-full h-[100vh]"><Loader /></div>
            ) : (
                <div>
                    <NavBar />
                    <div className="border-b m-2 p-2 flex items-center justify-between">
                        <h1 className="text-4xl">Toutes les annonces</h1>
                        <a href='/' className="bg-[#e6cf8c] text-white px-5 font-semibold pt-1 pb-2 rounded-lg">Retour</a>
                    </div>

                    {/* Categories START */}
                    <div className="bg-white rounded-lg shadow-md md:m-5 p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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

                            {/* City Dropdown */}
                            <div onClick={() => setShowCities(true)} className="cursor-pointer flex items-center justify-between w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 focus:border-yellow-500 dark:focus:border-yellow-500 focus:outline-none focus:ring">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M12 13a3 3 0 100-6 3 3 0 000 6z"></path>
                                        <path d="M17.8 13.938h-.011a7 7 0 11-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155z"></path>
                                    </svg>
                                    <p className="mx-2 text-black font-semibold text-sm">{selectedCity || "Ville (Ex: Casablanca)"}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.5 6a.5.5 0 0 1 .707 0L8 11.293 13.793 6.5a.5.5 0 1 1 .707.707l-6 6a.5.5 0 0 1-.707 0l-6-6A.5.5 0 0 1 1.5 6z" />
                                </svg>
                            </div>

                              {/* Search Button */}
                              <div className="w-full">
                                <button
                                    className="w-full text-white bg-black px-8 py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition duration-200 text-sm"
                                    onClick={() => filterButton()}
                                >
                                    Rechercher
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M21 21l-3.5-3.5M17 10a7 7 0 10-14 0 7 7 0 0014 0z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* CATEGORIES END */}

                    <div className="container px-3 mx-auto py-20">
                        {/* Announces Start */}
                        {annonces_ && annonces_.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {annonces_.map((annonce, index) => (
                                    <Link to={`/AnnouncesDetails/${annonce.id}`} key={index} className="card relative bg-white shadow-lg rounded-lg overflow-hidden my-4">
                                        {/* Carousal START */}
                                        <Carousel images={annonce.images} isVip={annonce.type === 'vip'} />

                                        {/* Carousal END */}

                                        {/* Card content */}
                                        <div className="p-5">
                                            <h2 className="text-xl font-semibold text-gray-800">{annonce.title}</h2>
                                            <p className="text-gray-700 dark:text-gray-400">{annonce.description}</p>

                                            <div className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 bg-[#e6cf8c] px-1 py-1 dark:text-white rounded-full"
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
                                                        d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                                    />
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.12.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                                                    />
                                                </svg>
                                                <p className="text-md font-serif font-medium ml-1 text-gray-500">{annonce.location}</p>
                                            </div>

                                            <div className="w-full h-[1px] bg-gray-500 my-2"></div>

                                            <div className="flex items-center justify-between">
                                                <p className="text-gray-500 font-serif font-medium">{annonce.sub_name}</p>

                                                <div className="flex justify-center items-center gap-x-1">
                                                    <div
                                                        id="details"
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Prevents triggering the card click event
                                                            handleDetailsClick(annonce.id);
                                                        }}
                                                        className="border-gray-400 border px-1 py-1 rounded-full hover:border-yellow-500 duration-500"
                                                    >
                                                        <svg
                                                            className="w-5 h-5 text-gray-900 hover:text-yellow-500 duration-300"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                                            />
                                                            <path
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div
                                                        id="favorits"
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Prevents triggering the card click event
                                                            handleFavoritsClick(annonce.id);
                                                        }}
                                                        className={`border border-gray-400 px-1 py-1 rounded-full cursor-pointer transition duration-300 ${annonce.isFavorited ? 'bg-[#e6cf8c] hover:bg-white' : 'text-gray-900'}  hover:text-yellow-500 hover:border-yellow-500`}
                                                        aria-label={`Toggle favorite for ${annonce.title}`}
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
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center w-full text-gray-700 dark:text-gray-200">Aucune annonce disponible</p>
                        )}
                        {/* Announces END */}

                        {/* PAGINATION START */}
                        {annonces_ && annonces_.length > 0 && totalPages > 1 && (
                            <div className="flex justify-between items-center mt-5">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`px-8 py-3 mx-2 text-sm font-medium text-white bg-[#e6cf8c] rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-700'}`}>
                                    Previous
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-8 py-3 mx-2 text-sm font-medium text-white bg-[#e6cf8c] rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-700'}`}>
                                    Next
                                </button>
                            </div>
                        )}
                        {/* PAGINATION END */}
                    </div>

                    <Footer />

                    {/* Show Cities Start */}
                    {showCities && (
                        <>
                            <div onClick={() => setShowCities(!showCities)} className="absolute inset-0 z-10 bg-black opacity-50"></div>

                            <div className={`fixed inset-y-0 p-4 right-0 z-40 flex flex-col w-full md:w-1/3 bg-white shadow-lg transition-transform duration-500 ${showCities ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
                                <div className='flex items-center justify-between'>
                                    <h1 className='text-lg font-medium p-4 '>Ville - Secteur</h1>
                                    <p className='text-2xl font-medium p-4 cursor-pointer' onClick={() => setShowCities(!showCities)}>
                                        <svg width="20px" height="20px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <path style={{ fill: '#FDE047', stroke: '#730000', strokeWidth: 4 }} d="M 20,4 3,21 33,50 3,80 20,97 49,67 79,97 95,80 65,50 95,20 80,4 50,34 z" />
                                        </svg>
                                    </p>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <div className='flex items-center p-2 border-2 h-14 justify-center rounded-3xl w-[27rem] border-yellow-500'>
                                        <svg className="w-8 h-8 text-yellow-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                        <input
                                            className='block w-full p-4 ps-6 text-sm text-gray-900 rounded-2xl bg-gray-50 focus:ring-0 focus:border-0 outline-none border-none'
                                            type="search"
                                            name="search"
                                            id="search"
                                            placeholder="Search city..."
                                            onChange={handleSearch}
                                        />
                                    </div>
                                </div>
                                {/* start cities */}
                                <div className='flex flex-col p-4 overflow-y-auto' style={{ maxHeight: '100vh' }}>
                                    <div onClick={() => setSelectedCity('')} className='cursor-pointer flex items-center justify-between'>
                                        <h1 className='text-lg font-medium p-4'>-- Select --</h1>
                                    </div>
                                    {filteredCities.map(city => (
                                        <div onClick={() => handleCitySelection(city.asciiname)} key={city.objectId} className='cursor-pointer flex items-center justify-between'>
                                            <h1 className='text-lg font-medium p-4'>{city.asciiname}</h1>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    {/* Show Cities End */}
                </div>
            )}
        </>
    );
};

export default AllAnnounces;