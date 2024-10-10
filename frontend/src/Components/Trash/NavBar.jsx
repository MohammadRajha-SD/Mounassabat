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
            
            <header className='gi-header gi-flex flex-row justify-between bg-white relative  border-b border-solid max-[768px]:justify-between border-[#eee] shadow-md flex w-full '>
                <Logo />

                <CategoryMenu
                    handleCategoryChange={handleCategoryChange}
                    handleSubCategoryChange={handleSubCategoryChange}
                    handleSousCategoryChange={handleSousCategoryChange} />

                <HeaderAction />
            </header>

            <div>
                <FilterAnnounces category={category} subCategory={subCategory} sousCategory={sousCategory} />
            </div>
        </div >
    );
};

export default NavBar;