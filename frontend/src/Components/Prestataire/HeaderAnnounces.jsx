import { Link } from "react-router-dom";
import Logo from '../Navbar/Logo';
import '../Navbar/NavBar.css';
import { useState } from "react";
import Logout from "../Navbar/Logout";
import SupportIcon from '../../assets/support-icon.png';
import Traduction from '../../assets/traduction.png';

const HeaderAnnounces = ({actived = 'Mes Annonces'}) => {
    const [active, setActive] = useState(actived);

    const LinkComponent = ({ name, to }) => {
        return (
            <div className="flex justify-between  items-center ">
                <Link to={to} onClick={() => setActive(name)} className={`duration-300 block px-4 py-2 font-semibold  text-gray-700 w-full hover:text-[#e6cf8c] ${active == name ? 'border-[#e6cf8c] border-b-2 text-[#e6cf8c] ' : ''}`}>
                    {name}
                </Link>
            </div>
        );
    }
    const LinkComponentMobile = ({ name, to }) => {
        return (
            <div className="flex justify-between  items-center border-b ">
                <Link to={to} onClick={() => setActive(name)} className={`duration-300 block px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200 w-full hover:text-[#e6cf8c] ${active == name ? 'bg-gray-200 text-[#e6cf8c] ' : ''}`}>
                    {name}
                </Link>
            </div>
        );
    }
    return (
        <header className='gi-header gi-flex items-center flex-row justify-between md:px-10  py-2 border-b px-2 bg-white relative flex w-full '>
            <Logo />

            <div className="hidden md:flex items-center ">
                <LinkComponent name={'Mes Annonces'} to={'/Annonces'} />
                <LinkComponent name={'Messages'} to={'/Chat'} />
                <LinkComponent name={'Favorites'} to={'/Favorites'} />
                <LinkComponent name={'Paramètres'} to={'/Parametres'} />
            </div>

            <input id="menu-toggle" className="flex md:hidden" type="checkbox" />
            <label className="menu-button-container mx-2 flex md:hidden" htmlFor="menu-toggle">
                <div className="menu-button"></div>
            </label>

            <ul className="menu-mobile menu z-50 bg-gray-50 border-none mt-3">
                <div className="dropdown " >
                    <LinkComponentMobile name={'Mes Annonces'} to={'/Annonces'} />
                    <LinkComponentMobile name={'Messages'} to={'/Messages'} />
                    <LinkComponentMobile name={'Favorites'} to={'/Favorites'} />
                    <LinkComponentMobile name={'Paramètres'} to={'/Parametres'} />

                    <Link to={'/AnnounceForm'} className="flex items-center justify-between text-white bg-[#e6cf8c] p-2 m-2 md:px-8 rounded-md font-serif font-medium">
                        Publier votre annonce
                        <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </Link>
                </div>
            </ul>


            <div className="hidden md:flex">
                <div className="flex items-center">
                    <Link to={'/support-us'}>
                        <img className="h-10 w-10 mr-2 rounded-full" src={SupportIcon} alt="" />
                    </Link>
                    
                    {/* <img className="h-10 w-10 rounded-full" src={Traduction} alt="" /> */}

                    <Link to={'/AnnounceForm'} className="flex items-center justify-between text-white bg-[#e6cf8c] p-2     rounded-md font-serif font-medium">
                        Publier votre annonce
                        <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </Link>

                    <Logout />
                </div>
            </div>
        </header>

    );
}

export default HeaderAnnounces;