import React, { useState } from 'react';

const Question = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleContent = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border border-gray-400 py-4 w-full rounded-md hover:border-none hover:shadow-md cursor-pointer duration-500 mb-5">
            <div className="px-14 flex justify-between items-center">
                <h1 className="text-lg text-gray-800 font-serif font-medium">{title}</h1>
                <div
                    className="border border-gray-400 rounded-full py-2 px-2 hover:border-yellow-600 duration-300 cursor-pointer"
                    onClick={toggleContent}
                >
                    <svg
                        className="w-6 h-6 text-black hover:text-yellow-600 duration-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m15 19-7-7 7-7"
                        />
                    </svg>
                </div>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} duration-500`}>
                <div className="py-4">
                    <div className="border bg-gray-400 w-full h-[3px]"></div>
                </div>

                <div className="px-14">
                    <p className="text-lg font-serif font-medium text-gray-800">{content}</p>
                </div>
            </div>
        </div>
    );
};

export default Question;
