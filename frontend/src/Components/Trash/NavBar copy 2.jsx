/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useAnnonces } from './AnnonceContext.jsx';
import FilterAnnounces from './FilterAnnounces.jsx';
import HeaderAction from './Navbar/HeaderAction.jsx';
import CategoryMenu from './Navbar/CategoryMenu.jsx';
import Logo from './Navbar/Logo.jsx';

const NavBar = () => {
    const { filterAnnonces } = useAnnonces();
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [sousCategory, setSousCategory] = useState('');

    const handleCategoryChange = async (selectedCategory) => {
        setCategory(selectedCategory);
        setSubCategory('');
        setSousCategory('');
        await filterAnnonces(selectedCategory, '', '');
    };

    const handleSubCategoryChange = async (selectedSubCategory) => {
        setSubCategory(selectedSubCategory);
        setSousCategory('');
        await filterAnnonces(category, selectedSubCategory, '');
    };

    const handleSousCategoryChange = async (selectedSousCategory) => {
        setSousCategory(selectedSousCategory);
        await filterAnnonces(category, subCategory, selectedSousCategory);
    };

    return (
        <div>
            <header className="gi-header bg-white z-[14] max-[991px]:z-[16] relative p-[0] border-b border-solid border-[#eee] max-[991px]:py-[15px] max-[575px]:pt-[15px] max-[575px]:border-[0] max-[575px]:pb-[0] shadow-md">
                <div className="gi-flex flex flex-row justify-evenly  max-[575px]:p-[0] max-[575px]:flex-col">
                    <Logo />

                    <CategoryMenu
                        handleCategoryChange={handleCategoryChange}
                        handleSubCategoryChange={handleSubCategoryChange}
                        handleSousCategoryChange={handleSousCategoryChange} />

                    <HeaderAction />
                </div>
            </header >
            {/* 
            <div>
                <FilterAnnounces category={category} subCategory={subCategory} sousCategory={sousCategory} />
            </div> */}
        </div >
    );
};

export default NavBar;