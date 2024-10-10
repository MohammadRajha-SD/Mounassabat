import { Link } from "react-router-dom";
import Logo from '../Navbar/Logo';
import '../Navbar/NavBar.css';
const Header = () => {
    return (
        <header className='gi-header gi-flex items-center flex-row justify-between md:px-10  py-2 border-b px-2 bg-white relative flex w-full '>
            <Logo />

            <Link to={'/AnnounceForm'} className="flex items-center justify-between text-white bg-yellow-600 p-2 m-2 md:px-8 rounded-md font-serif font-medium">
                Publier votre annonce
                <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </Link>
        </header>
    );
}

export default Header;