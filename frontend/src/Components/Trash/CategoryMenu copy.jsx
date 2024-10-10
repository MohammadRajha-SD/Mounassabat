import React from 'react';
import Dropdown from './Dropdown.jsx';

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
    return (





        
        <div className="gi-header-cat transition-all duration-[0.3s] w-full ease-in-out bg-[#fff] hidden min-[992px]:block">
            <div className="flex flex-wrap justify-between items-center mx-auto min-[1600px]:max-w-[1600px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px] relative">
                <div className="gi-nav-bar flex flex-row justify-between relative w-full px-[12px]">
                    <div id="gi-main-menu-desk" className="w-full flex items-center min-[992px]:block ">
                        <div className="nav-desk">
                            <div className="w-full flex flex-wrap px-[12px] min-[1400px]:relative">
                                <div className="basis-auto w-full self-center">
                                    <div className="gi-main-menu flex">
                                        <ul className="w-full flex  justify-between align-center">
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
                                                category="BabyShower"
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryMenu;