import { Link } from "react-router-dom";
import logo from '/src/assets/logo.png';

const Logo = () => {
    return (
        <div className="gi-header-logo flex items-center self-center  ">
            {/* Logo link */}
            <Link to="/" className="header-logo text-left">
                <img
                    src={logo}
                    className="w-auto h-[40px] max-h-[40px] max-[1199px]:h-[40px] max-[991px]:h-[40px] max-[767px]:h-[40px] max-[575px]:h-[40px]"
                    alt="Site Logo"
                />
            </Link>
            
        </div>
    );
}

export default Logo;
