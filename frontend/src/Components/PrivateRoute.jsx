import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from './Loader/Index.jsx';
import API from '../api.js';

const PrivateRoute = ({ children, roles }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isValidToken, setIsValidToken] = useState(false);

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const verifyToken = async () => {
            if (!token || !user) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setIsLoading(false);
                setIsValidToken(false);
                return;
            }

            try {
                const response = await API.get('api/verify-token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const { valid, message } = response.data;

                if (response.status === 200 && valid) {
                    setIsValidToken(true);
                } else {
                    setIsValidToken(false);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    toast.error(message || 'Votre session a expiré. Veuillez vous reconnecter.');
                }
            } catch (error) {
                setIsValidToken(false);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                toast.error('Votre session a expiré.');
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
        if (roles.includes('prestataire')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.error('Vous êtes actuellement connecté en tant que visiteur. Pour créer ou publier une annonce, merci de vous inscrire en tant que prestataire.');
            return <Navigate to="/PrestataireRegister" />;
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return <Navigate to="/" />;
        }
    }

    return children;
};

export default PrivateRoute;
