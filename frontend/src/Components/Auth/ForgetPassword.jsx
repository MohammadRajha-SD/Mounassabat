import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await axios.post("https://mounassabat.ma/api/forgot-password", {
                email,
            });

            toast.success("Vérifiez votre courrier électronique pour le lien de réinitialisation.");

            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);

        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Mot de passe oublié</h2>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-2">
                            Adresse email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-[#e6cf8c] text-white font-medium rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                    >
                        {loading ? "Envoi..." : "Envoyer le lien de réinitialisation"}
                    </button>
                </form>
                {message && (
                    <p className="mt-4 text-sm text-green-600 text-center">{message}</p>
                )}
                {error && (
                    <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
