import { useState } from "react";

const SubMenu = ({ subCategories, handleSubCategoryChange }) => {
    return (
        <ul className="sub-menu transition-all duration-[0.3s] ease-in-out mt-[15px] absolute z-[16] text-left opacity-0 invisible min-w-[205px] left-0 right-auto bg-[#fff] block rounded-[5px] border-[1px] border-solid border-[#eee] py-2 w-[410px] shadow-lg">
            {subCategories.map((sub, index) => (
                <li key={index} className={sub.isDropdown ? "dropdown position-static" : ""}>
                    <a
                        onClick={() => handleSubCategoryChange(sub.name)}
                        className="transition-all duration-[0.3s] ease-in-out leading-[20px] px-[20px] py-[4px] font-normal text-gray-800 capitalize flex justify-between items-center hover:text-yellow-600"
                    >
                        {sub.name}
                        {sub.isDropdown && <i className="fi-rr-angle-small-right text-black text-[18px]"></i>}
                    </a>
                    {sub.isDropdown && (
                        <ul className="sub-menu-child transition-all duration-[0.3s] ease-in-out mt-[15px] absolute z-[16] text-left opacity-0 invisible min-w-[205px] left-0 right-auto bg-[#fff] block rounded-[5px] border-[1px] border-solid border-[#eee] py-[5px]">
                            {sub.children.map((child, idx) => (
                                <li key={idx}>
                                    <a
                                        onClick={() => handleSubCategoryChange(child)}
                                        className="transition-all duration-[0.3s] ease-in-out leading-[20px] px-[20px] py-[4px] font-normal text-gray-800 capitalize flex justify-between items-center hover:text-yellow-600"
                                    >
                                        {child}
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

const Dropdown = ({ category, subCategories, handleCategoryChange, handleSubCategoryChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className="dropdown drop-list relative ml-[20px] mr-[30px] transition-all duration-[0.3s] ease-in-out max-[1199px]:ml-[15px]">
            <a
                onClick={() => {
                    handleCategoryChange(category);
                    setIsOpen(!isOpen);
                }}
                className="dropdown-arrow relative transition-all duration-[0.3s] ease-in-out py-[15px] text-[15px] leading-[60px] capitalize text-black flex items-center font-medium"
            >
                {category}
                <i className={`fi-rr-angle-small-right text-black text-[18px] ${isOpen ? "rotate-[90deg]" : ""}`}></i>
            </a>

            {isOpen && (
                <SubMenu
                    subCategories={subCategories}
                    handleSubCategoryChange={handleSubCategoryChange}
                />
            )}
        </li>
    );
};

export default Dropdown;
