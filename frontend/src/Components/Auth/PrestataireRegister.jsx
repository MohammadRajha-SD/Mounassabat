import React, { useState } from 'react';
import NavBar from '../Navbar/NavBar.jsx';
import { useNavigate, Link } from 'react-router-dom';
import backgroundQuiSommesNous from "../../assets/QuiSommeNous1.jpg";
import axios from 'axios';
import Loader from '../Loader/Index.jsx';
import { toast } from 'react-toastify';

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
            const response = await axios.post('http://127.0.0.1:8000/api/register', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                navigate('/login');
                toast.success('Inscription réussie, veuillez vous connecter');
            }
        } catch (error) {
            console.error('Error adding user:', error.response ? error.response.data : error.message);
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


                    <div
                        className="w-full mx-auto bg-cover bg-no-repeat"
                        style={{
                            backgroundImage: `url(${backgroundQuiSommesNous})`,
                        }}
                    >
                        <div className="py-10">
                            <div className="max-w-lg mx-2 md:mx-auto bg-white py-10 px-3 rounded-lg shadow-lg">
                                <h1 className="text-3xl font-serif font-bold tracking-wider text-black capitalize text-center">
                                    SIGN UP AS PRESTATAIRE
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
                                        <span className="mx-2">OR CLIENT</span>
                                    </Link>
                                </div>

                                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2  px-4">
                                    {[
                                        { label: "First Name", name: "firstName", type: "text" },
                                        { label: "Last Name", name: "lastName", type: "text" },
                                        { label: "Email Address", name: "email", type: "email" },
                                        { label: "Password", name: "password", type: "password" },
                                        { label: "Phone Number", name: "phone", type: "tel" },
                                    ].map((field) => (
                                        <div key={field.name}>
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
                                            {errors[field.name] && (
                                                <p className="text-red-500 font-serif font-medium text-xs mt-1">
                                                    {errors[field.name]}
                                                </p>
                                            )}
                                        </div>
                                    ))}

                                    <input type="hidden" name="role" value={formData.role} />

                                    <button
                                        type="submit"
                                        className="flex items-center justify-between w-full px-6 h-12 mt-7 text-sm text-white bg-black rounded-lg hover:bg-gray-900 transition-colors duration-300"
                                    >
                                        <span>Sign Up</span>
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
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PrestataireRegister;
