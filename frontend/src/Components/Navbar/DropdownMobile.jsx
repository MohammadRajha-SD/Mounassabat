import React, { useState } from "react";

const DropdownMobile = ({
  category,
  subCategories,
  handleCategoryChange,
  handleSubCategoryChange,
  handleSousCategoryChange
}) => {
  const [visibleDropdowns, setVisibleDropdowns] = useState({});

  const toggleDropdown = (slug) => {
    setVisibleDropdowns((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <div className="dropdown " onClick={() => toggleDropdown(category)}>
      <div className="flex justify-between items-center">
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
          {category}
        </a>
        <svg
          className="w-5 h-5 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {visibleDropdowns[category] && (
        <ul className="dropdown-menu relative shadow-none bg-white border rounded-md submenu-scrolled">
          {subCategories.map((categoryItem, index) => (
            <li key={index}>
              <div
                className="dropdown w-full inline-block relative"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(categoryItem.slug);
                }}
              >
                <div className="flex justify-between items-center">
                  <a
                    href="#"
                    onClick={() => handleCategoryChange(categoryItem.slug)}
                    className="block px-2 text-gray-700 hover:bg-gray-200"
                  >
                    {categoryItem.name}
                  </a>

                  {categoryItem.isDropdown && (
                    <svg
                      className="w-5 h-5 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>

                {/* Subcategory Dropdown */}
                {visibleDropdowns[categoryItem.slug] && categoryItem.isDropdown && (
                  <ul className="submenu-scrolled absolute left-0 my-2 w-full bg-gray-200  border rounded-md">
                    {categoryItem.children.map((subCategory, subIndex) => (
                      <li key={subIndex} >
                        <a
                          href="#"
                          onClick={() =>
                            handleSubCategoryChange(subCategory.slug)
                          }
                          className="block px-2 text-gray-700 hover:bg-gray-200"
                        >
                          {subCategory.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMobile;
