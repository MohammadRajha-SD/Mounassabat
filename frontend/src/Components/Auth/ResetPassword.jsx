import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useParams();

    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            toast.error('Les mots de passe ne correspondent pas');
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/reset-password', {
                email,
                password,
                password_confirmation: passwordConfirmation,
                token,
            });

            if (response.data.status == 200) {
                toast.success('Réinitialisation du mot de passe réussie ! Vous pouvez maintenant vous connecter avec votre nouveau mot de passe. Redirection...');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                toast.error(response.data.message || 'An error occurred');
            }
        } catch (err) {
            toast.error('An error occurred');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Réinitialiser le mot de passe</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Nouveau mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password_confirmation" className="block text-sm font-semibold text-gray-700">Confirmez le mot de passe</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-[#e6cf8c] text-white font-semibold rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        Réinitialiser le mot de passe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
