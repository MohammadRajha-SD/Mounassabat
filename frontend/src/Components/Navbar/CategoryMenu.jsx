import React from 'react';
import Dropdown from './Dropdown.jsx';
import './NavBar.css';
import DropdownMobile from './DropdownMobile.jsx';
import Logout from './Logout.jsx';
import Login from './Login.jsx';
import { Link } from 'react-router-dom';

const marriageSubCategories = [
    {
        name: 'Traiteur Pour Mariage',
        slug: 'traiteur-pour-mariage',
    },
    {
        name: 'Lieu de réception',
        isDropdown: true,
        slug: 'lieu-de-reception',
        children: [
            { name: 'Salle de fete', slug: 'salle-de-fete' },
            { name: 'Villa privée', slug: 'villa-privee' },
            { name: 'Salle de Réception', slug: 'salle-de-reception' },
        ],
    },
    { name: 'Nagafa (Planification de marriage)', slug: 'nagafa' },
    { name: 'Tyafer / Chocolatier', slug: 'tyafer-chocolatier' },
    { name: 'Photographe et vidéographe', slug: 'photographe-videographe' },
    {
        name: 'Musique',
        isDropdown: true,
        slug: 'musique',
        children: [
            { name: 'Orchester', slug: 'orchester' },
            { name: 'Orcheste Chaabi / Tarab', slug: 'orcheste-chaabi-tarab' },
            { name: 'DJ (Animateur)', slug: 'dj-animateur' },
            { name: 'Issawa / DQAYQYA', slug: 'issawa-dqayqya' },
            { name: 'Awniyat', slug: 'awniyat' },
            { name: 'Amdah', slug: 'amdah' },
        ],
    },
    { name: 'Serveur Freelance', slug: 'serveur-freelance' },
    { name: 'Femme de Menage Freelance', slug: 'femme-de-menage-freelance' },
    { name: 'Agence de voyage (Lien de Miel)', slug: 'agence-de-voyage' },
    { name: 'Patisserie / Wedding Cake', slug: 'patisserie-wedding-cake' },
    { name: 'Adoul / Cérémonie', slug: 'adoul-ceremonie' },
    { name: 'Locataire des Robes de mariée et tenues pour le marié', slug: 'locataire-robes' },
];

const feteDeNaissanceSubCategories = [
    { name: 'Artiste ou Animateur', slug: 'artiste-ou-animateur', isDropdown: false },
    { name: 'Décorateur de Fete', slug: 'decorateur-de-fete', isDropdown: false },
    { name: 'Henné', slug: 'henne', isDropdown: false },
    { name: 'Lieu de réception', slug: 'lieu-de-reception', isDropdown: false },
    { name: 'Location de matériel Patissier ou boulanger', slug: 'location-de-materiel-patissier-boulanger', isDropdown: false },
    { name: 'Photographer ou Vidéographer', slug: 'photographer-ou-videographer', isDropdown: false },
    { name: 'Traiteur Pour Sbouaa', slug: 'traiteur-pour-sbouaa', isDropdown: false },
];

const babyShowerSubCategories = [
    {
        name: 'Agence Décoration',
        slug: 'agence-decoration',
        isDropdown: false,
    },
    {
        name: 'Patisserie / Wedding Cake',
        slug: 'patisserie-wedding-cake',
        isDropdown: false,
    },
    {
        name: 'Traiteur Pour Baby Shower',
        slug: 'traiteur-pour-baby-shower',
        isDropdown: false,
    },
];

const anniversaireSubCategories = [
    {
        name: 'Anniversaire Pour Enfants',
        slug: 'anniversaire-pour-enfants',
        isDropdown: true,
        children: [
            { name: 'Traiteur Pour Anniversaire Enfants', slug: 'traiteur-pour-anniversaire-enfants' },
            { name: 'Animateur', slug: 'animateur' },
            { name: 'Clown', slug: 'clown' },
            { name: 'Patissier ou Boulanger', slug: 'patissier-ou-boulanger' },
            { name: 'Décorateur de Fete', slug: 'decorateur-de-fete' },
            { name: 'Lieu de Réception', slug: 'lieu-de-reception' },
            { name: 'Photographe et Vidéographer', slug: 'photographe-et-videographer' },
            { name: 'Patisserie / Wedding Cake', slug: 'patisserie-wedding-cake' },
            { name: 'Locataire de jeux et d\'attractions', slug: 'locataire-de-jeux-et-attractions' },
        ],
    },
    {
        name: 'Anniversaire Pour Adultes',
        slug: 'anniversaire-pour-adultes',
        isDropdown: true,
        children: [
            { name: 'Traiteur Anniversaire Adulte', slug: 'traiteur-anniversaire-adulte' },
            { name: 'Patissier ou Boulanger', slug: 'patissier-ou-boulanger' },
            { name: 'Décorateur de Fete', slug: 'decorateur-de-fete' },
            { name: 'Photographe et Vidéographer', slug: 'photographe-et-videographer' },
            { name: 'DJ ou groupe de Musique', slug: 'dj-ou-groupe-de-musique' },
            { name: 'Lieu de Réception', slug: 'lieu-de-reception' },
        ],
    },
];

