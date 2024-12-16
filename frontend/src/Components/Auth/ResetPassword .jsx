import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [token, setToken] = useState(""); // Token from reset email
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await axios.post("https://mounassabat.ma/api/reset-password", {
                email,
                password,
                password_confirmation: passwordConfirmation,
                token,
            });
            setMessage(response.data.message || "Password reset successfully.");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Reset Password</h2>
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium text-gray-600 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="passwordConfirmation" className="text-sm font-medium text-gray-600 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="token" className="text-sm font-medium text-gray-600 mb-2">
                            Reset Token
                        </label>
                        <input
                            type="text"
                            id="token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
