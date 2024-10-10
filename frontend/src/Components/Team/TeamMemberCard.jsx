import React from 'react';

const TeamMemberCard = ({ image, name, title }) => {
    return (
        <div className="relative cursor-pointer bg-cover bg-center w-[260px] h-[350px] group overflow-hidden border border-gray-400">
            <img
                src={image}
                alt={`${name}'s image`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out transform scale-100 group-hover:scale-110"
            />
            <div className="absolute inset-0 rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out cursor-pointer from-black/80 to-transparent bg-gradient-to-t pt-30 text-white flex items-end">
                <div className="transform-gpu w-full text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transform transition duration-500 ease-in-out">
                    <div className="w-full bg-white py-3">
                        <h1 className="w-full text-black text-center font-serif font-medium text-2xl">{name}</h1>
                        <p className="text-gray-500 text-center font-serif font-medium text-md">{title}</p>

                        <div className="flex justify-center py-2 w-full gap-5">
                            <div className="bg-white px-2 py-2 border border-gray-400 rounded-full hover:border-yellow-600 duration-300">
                                <svg className="w-4 h-4 text-black hover:text-yellow-600 duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd" />
                                    <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                                </svg>
                            </div>

                            <div className="px-2 py-2 border border-gray-400 rounded-full hover:border-yellow-600 duration-300">
                                <svg className="w-4 h-4 text-black hover:text-yellow-600 duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd" />
                                </svg>
                            </div>

                            <div className="px-2 py-2 border border-gray-400 rounded-full hover:border-yellow-600 duration-300">
                                <svg className="w-4 h-4 text-black hover:text-yellow-600 duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamMemberCard;
