import { Link, useNavigate } from "react-router-dom";
// import { UserCircleIcon } from '@heroicons/react/24/solid'; // Solid style
import { useEffect, useState } from "react";
import { UserCircleIcon } from '@heroicons/react/24/outline';

const Logout = () => {
    const navigate = useNavigate();
const [redirectTo, setRedirectTo] = useState('Chat');
    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/login');
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));

        if(user.role === 'client'){
            setRedirectTo('Chat');
        }else{
            setRedirectTo('Annonces')
        }
    }, []);
    return (
        <>
            <a className='text-gray-300 hover:text-yellow-600 transition-colors duration-300 transform rounded-lg' onClick={handleLogout}>
                <svg className="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                </svg>
            </a>

            <Link to={`https://monassabatmaroc.com/${redirectTo}`}>
                <UserCircleIcon className="h-10 w-10" />
            </Link>
        </>
    );
}

export default Logout;