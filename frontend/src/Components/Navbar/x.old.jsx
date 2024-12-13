import { useState, useEffect } from 'react';
import HeaderAction from './HeaderAction.jsx';
import CategoryMenu from './CategoryMenu.jsx';
import Logo from './Logo.jsx';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout.jsx';
import Login from './Login.jsx';
import SupportIcon from '../../assets/support-icon.png';
import Traduction from '../../assets/traduction.png';
import { Link } from "react-router-dom";

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
                    <Link to={'http://wa.me/212663704955'}>
                        <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">

                            <g id="SVGRepo_bgCarrier" stroke-width="0" />

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                            <g id="SVGRepo_iconCarrier"> <title>support</title> <rect width="24" height="24" fill="none" /> <path d="M12,2a8,8,0,0,0-8,8v1.9A2.92,2.92,0,0,0,3,14a2.88,2.88,0,0,0,1.94,2.61C6.24,19.72,8.85,22,12,22h3V20H12c-2.26,0-4.31-1.7-5.34-4.39l-.21-.55L5.86,15A1,1,0,0,1,5,14a1,1,0,0,1,.5-.86l.5-.29V11a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1v5H13.91a1.5,1.5,0,1,0-1.52,2H20a2,2,0,0,0,2-2V14a2,2,0,0,0-2-2V10A8,8,0,0,0,12,2Z" /> </g>

                        </svg>
                    </Link>

                    <img className="h-10 w-10 rounded-full" src={Traduction} alt="" />

                    {user && (<Logout />)}
                    {!user && (<Login />)}

                    {/* {role != 'client' && (<HeaderAction />)} */}
                    <HeaderAction role={role} />

                </div>
            </header>

            <div>
                {/* <FilterAnnounces category={category} subCategory={subCategory} sousCategory={sousCategory} /> */}
            </div>
        </div >
    );
};

export default NavBar;