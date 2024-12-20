import { useEffect, useState } from 'react';
import NavBar from "../Navbar/NavBar.jsx";
import backgroundQuiSommesNous from "../../assets/QuiSommeNous1.jpg";
// import facebook from "../../assets/facebook.png";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoginButtonGmail from './LoginButtonGmail.jsx';
import Loader from '../Loader/Index.jsx';
// import google from '../../assets/google.png';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            switch (user.role) {
                case 'admin':
                    navigate('/Dashboard');
                    break;
                case 'client':
                    navigate('/');
                    break;
                case 'prestataire':
                    navigate('/Annonces');
                    break;
                default:
                    navigate('/');
                    break;
            }
        }
    }, [navigate]);

    const submit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://mounassabat.ma/api/login', {
                email,
                password
            });
            const { token, user } = response.data;


            // Save token and user details in localStorage
            if (token && user) {
                if (user.is_banned) {
                    toast.error("Votre compte a ete suspendu.");
                } else {

                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));

                    toast.success("Connexion réussie ! Redirection...");

                    switch (user.role) {
                        case 'admin':
                            navigate('/Dashboard');
                            break;
                        case 'prestataire':
                            navigate('/Annonces');
                            break;
                        default:
                            navigate('/');
                            break;
                    }
                }
            } else {
                setError("Échec de la connexion. Veuillez réessayer.");
            }
        } catch (err) {
            setError('L\'adresse e-mail ou le mot de passe est incorrect.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center w-full h-[100vh]"><Loader /></div>
            ) : (
                <div>
                    <NavBar />
                    {/* style={{
                        backgroundImage: `url(${backgroundQuiSommesNous})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }} */}
                    <div className="w-full mx-auto" >
                        <div className="py-16">
                            <div className="mx-2 md:mx-32 bg-white rounded-lg shadow-lg">
                                <div className="py-5 text-center">
                                    {/* <h1 className="text-3xl font-serif font-bold text-yellow-600  mb-6">Bienvenue sur notre plateforme</h1> */}
                                    <h1 className="text-3xl font-serif font-bold text-[#e6cf8c] mb-6">sur Mounassabat.ma</h1>
                                    {/* <p className="text-lg text-gray-700 mb-8">Connectez-vous pour continuer ou créez un nouveau compte</p> */}

                                    <div className="px-2 md:px-12">
                                        <form onSubmit={submit}>
                                            <div className="relative flex items-center text-black mb-5">
                                                <span className="absolute">
                                                    <svg className="w-7 h-7 mx-3 text-gray-900 bg-gray-400 py-1 rounded-md" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>
                                                </span>
                                                <input
                                                    type="text"
                                                    placeholder="Email ou nom d'utilisateur"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="block w-full py-4 text-black font-serif text-lg placeholder-black bg-white border border-gray-200 rounded-md pl-11 pr-5 rtl:pr-11 rtl:pl-5 dark:border-gray-400 focus:border-gray-500 dark:focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                                />
                                            </div>


                                            <div className="relative flex items-center text-black mb-5">
                                                <span className="absolute">
                                                    <svg
                                                        className="w-7 h-7 mx-3 text-gray-900 bg-gray-400 py-1 rounded-md"
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
                                                            d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
                                                        />
                                                    </svg>
                                                </span>
                                                <input
                                                    type={isPasswordVisible ? "text" : "password"}
                                                    placeholder="Mot de passe"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="block w-full py-4 text-black font-serif text-lg placeholder-black bg-white border border-gray-200 rounded-md pl-11 pr-12 rtl:pr-11 rtl:pl-5 dark:border-gray-400 focus:border-gray-500 dark:focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setPasswordVisible(!isPasswordVisible)}
                                                    className="absolute right-3"
                                                >
                                                    {isPasswordVisible ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                                            <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                                            <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                                        </svg>

                                                    )}
                                                </button>
                                            </div>

                                            <div className="flex justify-between lg:flex-row flex-col mb-6">
                                                <Link to="/ClientRegister" className="font-serif font-medium text-black text-lg hover:underline cursor-pointer">Creer un nouveau compte</Link>
                                                <Link to="/ForgetPassword" className="font-serif font-medium text-[#e6cf8c] text-lg cursor-pointer hover:underline">Mot de passe oublie ?</Link>
                                            </div>

                                            {error && <p className="text-red-500 mb-4">{error}</p>}

                                            <div className="bg-yellow-600 w-full p-4 flex justify-center cursor-pointer rounded mb-6">
                                                <button type="submit" className="text-white font-serif font-bold text-lg text-center">Se connecter</button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="flex justify-center gap-3 px-2 items-center py-7">
                                        <div className="border-2 w-full border-dashed border-gray-400"></div>
                                        <h1 className="font-serif">ou</h1>
                                        <div className="border-2 w-full border-dashed border-gray-400"></div>
                                    </div>

                                    <div className="px-2 md:px-12">
                                        {/* <div className="flex gap-2 items-center text-center mb-4 bg-white shadow-none  border px-2 md:px-5 py-4">
                                            <img className="h-5 w-5" src={facebook} alt="Facebook" />
                                            <div className='flex justify-center items-center'>
                                                <h1 className="text-black font-serif font-medium text-center">Continuer avec Facebook</h1>
                                                <div>yyyy</div>
                                            </div>
                                        </div> */}

                                        {/* LOGO GMAIL */}
                                        {/* 
                                        <div className="flex gap-5 items-center text-center bg-white shadow-none  border px-2 md:px-10 py-4 cursor-pointer" onClick={handleGoogleClick}>
                                                <img className="h-8 w-8" src={google} alt="Google" />
                                                <h1 className="text-black font-serif font-medium text-lg">Continuer avec Google</h1>
                                        </div> 
                                        */}



                                        <LoginButtonGmail />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
