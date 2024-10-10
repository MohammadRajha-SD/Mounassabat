
import { Link } from "react-router-dom";

const HeaderAction = () => {

    return (
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
        </Link>
    );
}

export default HeaderAction;