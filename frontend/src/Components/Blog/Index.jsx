import React from 'react';
import backgroundQuiSommesNous from "../../assets/QuiSommeNous1.jpg";
import Footer from "../Footer.jsx";
import { Link } from 'react-router-dom';
import NavBar from "../Navbar/NavBar";

const Blog = () => {
    return (
        <div className="bg-gray-100">
            <NavBar />
            
            {/* Section 1 Start */}
            <div className="container mx-auto rounded-b-lg my-3" style={{
                backgroundImage: `url(${backgroundQuiSommesNous})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}>
                <div className="flex items-center justify-center flex-col gap-5 py-6 md:py-10">
                    <h1 className="text-4xl md:text-6xl text-white font-bold font-serif text-center">Dernières nouvelles</h1>
                    <div
                        className="bg-gray-500 opacity-80 py-3 rounded-t-md flex justify-center items-center gap-2 px-3">
                        <Link to="/" className="text-white font-bold font-serif text-md hover:text-yellow-600 cursor-pointer duration-500">
                            Home
                        </Link>
                        <svg className="w-5 h-5 text-yellow-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 12H5m14 0-4 4m4-4-4-4" />
                        </svg>
                        <p className="text-white font-bold font-serif text-md">Blog</p>
                    </div>
                </div>
            </div>
            {/* Section 1 End */}

            <div className="container mx-auto py-10 flex flex-wrap">
                <div className="w-full md:w-2/3 p-4">
                    <div className="flex mb-6">
                        <input
                            className="flex-grow py-2 border border-gray-400 rounded-l-lg px-4"
                            type="text"
                            placeholder="Rechercher"
                        />
                        <button className="bg-black text-white px-4 rounded-r-lg">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                            </svg>
                        </button>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">Tag Cloud</h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="tag">React</span>
                            <span className="tag">JavaScript</span>
                            <span className="tag">CSS</span>
                            <span className="tag">Web Development</span>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 p-4">
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                        <p className="mb-4">Sign up to receive the latest updates and news.</p>
                        <input
                            className="w-full py-2 border border-gray-400 rounded px-4 mb-4"
                            type="email"
                            placeholder="Email"
                        />
                        <button className="bg-black text-white w-full py-2 rounded">Subscribe</button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Blog;