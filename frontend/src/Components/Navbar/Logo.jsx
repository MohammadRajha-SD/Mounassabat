import { Link } from "react-router-dom";
import logo from '/src/assets/logo.png';

const Logo = () => {
    return (
        <div className="gi-header-logo flex items-center self-center  ">
            {/* Logo link */}
            <Link to="/" className="header-logo text-left">
                <img
                    src={logo}
                    className="w-auto h-[50px] max-h-[50px] max-[1199px]:h-[50px] max-[991px]:h-[50px] max-[767px]:h-[50px] max-[575px]:h-[50px]"
                    alt="Site Logo"
                />
            </Link>
            
        </div>
    );
}

export default Logo;
