import { useState, useEffect } from 'react';
import HeaderAction from './HeaderAction.jsx';
import CategoryMenu from './CategoryMenu.jsx';
import Logo from './Logo.jsx';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout.jsx';
import Login from './Login.jsx';


const NavBar = () => {
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [sousCategory, setSousCategory] = useState('');
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('client');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (token) {
            setUser(user);
            setRole(user.role);
        } else {
            setUser(null);
            setRole('client');
        }
    }, [navigate]);

    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
        setSubCategory('');
        setSousCategory('');
        filterButton(selectedCategory, '', '');
    };

    const handleSubCategoryChange = (selectedSubCategory) => {
        setSubCategory(selectedSubCategory);
        setSousCategory('');
        filterButton(category, selectedSubCategory, '');
    };

    const handleSousCategoryChange = (selectedSousCategory) => {
        setSousCategory(selectedSousCategory);
        filterButton(category, subCategory, selectedSousCategory);
    };

    const filterButton = (category, subCategory, sousCategory) => {
        if (category || subCategory || sousCategory) {
            const queryParams = new URLSearchParams();
            if (category) queryParams.append('category', category);
            if (subCategory) queryParams.append('subCategory', subCategory);
            if (sousCategory) queryParams.append('sousCategory', sousCategory);

            navigate(`/FiltredAnnounces?${queryParams.toString()}`);
        }
    };

    return (
        <div>
            <header className='gi-header gi-flex flex-row items-center justify-between bg-white relative  border-b border-solid  border-[#eee] shadow-md flex w-full '>

                <Logo />

                <CategoryMenu
                    handleCategoryChange={handleCategoryChange}
                    handleSubCategoryChange={handleSubCategoryChange}
                    handleSousCategoryChange={handleSousCategoryChange}
                    user={user}
                    role={role}
                />

                <div className='items-center  hidden lg:flex'>
                    {role != 'client' && (<HeaderAction />)}

                    {user && (<Logout />)}
                    {!user && (<Login />)}
                </div>
            </header>

            <div>
                {/* <FilterAnnounces category={category} subCategory={subCategory} sousCategory={sousCategory} /> */}
            </div>
        </div >
    );
};

export default NavBar;