const ConferenceSubCategories = [
    {
        name: "Colloque",
        slug: "colloque",
        isDropdown: true,
        children: [
            { name: "Traiteur Conférence", slug: "traiteur-conference" },
            { name: "Salle Hotel", slug: "salle-hotel" }
        ]
    },
    {
        name: "Evénement professionnel",
        slug: "evenement-professionnel",
        isDropdown: true,
        children: [
            { name: "Traiteur Conférence", slug: "traiteur-conference" },
            { name: "Salle Hotel", slug: "salle-hotel" }
        ]
    },
    {
        name: "Séminaire",
        slug: "seminaire",
        isDropdown: true,
        children: [
            { name: "Traiteur Pour Séminaire", slug: "traiteur-pour-seminaire" },
            { name: "Salle Hotel", slug: "salle-hotel" }
        ]
    }
];


const CategoryMenu = ({ handleCategoryChange, handleSubCategoryChange, handleSousCategoryChange, user, role }) => {
    return (
        <div className='gi-main-menu '>
            {/* Menu for  desktop */}
            <ul className="menu-desktop justify-between items-center gap-4 transition-all duration-[0.3s] ease-in-out bg-[#fff] max-[769px]:hidden flex w-full max-[769px]:pt-3 ">
                <Dropdown
                    category="Marriage"
                    subCategories={marriageSubCategories}
                    handleCategoryChange={handleCategoryChange}
                    handleSubCategoryChange={handleSubCategoryChange}
                    handleSousCategoryChange={handleSousCategoryChange}
                />
                <Dropdown
                    category="Fete de naissance"
                    subCategories={feteDeNaissanceSubCategories}
                    handleCategoryChange={handleCategoryChange}
                    handleSubCategoryChange={handleSubCategoryChange}
                    handleSousCategoryChange={handleSousCategoryChange}
                />
                <Dropdown
                    category="Baby Shower"
                    subCategories={babyShowerSubCategories}
                    handleCategoryChange={handleCategoryChange}
                    handleSubCategoryChange={handleSubCategoryChange}
                    handleSousCategoryChange={handleSousCategoryChange}
                />
                <Dropdown
                    category="Anniversaire"
                    subCategories={anniversaireSubCategories}
                    handleCategoryChange={handleCategoryChange}
                    handleSubCategoryChange={handleSubCategoryChange}
                    handleSousCategoryChange={handleSousCategoryChange}
                />
                <Dropdown
                    category="Conférence"
                    subCategories={ConferenceSubCategories}
                    handleCategoryChange={handleCategoryChange}
                    handleSubCategoryChange={handleSubCategoryChange}
                    handleSousCategoryChange={handleSousCategoryChange}
                />
            </ul>

            <input id="menu-toggle" type="checkbox" />
            <label className="menu-button-container mx-2" htmlFor="menu-toggle">
                <div className="menu-button"></div>
            </label>

            <ul className="menu-mobile menu px-2 z-50">
                <DropdownMobile
                    category="Marriage"
                    subCategories={marriageSubCategories}
                    handleCategoryChange={handleCategoryChange}
                    handleSubCategoryChange={handleSubCategoryChange}
                />
                <DropdownMobile
                    category="Fete de naissance"
                    subCategories={feteDeNaissanceSubCategories}
                    handleCategoryChange={handleCategoryChange}
                    handleSubCategoryChange={handleSubCategoryChange}
                />

                <DropdownMobile
                    category="Baby Shower"
                    subCategories={babyShowerSubCategories}
                    handleCategoryChange={handleCategoryChange}
                    handleSubCategoryChange={handleSubCategoryChange}
                    handleSousCategoryChange={handleSousCategoryChange}
                />
                <DropdownMobile
                    category="Anniversaire"
                    subCategories={anniversaireSubCategories}
                    handleCategoryChange={handleCategoryChange}
                    handleSubCategoryChange={handleSubCategoryChange}
                    handleSousCategoryChange={handleSousCategoryChange}
                />
                <DropdownMobile
                    category="Conférence"
                    subCategories={ConferenceSubCategories}
                    handleCategoryChange={handleCategoryChange}
                    handleSubCategoryChange={handleSubCategoryChange}
                    handleSousCategoryChange={handleSousCategoryChange}
                />

                {user && (<div className='mx-2 mb-3'><Logout /></div>)}
                {!user && (<div className='mx-2 mb-3'><Login /></div>)}

                {role != 'client' && (
                    <Link to="/AnnounceForm" className="gi-header-action self-center max-[575px]:w-full max-[575px]:py-[10px] max-[575px]:bg-[#4b5966] mx-2 ">
                        <div className="text-white bg-yellow-600 py-2.5 px-3 rounded-md font-serif font-medium ">
                            <div className="flex justify-center items-center gap-x-4">
                                <button className="">Publier votre annonce</button>
                                <svg className="w-5 h-5 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                                        d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                )}
            </ul>
        </div>
    );
};

export default CategoryMenu;