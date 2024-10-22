import React, { useEffect, useState } from 'react';
import HeaderAnnounces from './HeaderAnnounces.jsx';
import axios from 'axios';
const Parametres = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('TOKEN is not exists');
            return;
        }
        axios.get('http://127.0.0.1:8000/api/profile/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setFormData(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('TOKEN is not exists');
            return;
        }
        setLoading(true);
        axios.put('http://127.0.0.1:8000/api/profile/user', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setMessage('Profile updated successfully!');
                setLoading(false);

                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            })
            .catch((error) => {
                console.error(error);
                setMessage('Failed to update profile.');
                setLoading(false);
            });

    };
    return (
        <div>
            <HeaderAnnounces actived='Paramètres' />

            <div className="container mx-auto p-6 max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-6">Update Profile</h1>

                {message && (
                    <div className="mb-4 text-center text-green-600 font-medium">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full p-2 mt-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Parametres;