import { Link } from "react-router-dom";

const SubMenu = ({ subCategories, handleSubCategoryChange, handleSousCategoryChange }) => {
    return (
        <ul className="sub-menu transition-all duration-[0.3s] ease-in-out mt-[15px] absolute z-[16] text-left opacity-0 invisible min-w-[125px] left-0 right-auto bg-[#fff] rounded-[5px] border-[1px] border-solid border-[#eee] py-2 w-[225px] shadow-lg">
            {subCategories.map((sub, index) => (
                <li key={index} className={sub.isDropdown ? "dropdown position-static" : ""}>
                    <a
                        onClick={() => handleSubCategoryChange(sub.slug)} // Use slug instead of name
                        className="transition-all duration-[0.3s] ease-in-out leading-[20px] px-[20px] py-[4px] font-normal text-gray-800 capitalize flex justify-between items-center hover:text-yellow-600"
                    >
                        {sub.name}
                        {sub.isDropdown && <i className="fi-rr-angle-small-right text-black text-[18px]"></i>}
                    </a>

                    {sub.isDropdown && (
                        <ul className="sub-menu sub-menu-child transition-all duration-[0.3s] ease-in-out mt-[15px] absolute z-[16] text-left opacity-0 invisible min-w-[205px] left-0 right-auto bg-[#fff] block rounded-[5px] border-[1px] border-solid border-[#eee] py-[5px]">
                            {sub.children.map((child, idx) => (
                                <li key={idx}>
                                    <a
                                        onClick={() => handleSousCategoryChange(child.slug)} // Use slug for children
                                        className="transition-all duration-[0.3s] ease-in-out leading-[20px] px-[20px] py-[4px] font-normal text-gray-800 capitalize flex justify-between items-center hover:text-yellow-600"
                                    >
                                        {child.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};
const Dropdown = ({ category, subCategories, handleCategoryChange, handleSubCategoryChange, handleSousCategoryChange }) => {
    return (
        <li className="dropdown drop-list relative transition-all duration-[0.3s] ease-in-out">
            <Link
                onClick={() => handleCategoryChange(category)} // Category handling stays the same
                className="dropdown-arrow relative transition-all duration-[0.3s] ease-in-out py-[15px] text-[15px] capitalize text-black flex items-center font-medium"
            >
                {category}
                <i className={`fi-rr-angle-small-right text-black text-[18px] rotate-[90deg]`}></i>
            </Link>

            <SubMenu
                subCategories={subCategories}
                handleSubCategoryChange={handleSubCategoryChange}
                handleSousCategoryChange={handleSousCategoryChange}
            />
        </li>
    );
};

export default Dropdown;
