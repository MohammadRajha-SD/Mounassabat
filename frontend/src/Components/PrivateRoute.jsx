import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from './Loader/Index.jsx';

const PrivateRoute = ({ children, roles }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isValidToken, setIsValidToken] = useState(false);

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setIsLoading(false);
                setIsValidToken(false);
                return;
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/verify-token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const { valid, message } = response.data;

                if (response.status === 200 && valid) {
                    setIsValidToken(true);
                } else {
                    setIsValidToken(false); 
                    toast.error(message || 'Votre session a expiré. Veuillez vous reconnecter.');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            } catch (error) {
                setIsValidToken(false);
                toast.error('Votre session a expiré.');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }

            setIsLoading(false);
        };

        verifyToken();
    }, [token]);

    if (isLoading) {
        return <div className="flex items-center justify-center w-full h-[100vh]"><Loader /></div>;
    }

    if (!isValidToken) {
        return <Navigate to="/Login" />;
    }

    if (roles && user && !roles.includes(user.role)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
