import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const HeaderAction = () => {
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

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/login');
    }
    return (
        <div className="flex items-center mx-2">
            {role != 'client' && (
                <Link to="/AnnounceForm"
                    className="gi-header-action self-center max-[575px]:w-full max-[575px]:py-[10px] max-[575px]:bg-[#4b5966] mx-2 hidden lg:block">
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
                </Link>)}
            {user && (
                    <a className='text-gray-300 hover:text-yellow-600 transition-colors duration-300 transform rounded-lg' onClick={handleLogout}>
                        <svg className="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                        </svg>
                    </a>
            )}
        </div >
    );
}

export default HeaderAction;