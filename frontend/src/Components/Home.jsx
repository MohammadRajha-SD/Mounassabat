import React, { useEffect, useState } from 'react';
import backgroundImage from "../assets/image3.jpg";
import marriage from "../assets/marriage.png";
import anniversaire from "../assets/icons8-birthday-80.png";
import feteDeNaissance from "../assets/icons8-schedule-48.png";
import babyShower from "../assets/icons8-confetti-48.png";
import conference from "../assets/icons8-conference-48.png";
import register from "../assets/inscription.png";
import annonce from "../assets/annonces.png";
import cup from "../assets/cup.png";
import Footer from "/src/Components/Footer.jsx";
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar/NavBar.jsx';
import axios from 'axios';
import { gapi } from 'gapi-script'
import Loader from './Loader/Index.jsx';
import AnnouncementSection from './AnnouncementSection';

const Home = () => {
    const [showCities, setShowCities] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [categoriesAnnoncesCounted, setCategoriesAnnoncesCounted] = useState([]);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    const [normalAnnonces, setNormalAnnonces] = useState([]);
    const [vipAnnonces, setVipAnnonces] = useState([]);
    const [marriageAnnonces, setMarriageAnnonces] = useState([]);
    const [babyshowerAnnonces, setBabyshowerAnnonces] = useState([]);
    const [anniversaireAnnonces, setAnniversaireAnnonces] = useState([]);

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://mounassabat.ma/api/getAllCategories',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );
                setCategories(response.data);
            } catch (err) {
                console.log('ERROR : while fetching categories :', err);
            }
        };

        fetchCategories();
    }, []);

    const clientId = "185183656415-e7hnjo56pe6rjmr7fdqbgp2ci6qa73hn.apps.googleusercontent.com";

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            });
        }

        gapi.load('client:auth2', start);
    }, [])

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        setLoading(true);

        // fetching Morroco cities
        const fetchData = async () => {
            setLoading(true);
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

        // fetch categories with announces counted 
        axios.get('https://mounassabat.ma/api/categoriesWithAnnoncesCounted')
            .then(response => {
                setCategoriesAnnoncesCounted(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
                setLoading(false);
            });

        fetchData();

        fetchAllAnnonces(1);
    }, []);

    useEffect(() => {
        setFilteredCities(
            cities.filter(city => city.asciiname.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [searchQuery, cities]);

    const handleCitySelection = (cityName) => {
        setSelectedCity(cityName);
        setShowCities(false);
    };

    const imageMap = {
        1: marriage,
        2: feteDeNaissance,
        3: babyShower,
        4: anniversaire,
        5: conference,
    };

    const fetchAllAnnonces = async (page) => {
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const url = token ? 'getAllAcceptedAnnonces' : 'getAllAcceptedAnnoncesHomePage';


            const response = await axios.get(`https://mounassabat.ma/api/${url}`, {
                params: { page },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setNormalAnnonces(response.data.normal);
                setVipAnnonces(response.data.vip);
                setMarriageAnnonces(response.data.marriage);
                setBabyshowerAnnonces(response.data.babyshower);
                setAnniversaireAnnonces(response.data.anniversaire);
            } else {
                console.error('Failed to fetch annonces:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching annonces:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSearchCategory = (event) => {
        setSearchCategory(event.target.value);
    };

    const filterButton = () => {
        if (selectedCategory || selectedCity || searchCategory) {
            const queryParams = new URLSearchParams();
            if (selectedCategory) queryParams.append('category', selectedCategory);
            if (selectedCity) queryParams.append('city', selectedCity);
            if (searchCategory) queryParams.append('search', searchCategory);

            navigate(`/FiltredAnnounces?${queryParams.toString()}`);
        }
    };
    const handleDetailsClick = (id) => {
        navigate(`/AnnouncesDetails/${id}`);
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

            const updatednormalAnnonces = normalAnnonces.map(annonce => {
                if (annonce.id === annonceId) {
                    return {
                        ...annonce,
                        isFavorited: !annonce.isFavorited
                    };
                }
                return annonce;
            });

            const updatedvipAnnonces = vipAnnonces.map(annonce => {
                if (annonce.id === annonceId) {
                    return {
                        ...annonce,
                        isFavorited: !annonce.isFavorited
                    };
                }
                return annonce;
            });

            const updatedmarriageAnnonces = marriageAnnonces.map(annonce => {
                if (annonce.id === annonceId) {
                    return {
                        ...annonce,
                        isFavorited: !annonce.isFavorited
                    };
                }
                return annonce;
            });

            const updatedbabyshowerAnnonces = babyshowerAnnonces.map(annonce => {
                if (annonce.id === annonceId) {
                    return {
                        ...annonce,
                        isFavorited: !annonce.isFavorited
                    };
                }
                return annonce;
            });

            const updatedanniversaireAnnonces = anniversaireAnnonces.map(annonce => {
                if (annonce.id === annonceId) {
                    return {
                        ...annonce,
                        isFavorited: !annonce.isFavorited
                    };
                }
                return annonce;
            });

            setNormalAnnonces(updatednormalAnnonces);
            setVipAnnonces(updatedvipAnnonces);
            setMarriageAnnonces(updatedmarriageAnnonces)
            setBabyshowerAnnonces(updatedbabyshowerAnnonces)
            setAnniversaireAnnonces(updatedanniversaireAnnonces)
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center w-full h-[100vh]"><Loader /></div>
            ) : (
                <div>
                    <NavBar />

                    <img src={backgroundImage} style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '100vh',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        zIndex: -1
                    }} />

                    {/* Text Image */}
                    <div className="px-4 md:px-8 mt-2">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium font-serif leading-tight">
                            Un Clic, <span className="text-yellow-600">vos</span>
                        </h1>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium font-serif leading-tight">
                            <span className="text-yellow-600">événements</span> bien
                        </h1>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium font-serif leading-tight">
                            yedik
                        </h1>
                        <p className="py-5 text-gray-600 text-lg md:text-xl font-serif font-medium">
                            Découvrons les meilleurs Prestataires des événements
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="bg-white rounded-lg shadow-md md:m-12  p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="relative w-full">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 9a3 3 0 011-2m0 12h4m0-3c0-4.1 4-4.9 4-9a6 6 0 10-12 0c0 4 4 5 4 9h4z"></path></svg>
                                </span>
                                <input type="text" placeholder="Que recherchez-vous ?" value={searchCategory} onChange={handleSearchCategory} className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent" />
                            </div>

                            {/* Categories start */}
                            <div className="relative w-full">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 9a3 3 0 011-2m0 12h4m0-3c0-4.1 4-4.9 4-9a6 6 0 10-12 0c0 4 4 5 4 9h4z"></path></svg>
                                </span>
                                <select className="w-full py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent" onChange={handleCategoryChange} value={selectedCategory} >
                                    <option value={''} selected>Tous les catégories</option>
                                    {categories.length > 0 && (
                                        <>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.name}>{category.name}</option>
                                            ))}
                                        </>
                                    )}
                                </select>
                            </div>
                            {/* Categories end */}

                            {/* CITY START */}
                            <div onClick={() => setShowCities(true)} className="cursor-pointer flex items-center justify-between w-full px-4  text-gray-700 bg-white border border-gray-300 rounded-md  dark:text-gray-300  focus:border-yellow-500 dark:focus:border-yellow-500 focus:outline-none focus:ring">
                                <div className="flex items-center ">
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 13a3 3 0 100-6 3 3 0 000 6z"></path><path d="M17.8 13.938h-.011a7 7 0 11-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155z"></path></svg>
                                    <p className='mx-2 text-black font-semibold text-md'>{selectedCity || "Ville (Ex: Casablanca)"}</p>
                                    {/* <input type="text" value={selectedCity} className='hidden' required /> */}
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.5 6a.5.5 0 0 1 .707 0L8 11.293 13.793 6.5a.5.5 0 1 1 .707.707l-6 6a.5.5 0 0 1-.707 0l-6-6A.5.5 0 0 1 1.5 6z" />
                                </svg>
                            </div>
                            {/* CITY END */}

                            <div className="w-full">
                                <button className="w-full text-white bg-black px-8 py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition duration-200" onClick={() => filterButton()}>
                                    Rechercher
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-3.5-3.5M17 10a7 7 0 10-14 0 7 7 0 0014 0z"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 5 Cards */}
                    <div className="flex items-center flex-wrap justify-center gap-6 py-10">
                        {[
                            { src: marriage, title: 'Mariage' },
                            { src: anniversaire, title: 'Anniversaire' },
                            { src: feteDeNaissance, title: 'Fête de naissance' },
                            { src: babyShower, title: 'BabyShower' },
                            { src: conference, title: 'Conférence' }
                        ].map(item => (
                            <div key={item.title} className="w-48 flex flex-col items-center border-2 border-gray-300 py-4 px-5 rounded-lg hover:bg-yellow-600 hover:text-white transition duration-300 cursor-pointer">
                                <img className="w-12 h-12 mb-3" src={item.src} alt={item.title} />
                                <h1 className="text-lg font-serif font-medium">{item.title}</h1>
                            </div>
                        ))}
                    </div>

                    {/* Header of 3 Cards */}
                    <div className="text-center py-14">
                        <h1 className="text-5xl font-medium font-serif mb-6">
                            Vous êtes Prestataire <span className="text-yellow-600">des événements</span> ?
                        </h1>
                        <p className="text-gray-500 font-serif font-medium text-lg">
                            C'est avec plaisir que nous accueillons tous les prestataires d'événements !
                            Publiez vos annonces et partagez votre talent avec notre communauté passionnée.
                        </p>
                    </div>

                    {/* 3 Cards */}
                    <div className="flex flex-col md:flex-row justify-center align-items text-center gap-5 my-16 mx-3">
                        <div className="flex flex-col text-center items-center w-full md:w-[37%] h-auto">
                            <img className="h-24 w-24 bg-yellow-600 rounded-full px-2 py-2" src={register} alt="" />
                            <h1 className="text-center text-2xl font-serif font-medium py-5">S'inscrire</h1>
                            <p className="text-gray-500 font-serif font-medium text-lg">En vous inscrivant sur notre plateforme, vous pouvez tout de suite profiter d'un tableau de bord rempli d'outils pratiques pour mieux gérer vos clients. C'est vraiment utile pour vous simplifier la vie !</p>
                        </div>

                        <div className="flex flex-col text-center items-center w-full md:w-[36%] h-auto">
                            <img className="h-24 w-24 bg-yellow-600 rounded-full px-2 py-2" src={annonce} alt="" />
                            <h1 className="text-center text-2xl font-serif font-medium py-5">Publier votre annonce</h1>
                            <p className="text-gray-500 font-serif font-medium text-lg">Quand vous publiez votre annonce avec des images sur notre site, vous avez de fortes chances de rencontrer de nouveaux clients. C'est une belle opportunité pour élargir votre clientéle !</p>
                        </div>

                        <div className="flex flex-col text-center items-center w-full md:w-[35%] h-auto">
                            <img className="h-24 w-24 bg-yellow-600 rounded-full px-2 py-2" src={cup} alt="" />
                            <h1 className="text-center text-2xl font-serif font-medium py-5">Découvrir des nouveaux clients</h1>
                            <p className="text-gray-500 font-serif font-medium text-lg">Explorez et connectez vous avec une clientéle désireuse d'organiser des événements exceptionnels !</p>
                        </div>
                    </div>

                    {/* Main 5 Sections */}
                    <div className="container  px-3  mx-auto">
                        <h1 className="text-center font-serif text-white font-semibold text-md bg-zinc-400 px-6 py-4  rounded-md">Découvrez les nouveautés</h1>

                        <AnnouncementSection title="Annonces VIP" annonces={vipAnnonces} handleDetailsClick={handleDetailsClick} handleFavoritsClick={handleFavoritsClick} />
                        <AnnouncementSection title="Annonces Normales" annonces={normalAnnonces} handleDetailsClick={handleDetailsClick} handleFavoritsClick={handleFavoritsClick} />
                        <AnnouncementSection title="Annonces Mariage" annonces={marriageAnnonces} handleDetailsClick={handleDetailsClick} handleFavoritsClick={handleFavoritsClick} />
                        <AnnouncementSection title="Annonces Baby Shower" annonces={babyshowerAnnonces} handleDetailsClick={handleDetailsClick} handleFavoritsClick={handleFavoritsClick} />
                        <AnnouncementSection title="Annonces Anniversaire" annonces={anniversaireAnnonces} handleDetailsClick={handleDetailsClick} handleFavoritsClick={handleFavoritsClick} />
                    </div>

                    {/* Categories Preview Cards */}
                    <div className="mt-20 px-2">
                        <h1 className="text-center font-serif text-white font-semibold text-md bg-zinc-400 px-6 py-4  rounded-md">Mounassabat.ma. un clic, vos événements bine yedik</h1>
                        <h1 className="text-4xl text-black font-serif font-medium py-4 text-center">
                            Découvrons les meilleurs Prestataires d'événements
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-10">
                            {categoriesAnnoncesCounted.map((category, index) => (
                                <div key={index} className="flex flex-col border-2 border-gray-400 rounded-md">
                                    {/* Card Header */}
                                    <div className="flex flex-col justify-center items-center py-3 border-b-2">
                                        <img className="w-12 h-12" src={imageMap[category.id]} alt="" />
                                        <h1 className="font-serif font-medium py-1">{category.name}</h1>
                                    </div>

                                    {/* Card Body (grows to fill space) */}
                                    <div className="flex-grow py-3">
                                        {category.sub__category.map((subCategory, subIndex) => (
                                            <div key={subIndex}>
                                                <div className="flex justify-between items-center gap-8 p-4">
                                                    {/* Subcategory Name */}
                                                    <h1 className="text-gray-500 font-serif font-medium">{subCategory.name}</h1>

                                                    {/* Subcategory Annonces Count */}
                                                    <h1 className="text-white bg-yellow-600 px-2 py-1 text-sm rounded-full">
                                                        {subCategory.annonces_count ?? 0}
                                                    </h1>
                                                </div>

                                                {/* Add dashed border between subcategories except the last one */}
                                                {subIndex < category.sub__category.length - 1 && (
                                                    <div className="w-full border border-dashed border-gray-500"></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Card Footer */}
                                    <div className="w-full h-[1px] bg-gray-400"></div>
                                    <div className="flex justify-between bg-gray-400 px-5 items-center py-2 rounded-b">
                                        <button className="font-medium font-serif text-lg">Voir tous</button>
                                        <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>


                    <div className="py-10 px-2">
                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-medium font-serif text-center">
                            LES PRESTATAIRES
                        </h1>
                        <p className="py-6 md:py-8 text-gray-500 text-base md:text-lg lg:text-lg font-serif font-medium text-center">
                            Découvrons les meilleurs Prestataires des événements
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8 mt-8">
                            <button className="bg-black text-base md:text-xl px-6 md:px-12 py-2 md:py-3 rounded-sm font-serif font-medium text-white">
                                Rechercher
                            </button>
                            <button className="flex justify-center items-center gap-2 md:gap-4 bg-yellow-600 text-base md:text-xl px-6 md:px-8 py-2 md:py-3 rounded-sm font-serif font-medium text-white">
                                Publier Votre Annonce
                                <svg className="w-5 md:w-6 h-5 md:h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Show Cities Start */}
                    {showCities && (
                        <>
                            <div onClick={() => setShowCities(!showCities)} className="absolute inset-0 z-10 bg-black opacity-50"></div>
                            <div className={`fixed inset-y-0 p-4 right-0 z-20 flex flex-col w-full md:w-1/3 bg-white shadow-lg transition-transform duration-500 ${showCities ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
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


                    {/* Footer */}
                    <Footer />
                </div>
            )}
        </>
    );
};

export default Home; 