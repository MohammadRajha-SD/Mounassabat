import React from 'react';
import Dropdown from './Dropdown.jsx';
import { Link } from 'react-router-dom';
import HeaderAction from './HeaderAction.jsx';
import './Index.css';
import { useState } from 'react';

const marriageSubCategories = [
    { name: 'Traiteur Pour Mariage' },
    {
        name: 'Lieu de réception',
        isDropdown: true,
        children: ['Salle de fete', 'Villa privée', 'Salle de Réception']
    },
    { name: 'Nagafa (Planification de marriage)' },
    { name: 'Tyafer / Chocolatier' },
    { name: 'Photographe et vidéographe' },
    {
        name: 'Musique',
        isDropdown: true,
        children: ['Orchester', 'Orcheste Chaabi / Tarab', 'DJ (Animateur)', 'Issawa / DQAYQYA', 'Awniyat', 'Amdah']
    },
    { name: 'Serveur Freelance' },
    { name: 'Femme de Menage Freelance' },
    { name: 'Agence de voyage (Lien de Miel)' },
    { name: 'Patisserie / Wedding Cake' },
    { name: 'Adoul / Cérémonie' },
    { name: 'Locataire des Robes de mariée et tenues pour le marié' }
];

const feteDeNaissanceSubCategories = [
    { name: 'Artiste ou Animateur', isDropdown: false },
    { name: 'Décorateur de Fete', isDropdown: false },
    { name: 'Henné', isDropdown: false },
    { name: 'Lieu de réception', isDropdown: false },
    { name: 'Location de matériel Patissier ou boulanger', isDropdown: false },
    { name: 'Photographer ou Vidéographer', isDropdown: false },
    { name: 'Traiteur Pour Sbouaa', isDropdown: false },
];

const babyShowerSubCategories = [
    {
        name: 'Agence Décoration',
        isDropdown: false,
    },
    {
        name: 'Patisserie / Wedding Cake',
        isDropdown: false,
    },
    {
        name: 'Traiteur Pour Baby Shower',
        isDropdown: false,
    },
];

const anniversaireSubCategories = [
    {
        name: 'Anniversaire Pour Enfants',
        isDropdown: true,
        children: [
            'Traiteur Pour Anniversaire Enfants',
            'Animateur',
            'Clown',
            'Patissier ou Boulanger',
            'Décorateur de Fete',
            'Lieu de Réception',
            'Photographe et Vidéographer',
            'Patisserie / Wedding Cake',
            'Locataire de jeux et d\'attractions',
        ],
    },
    {
        name: 'Anniversaire Pour Adultes',
        isDropdown: true,
        children: [
            'Traiteur Anniversaire Adulte',
            'Patissier ou Boulanger',
            'Décorateur de Fete',
            'Photographe et Vidéographer',
            'DJ ou groupe de Musique',
            'Lieu de Réception',
        ],
    },
];

const ConferenceSubCategories = [
    {
        name: "Colloque",
        isDropdown: true,
        children: [
            "Traiteur Conférence",
            "Salle Hotel"
        ]
    },
    {
        name: "Evénement professionnel",
        isDropdown: true,
        children: [
            "Traiteur Conférence",
            "Salle Hotel"
        ]
    },

    {
        name: "Séminaire",
        isDropdown: true,
        children: [
            "Traiteur Pour Séminaire",
            "Salle Hotel"
        ]
    }
];

const CategoryMenu = ({ handleCategoryChange, handleSubCategoryChange, handleSousCategoryChange }) => {
    const [visibleDropdowns, setVisibleDropdowns] = useState({});

    const [isServicesDropdownVisible, setServicesDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setServicesDropdownVisible(!isServicesDropdownVisible);
    };


    const toggleDropdown2 = (index) => {
        setVisibleDropdowns((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
        console.log(visibleDropdowns)
    };
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

            <ul className="menu-mobile menu px-2">
                <li>
                    <div className="dropdown" onClick={() => toggleDropdown2('marriage')}>
                        <Link to="#">Marriage</Link>
                        {true&& (
                            <ul className="dropdown-menu">
                                {marriageSubCategories.map((category, index) => (
                                    <li key={index}>
                                        {category.isDropdown ? (
                                            <div onClick={() => toggleDropdown2(index)} className="dropdown">
                                                <Link to="#">{category.name}</Link>
                                                {visibleDropdowns[index] && (
                                                    <ul className="sub-dropdown-menu">
                                                        {category.children.map((subCategory, subIndex) => (
                                                            <li key={subIndex}>
                                                                <Link to={`/${subCategory.toLowerCase().replace(/ /g, '-')}`}>
                                                                    {subCategory}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ) : (
                                            <Link to={`/${category.name.toLowerCase().replace(/ /g, '-')}`}>{category.name}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </li>

                <li>
                    <div className="dropdown" onClick={toggleDropdown}>
                        <Link to="#">Services</Link>
                        {isServicesDropdownVisible && (
                            <ul className="dropdown-menu">
                                <li><Link to="/service1">Service 1</Link></li>
                                <li><Link to="/service2">Service 2</Link></li>
                                <li><Link to="/service3">Service 3</Link></li>
                            </ul>
                        )}
                    </div>
                </li>
            </ul>

        </div>
    );
};

export default CategoryMenu;