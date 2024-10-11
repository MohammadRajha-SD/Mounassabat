import { useEffect, useState } from 'react';
import NavBar from "../Navbar/NavBar.jsx";
import backgroundQuiSommesNous from "../../assets/QuiSommeNous1.jpg";
import facebook from "../../assets/facebook.png";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoginButtonGmail from './LoginButtonGmail.jsx';
import Loader from '../Loader/Index.jsx';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password
            });
            const { token, user } = response.data;

            // Save token and user details in localStorage
            if (token && user) {
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
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            setError('Invalid credentials');
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
                    <div className="w-full mx-auto" style={{
                        backgroundImage: `url(${backgroundQuiSommesNous})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}>
                        <div className="py-16">
                            <div className="mx-2 md:mx-32 bg-white rounded-lg shadow-lg">
                                <div className="py-5 text-center">
                                    <h1 className="text-3xl font-serif font-bold text-yellow-600  mb-6">Bienvenue sur notre plateforme</h1>
                                    <p className="text-lg text-gray-700 mb-8">Connectez-vous pour continuer ou créez un nouveau compte</p>

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
                                                    <svg className="w-7 h-7 mx-3 text-gray-900 bg-gray-400 py-1 rounded-md" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
                                                    </svg>
                                                </span>
                                                <input
                                                    type="password"
                                                    placeholder="Mot de passe"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="block w-full py-4 text-black font-serif text-lg placeholder-black bg-white border border-gray-200 rounded-md pl-11 pr-5 rtl:pr-11 rtl:pl-5 dark:border-gray-400 focus:border-gray-500 dark:focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                                />
                                            </div>

                                            <div className="flex justify-between lg:flex-row flex-col mb-6">
                                                <Link to="/ClientRegister" className="font-serif font-medium text-black text-lg hover:underline cursor-pointer">Créer un nouveau compte</Link>
                                                <h1 className="font-serif font-medium text-yellow-500 text-lg cursor-pointer hover:underline">Mot de passe oublié ?</h1>
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
                                        <div className="flex gap-5 items-center text-center mb-4 bg-white shadow-none  border px-2 md:px-10 py-4">
                                            <img className="h-8 w-8" src={facebook} alt="Facebook" />
                                            <h1 className="text-black font-serif font-medium text-lg">Continuer avec Facebook</h1>
                                        </div>

                                        {/* <div className="flex gap-5 items-center text-center bg-white shadow-none  border px-2 md:px-10 py-4">
                                    <img className="h-8 w-8" src={google} alt="Google" />
                                    <h1 className="text-black font-serif font-medium text-lg">Continuer avec Google</h1>
                                </div> */}

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
