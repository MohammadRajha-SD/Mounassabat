import React from 'react';
import backgroundQuiSommesNous from "../../assets/QuiSommeNous1.jpg";
import walid from "../../assets/Walid.jpg";
import backgroundImage from "../../assets/image3.jpg";
import Footer from "../Footer.jsx";
import informaticien from "../../assets/informaticien.jpeg";
import designer from "../../assets/designer.jpeg";
import abderahmane from "../../assets/abderahmane.jpeg";
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import TeamMemberCard from './TeamMemberCard'; 
const Index = () => {
    return (
        <div>
            <Header />

            {/* Section 1 Start */}
            <div className="container mx-auto rounded-b-lg my-3" style={{
                backgroundImage: `url(${backgroundQuiSommesNous})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}>
                <div className="flex items-center justify-center flex-col gap-5 py-6 md:py-10">
                    <h1 className="text-4xl md:text-6xl text-white font-bold font-serif text-center">Our Team</h1>
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
                        <p className="text-white font-bold font-serif text-md">Our Team</p>
                    </div>
                </div>
            </div>
            {/* Section 1 End */}

            <div className="container mx-auto py-20 px-4">
                {/* Card 1 start */}
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Image and Icons Section */}
                    <div className="w-full lg:w-1/2 mx-auto rounded-lg overflow-hidden relative">
                        <div
                            className="h-[60vh] md:h-[95vh] bg-cover bg-no-repeat"
                            style={{ backgroundImage: `url(${informaticien})` }}
                        />
                        <div className="absolute inset-0 flex justify-center items-end mb-2">
                            <div className="flex gap-5">
                                {["M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z",
                                    "M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z",
                                    "M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z",
                                    "M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                                ].map((pathData, index) => (
                                    <div key={index} className="bg-white p-3 rounded-full shadow-md">
                                        <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d={pathData} clipRule="evenodd" />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Profile Section */}
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-serif font-medium">Karim HASRAOUI</h1>
                        <p className="py-5 text-gray-500 font-serif font-medium text-lg">Customer Advisor</p>
                        <p className="py-5 text-gray-500 font-serif font-medium text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, animi aspernatur deserunt eaque est eum, explicabo inventore laudantium maxime natus necessitatibus, nesciunt nobis nostrum qui repellat sapiente vero. Accusamus, voluptas?
                        </p>

                        <div className="flex items-center gap-5 border border-gray-400 w-full px-8 py-4 rounded-lg mb-3">
                            <div className="border border-gray-400 rounded-full p-3">
                                <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15h12M6 6h12m-6 12h.01M7 21h10a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1Z" />
                                </svg>
                            </div>
                            <h1 className="text-black font-serif font-medium">(123) 345-6897</h1>
                        </div>
                        <div className="flex items-center gap-5 border border-gray-400 w-full px-8 py-4 rounded-lg">
                            <div className="border border-gray-400 rounded-full p-3">
                                <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                                </svg>
                            </div>
                            <h1 className="text-black font-serif font-medium">Olivia@tangibledesign.net</h1>
                        </div>
                    </div>
                </div>
                {/* Card 1 end */}

                <div className="py-10 flex flex-col justify-center items-center">
                    <h1 className="text-gray-500 bg-gray-400 font-serif font-medium px-4 md:px-14 py-2 rounded-md w-full md:w-auto text-center shadow-md">
                        Our Team
                    </h1>
                    <h1 className="text-yellow-500 font-serif font-medium text-4xl  md:text-5xl text-center py-8">
                        The Geniuses Behind Our Work
                    </h1>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                <TeamMemberCard image={walid} name="Walid LHAILA" title="Web Developer" />
                <TeamMemberCard image={designer} name="Fatimaezahra ESSIAD" title="Designer Web" />
                <TeamMemberCard image={abderahmane} name="Abderahmane EL HAFIDI" title="Web Developer" />
                </div>
            </div>


            {/* Section 3 Start */}
            <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
                className="flex flex-col justify-center items-center text-center py-10"
            >
                <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto">
                    <h1 className="text-black text-2xl md:text-3xl lg:text-4xl font-serif font-medium py-5">
                        Sign up to receive the latest updates and news
                    </h1>
                    <div className="bg-white w-full px-4 py-3 rounded-full shadow-xl">
                        <div className="flex gap-4">
                            <input
                                className="py-3 md:py-5 border-none focus:outline-none focus:ring-0 focus:border-none active:border-none w-full placeholder:text-black px-4 md:px-5 placeholder:font-serif placeholder:text-md"
                                type="text" placeholder="Email" />
                            <button className="bg-black flex justify-center items-center rounded-full px-5">
                                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 12H5m14 0-4 4m4-4-4-4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Section 3 End */}

            <Footer />
        </div>
    );
};

export default Index;