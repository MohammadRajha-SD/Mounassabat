import React, { useState } from 'react';
import NavBar from '../Navbar/NavBar.jsx';
import { useNavigate, Link } from 'react-router-dom';
import backgroundQuiSommesNous from "../../assets/QuiSommeNous1.jpg";
import axios from 'axios';
import Loader from '../Loader/Index.jsx';
import { toast } from 'react-toastify';
import RegisterProviderButtonGmail from './RegisterPrestataireButtonGmail.jsx';

const validate = (formData) => {
    let errors = {};
    const nameRegex = /^[A-Za-z]{1,30}$/;

    if (!formData.firstName) {
        errors.firstName = "First Name is required";
    } else if (!nameRegex.test(formData.firstName)) {
        errors.firstName = "First Name must be only letters and max 30 characters";
    }

    if (!formData.lastName) {
        errors.lastName = "Last Name is required";
    } else if (!nameRegex.test(formData.lastName)) {
        errors.lastName = "Last Name must be only letters and max 30 characters";
    }

    if (!formData.phone) {
        errors.phone = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
        errors.phone = "Phone Number must be 10 digits";
    }

    if (!formData.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email address is invalid";
    }

    if (!formData.password) {
        errors.password = "Password is required";
    } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    return errors;
};

const PrestataireRegister = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        role: 'prestataire',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(formData);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://mounassabat.ma/api/register', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201 || response.status === 200) {
                navigate('/login');
                toast.success('Inscription réussie, veuillez vous connecter');
            } else if (response.status === 409) {
                toast.error('L\'adresse e-mail est déjà enregistrée.');
            }
        } catch (error) {
            toast.error('L\'adresse e-mail est déjà enregistrée.');
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
                        }} */}

                    <div
                        className="w-full mx-auto bg-cover bg-no-repeat"

                    >
                        <div className="py-10">
                            <div className="max-w-lg mx-2 md:mx-auto bg-white py-10 px-3 rounded-lg shadow-lg">
                                <h1 className="text-3xl font-serif font-bold tracking-wider text-black capitalize text-center">
                                    INSCRIVEZ-VOUS COMME PRESTATAIRE
                                </h1>

                                <div className="flex justify-end mt-3  px-4">
                                    <Link
                                        to="/ClientRegister"
                                        className="flex justify-center items-center font-serif font-medium w-full px-6 py-3 mt-4 text-white border bg-black rounded-lg cursor-pointer hover:bg-yellow-600 transition-colors duration-500"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        <span className="mx-2">OU CLIENT</span>
                                    </Link>
                                </div>

                                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1  px-4">
                                    {[
                                        { label: "Prenom", name: "firstName", type: "text" },
                                        { label: "Nom de famille", name: "lastName", type: "text" },
                                        { label: "Adresse email", name: "email", type: "email" },
                                        { label: "Mot de passe", name: "password", type: "password" },
                                        { label: "Numero de telephone", name: "phone", type: "tel" },
                                    ].map((field) =>
                                        field.name === 'password' ? (
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
                                            value={formData[field.name]}
                                            onChange={handleChange}
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

                                        ) : (
                                            <div key={field.name} >
                                                <label className="block mb-2 text-sm text-black font-medium font-serif">
                                                    {field.label}
                                                </label>
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    className={`block w-full px-5 py-3 border ${errors[field.name] ? "border-red-500" : "border-gray-300"
                                                        } mt-2 text-gray-700 placeholder-gray-400 bg-white rounded-lg focus:border-yellow-600 focus:ring focus:outline-none`}
                                                />
                                                {
                                                    errors[field.name] && (
                                                        <p className="text-red-500 font-serif font-medium text-xs mt-1">
                                                            {errors[field.name]}
                                                        </p>
                                                    )
                                                }
                                            </div>
                                        ))}

                                  
                                    <input type="hidden" name="role" value={formData.role} />

                                    <button
                                        type="submit"
                                        className="flex items-center justify-between w-full px-6 h-12 mt-7 text-sm text-white bg-black rounded-lg hover:bg-gray-900 transition-colors duration-300"
                                    >
                                        <span>S'inscrire</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </form>

                                <div className="flex justify-center gap-3 px-2 items-center py-7">
                                    <div className="border-2 w-full border-dashed border-gray-400"></div>
                                    <h1 className="font-serif">ou</h1>
                                    <div className="border-2 w-full border-dashed border-gray-400"></div>
                                </div>

                                <div className="px-2 md:px-12">
                                    <RegisterProviderButtonGmail />
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            )}
        </>
    );
};

export default PrestataireRegister;
