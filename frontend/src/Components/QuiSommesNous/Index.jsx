import React from 'react';
import mosque from "../../assets/mosque.jpg";
import backgroundQuiSommesNous from "../../assets/QuiSommeNous1.jpg";
import QuiSommesNous2 from "../../assets/QuiSommesNous2.jpg";
import QuiSommesNous3 from "../../assets/QuiSommesNous3.jpg";
import QuiSommesNous4 from "../../assets/QuiSommesNous4.jpg";
import register from "../../assets/inscription.png";
import annonce from "../../assets/annonces.png";
import cup from "../../assets/cup.png";
import backgroundImage from "../../assets/image3.jpg";
import Footer from "../Footer.jsx";
import NavBar from "../Navbar/NavBar";
import { Link } from 'react-router-dom';
const Index = () => {
    return (
        <div>
            <NavBar />

            {/* Section 1 Start */}
            <div className="container mx-auto rounded-b-lg my-3" style={{
                backgroundImage: `url(${backgroundQuiSommesNous})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}>
                <div className="flex items-center justify-center flex-col gap-5 py-6 md:py-10">
                    <h1 className="text-4xl md:text-6xl text-white font-bold font-serif text-center">QUI SOMMES NOUS</h1>
                    <div
                        className="bg-gray-500 opacity-80 py-3 rounded-t-md flex justify-center items-center gap-2 px-3">
                        <Link to="/" className="text-white font-bold font-serif text-md hover:text-yellow-600 cursor-pointer duration-500">
                            Home
                        </Link>
                        <svg className="w-5 h-5 text-yellow-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 12H5m14 0-4 4m4-4-4-4" />
                        </svg>
                        <p className="text-white font-bold font-serif text-md">Qui Sommes-nous ?</p>
                    </div>
                </div>
            </div>
            {/* Section 1 End */}

            {/* Section 2 Start */}
            <div className="container mx-auto py-14 px-3">
                {/* First Section with Mosque Image and Text */}
                <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-24 items-center">
                    <img className="w-full lg:w-[700px] h-[300px] rounded-md" src={mosque} alt="Mosque" />
                    <div className="text-center lg:text-left">
                        <h1 className="text-black text-4xl font-medium font-serif">HARMONASSABA</h1>
                        <div className="py-8">
                            <p className="text-lg font-serif font-medium text-gray-500">
                                Une entreprise émergente à l'avant-garde de l'innovation, a obtenu la certification émanant de l'Autorité pour le Développement Digital (ADD), érigent ainsi son statut d'initiatrice de solutions web révolutionnaires au sein de l'industrie événementielle.
                            </p>
                            <p className="text-lg font-serif font-medium text-gray-500 mt-4">
                                Notre plateforme singulière se distingue en simplifiant l'élaboration d'événements, facilitant la mise en relation entre les clients et les prestataires de services.
                            </p>
                        </div>
                        <div className="flex justify-center lg:justify-start py-3 rounded-md items-center bg-yellow-600 px-4 w-[60%] lg:w-[40%] mx-auto lg:mx-0">
                            <button className="text-white font-serif font-medium text-md">Explore les annonces</button>
                            <svg className="w-5 h-5 text-white ml-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Second Section with Icons */}
                <div className="flex flex-col lg:flex-row justify-center text-center gap-5 py-14">
                    <div className="flex flex-col text-center items-center w-full lg:w-[30%]">
                        <img className="h-24 w-24 bg-yellow-600 rounded-full px-2 py-2" src={register} alt="Register" />
                        <h1 className="text-center text-2xl font-serif font-medium py-5">S'inscrire</h1>
                        <p className="text-gray-500 font-serif font-medium text-lg">En vous inscrivant sur notre plateforme, vous pouvez tout de suite profiter d'un tableau de bord rempli d'outils pratiques pour mieux gérer vos clients.</p>
                    </div>
                    <div className="flex flex-col text-center items-center w-full lg:w-[30%]">
                        <img className="h-24 w-24 bg-yellow-600 rounded-full px-2 py-2" src={annonce} alt="Post Ad" />
                        <h1 className="text-center text-2xl font-serif font-medium py-5">Publier votre annonce</h1>
                        <p className="text-gray-500 font-serif font-medium text-lg">Quand vous publiez votre annonce avec des images sur notre site, vous avez de fortes chances de rencontrer de nouveaux clients.</p>
                    </div>
                    <div className="flex flex-col text-center items-center w-full lg:w-[30%]">
                        <img className="h-24 w-24 bg-yellow-600 rounded-full px-2 py-2" src={cup} alt="Discover Clients" />
                        <h1 className="text-center text-2xl font-serif font-medium py-5">Découvrir des nouveaux clients</h1>
                        <p className="text-gray-500 font-serif font-medium text-lg">Explorez et connectez-vous avec une clientéle désireuse d'organiser des événements exceptionnels!</p>
                    </div>
                </div>

                {/* Third Section with Text and Image */}
                <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-24 items-center py-10">
                    <div className="py-8">
                        <p className="text-gray-500 font-serif font-medium text-lg">Mounassabat.ma incarne la fusion subtile entre technologie et créativité. Notre site web est intuitif, accessible même pour les novices en matière de planification d'événements.</p>
                        <p className="text-gray-500 font-serif font-medium text-lg mt-4">Notre logiciel spécialisé dédié aux prestataires de services événementiels permet une gestion efficiente des stocks et optimise les opérations.</p>
                    </div>
                    <img className="w-full lg:w-[700px] h-[300px] rounded-md" src={QuiSommesNous2} alt="Qui Sommes Nous 2" />
                </div>

                {/* Fourth Section with Image and Text */}
                <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-24 items-center py-16">
                    <img className="w-full lg:w-[700px] h-[300px] rounded-md" src={QuiSommesNous3} alt="Qui Sommes Nous 3" />
                    <div className="py-8">
                        <p className="text-gray-500 font-serif font-medium text-lg">Quant à l'origine de notre projet, celle-ci émane d'une constatation profonde lors du parcours doctoral de nombreux chercheurs.</p>
                        <p className="text-gray-500 font-serif font-medium text-lg mt-4">Organisateurs de conférences, ils ont éprouvé des difficultés à dénicher des espaces de formation adaptés et des traiteurs à la hauteur. C'est ainsi que germa l'idée novatrice de créer cette plateforme.</p>
                    </div>
                </div>

                {/* Fifth Section with Text and Image */}
                <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-24 items-center py-10">
                    <div className="py-8">
                        <p className="text-gray-500 font-serif font-medium text-lg">Par ailleurs, HARMONASSABA va au-delà de la simple planification d'événements. Nous entreprenons une démarche pionnière dans la digitalisation de divers secteurs.</p>
                        <p className="text-gray-500 font-serif font-medium text-lg mt-4">Nous oeuvrons en partenariat avec des clients pour élaborer des stratégies marketing et numériser leurs projets et services sur les réseaux sociaux tels que Google ADS, Instagram, Facebook, YouTube.</p>
                    </div>
                    <img className="w-full lg:w-[700px] h-[300px] rounded-md" src={QuiSommesNous4} alt="Qui Sommes Nous 4" />
                </div>
            </div>
            {/* Section 2 End */}

            {/* Section 3 Start */}
            <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
                className="flex flex-col justify-center items-center text-center py-10"
            >
                <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto">
                    <h1 className="text-black text-2xl md:text-3xl lg:text-4xl font-serif font-medium py-5">
                        S'inscrire pour recevoir les dernières mises à jour et nouvelles
                    </h1>
                    <div className="bg-white w-full px-4 py-3 rounded-full shadow-xl">
                        <div className="flex gap-4">
                            <input
                                className="py-3 md:py-5 border-none focus:outline-none focus:ring-0 focus:border-none active:border-none w-full placeholder:text-black px-4 md:px-5 placeholder:font-serif placeholder:text-md"
                                type="text" placeholder="Email" />
                            <button className="bg-black flex justify-center items-center rounded-full px-5">
                                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 12H5m14 0-4 4m4-4-4-4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Section 3 End */}

            <Footer />
        </div>
    );
};

export default Index;