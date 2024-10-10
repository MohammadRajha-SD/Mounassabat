import React from 'react';
import { Link } from "react-router-dom";
import backgroundQuiSommesNous from "../../assets/QuiSommeNous1.jpg";
import backgroundImage from "../../assets/image3.jpg";
import NavBar from "../Navbar/NavBar";
import Footer from "../Footer.jsx";
import Question from './Question.jsx';
const Index = () => {
    return (
        <div>
            <NavBar />

            {/* Section 1 Start */}
            <div className="container mx-auto rounded-b-lg my-3" style={{
                backgroundImage: `url(${backgroundQuiSommesNous})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}>
                <div className="flex items-center justify-center flex-col gap-5 py-6 md:py-10">
                    <h1 className="text-4xl md:text-6xl text-white font-bold font-serif text-center">Read FAQ</h1>
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
                        <p className="text-white font-bold font-serif text-md">FAQ</p>
                    </div>
                </div>
            </div>
            {/* Section 1 End */}


            <div className="container mx-auto px-3 py-2 ">
                <h1 className="text-3xl md:text-4xl font-serif font-medium text-yellow-500 mb-3">Géneral Questions</h1>

                <div class="flex flex-col md:flex-row items-start justify-between gap-4">
                    <div class="w-full md:w-[65%]">
                        <Question
                            title="Question #1"
                            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur consequuntur cum eveniet expedita nobis non numquam provident quod temporibus voluptates!"
                        />
                        <Question
                            title="Question #2"
                            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur consequuntur cum eveniet expedita nobis non numquam provident quod temporibus voluptates!"
                        />
                        <Question
                            title="Question #3"
                            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur consequuntur cum eveniet expedita nobis non numquam provident quod temporibus voluptates!"
                        />
                        <Question
                            title="Question #4"
                            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur consequuntur cum eveniet expedita nobis non numquam provident quod temporibus voluptates!"
                        />
                        <Question
                            title="Question #5"
                            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur consequuntur cum eveniet expedita nobis non numquam provident quod temporibus voluptates!"
                        />
                        <Question
                            title="Question #6"
                            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur consequuntur cum eveniet expedita nobis non numquam provident quod temporibus voluptates!"
                        />
                        <h1 class="text-3xl md:text-4xl font-serif font-medium text-yellow-500 py-5">Listing Management</h1>
                        <Question
                            title="Question #1"
                            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur consequuntur cum eveniet expedita nobis non numquam provident quod temporibus voluptates!"
                        />
                        <Question
                            title="Question #2"
                            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur consequuntur cum eveniet expedita nobis non numquam provident quod temporibus voluptates!"
                        />
                        <Question
                            title="Question #3"
                            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur consequuntur cum eveniet expedita nobis non numquam provident quod temporibus voluptates!"
                        />
                    </div>

                    <div class="w-full md:w-[35%]">
                        <div class="border border-gray-400">
                            <h1 class="text-md font-medium font-serif px-8 py-3">Useful Links</h1>
                            <div class="w-full bg-gray-400 h-[1px]"></div>
                            <div class="py-4 px-8">
                                <h1 class="font-bold hover:text-yellow-600 cursor-pointer duration-500 font-serif py-2">Contact Us</h1>
                                <h1 class="font-bold hover:text-yellow-600 cursor-pointer duration-500 font-serif py-2">Latest News</h1>
                                <h1 class="font-bold hover:text-yellow-600 cursor-pointer duration-500 font-serif py-2">Login and Register</h1>
                                <Link to="/Team" class="font-bold hover:text-yellow-600 cursor-pointer duration-500 font-serif py-2">Meet Our Team</Link>
                            </div>
                        </div>

                        <div class="bg-gray-400 rounded-lg mt-4">
                            <div class="py-4">
                                <h1 class="text-xl text-black font-medium font-serif text-center">Didn't find the answer?</h1>
                                <h1 class="text-xl text-black font-medium font-serif text-center">Ask us questions directly</h1>
                            </div>

                            <div class="py-4 px-6">
                                <div class="relative mb-8">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <svg class="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                        </svg>
                                    </div>
                                    <input type="text" class="bg-gray-50 text-gray-900 placeholder:text-gray-600 placeholder:font-serif placeholder:text-lg text-sm block w-full ps-10 py-4" placeholder="Name *" />
                                </div>

                                <div class="relative mb-8">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <svg class="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                        </svg>
                                    </div>
                                    <input type="text" class="bg-gray-50 text-gray-900 placeholder:text-gray-600 placeholder:font-serif placeholder:text-lg text-sm block w-full ps-10 py-4" placeholder="Email *" />
                                </div>

                                <div class="relative mb-8">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <svg class="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                        </svg>
                                    </div>
                                    <input type="text" class="bg-gray-50 text-gray-900 placeholder:text-gray-600 placeholder:font-serif placeholder:text-lg text-sm block w-full ps-10 py-4" placeholder="Phone *" />
                                </div>

                                <textarea class="bg-gray-50 text-gray-900 placeholder:text-gray-600 placeholder:p-4 placeholder:font-serif text-sm w-full mb-8" cols="30" rows="5" placeholder="Message *"></textarea>

                                <div class="flex justify-center gap-5 py-4">
                                    <input type="checkbox" />
                                    <h1 class="font-serif font-medium text-lg">I accept the <span class="text-yellow-600 underline">privacy policy</span></h1>
                                </div>

                                <div className="py-5">
                                    <button class="font-medium justify-between px-3  bg-yellow-600  items-center py-2 rounded border-4 w-[50%] mx-auto font-serif flex text-white">Send
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
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