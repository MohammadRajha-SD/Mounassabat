import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import backgroundQuiSommesNous from "../../assets/QuiSommeNous1.jpg";
import Footer from "../Footer.jsx";
import NavBar from "../Navbar/NavBar";
import axios from 'axios';
import {toast} from 'react-toastify';
const Index = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/Login');
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/reclamation',
                { message },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            toast.success('Reclamation created successfully');

            setMessage('');
        } catch (error) {
            if (error.response && error.response.data.error === 'Only clients can create reclamations.') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/Login');
            } else {
                toast.error(error.response?.data?.error || 'Network Error');
            }
        }
    };

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
                    <h1 className="text-4xl md:text-6xl text-white font-bold font-serif text-center">Contact </h1>
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
                        <p className="text-white font-bold font-serif text-md">Contact Us</p>
                    </div>
                </div>
            </div>
            {/* Section 1 End */}

            <div className="container px-4 mx-auto my-5 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6">
                <div className="bg-white rounded-lg lg:w-1/2 w-full mt-10 lg:mt-0 shadow-md">
                    <div className="w-[90%] mx-auto py-12">
                        <h1 className="text-2xl lg:text-3xl font-serif font-medium text-center">Send a Message</h1>

                        <form onSubmit={handleSubmit} className="mt-6">
                            <div className="py-4">
                                <textarea
                                    className="w-full border-2 border-gray-400 py-3 px-4 placeholder:text-black placeholder:font-serif placeholder:text-lg"
                                    placeholder="Message *" name="message" id="message" rows="6" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                            </div>

                            <div className="bg-yellow-600 w-full lg:w-[40%] py-2 mx-auto text-center cursor-pointer rounded">
                                <button type="submit" className="text-white font-serif font-bold text-lg">Se connecter</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="lg:w-1/2 w-full text-center lg:text-left">
                    <div className="py-12 lg:py-24">
                        <h1 className="text-gray-500 font-serif font-medium text-lg lg:text-2xl">
                            Un clic, vos événements bien yedik<br />
                            Découvrons les meilleurs Prestataires des événements
                        </h1>

                        <div className="flex justify-center lg:justify-start gap-4 py-7">
                            <div className="border border-gray-400 p-3 rounded-full hover:text-yellow-600 hover:border-yellow-600 duration-500">
                                <svg className="w-6 h-6 text-black hover:text-yellow-600 duration-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd"
                                        d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div className="border border-gray-400 p-3 rounded-full hover:text-yellow-600 hover:border-yellow-600 duration-500">
                                <svg className="w-6 h-6 text-black hover:text-yellow-600 duration-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd"
                                        d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div className="border border-gray-400 p-3 rounded-full hover:text-yellow-600 hover:border-yellow-600 duration-500">
                                <svg className="w-6 h-6 text-black hover:text-yellow-600 duration-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path fill="currentColor" fill-rule="evenodd"
                                        d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Index;