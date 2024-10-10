import { Link } from "react-router-dom";
import logo from '/src/assets/logo.png';
import Logo from '../Navbar/Logo';
const HeaderAnnounces = ({ annc_length }) => {
    return (
        <header className="gi-header bg-[#fff] z-[14] max-[991px]:z-[16] relative">
            <div className="gi-header-bottom p-[0] border-b-[1px] border-solid border-[#eee] max-[991px]:py-[15px] min-[992px]:block max-[575px]:pt-[15px] max-[575px]:border-[0] max-[575px]:pb-[0] shadow-md">
                <div className="flex flex-wrap justify-between items-center mx-auto min-[1600px]:max-w-[1600px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px] relative">
                    <div className="w-full flex flex-wrap px-[12px] max-[575px]:p-[0]">
                        <div className="gi-flex flex flex-row justify-between w-full max-[575px]:p-[0] max-[575px]:flex-col">
                            <Logo />

                            {annc_length >= 5 ? (
                                <Link to="/" className="gi-header-action self-center max-[575px]:w-full max-[575px]:py-[10px] max-[575px]:bg-[#4b5966] w-[400px]">
                                    <div className="text-white bg-yellow-900 py-3.5 px-8 rounded-md font-serif font-medium ">
                                        <div className="flex justify-center items-center gap-10">
                                            <button className="">Améliorer à Premium</button>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <Link to="/AnnounceForm" className="gi-header-action self-center max-[575px]:w-full max-[575px]:py-[10px] max-[575px]:bg-[#4b5966] w-[400px]">
                                    <div className="text-white bg-yellow-600 py-3.5 px-8 rounded-md font-serif font-medium ">
                                        <div className="flex justify-center items-center gap-10">
                                            <button className="">Publier votre annonce</button>
                                            <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>

    );
}

export default HeaderAnnounces;