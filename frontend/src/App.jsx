import React, { useEffect, useState } from "react";
import Home from "./Components/Home.jsx";
import AllAnnounces from "./Components/AllAnnounces.jsx";
import QuiSommesNous from "./Components/QuiSommesNous/Index.jsx";
import Blog from "./Components/Blog/Index.jsx";
import Faq from "./Components/Faq/Index.jsx";
import Compare from "./Components/Compare/Index.jsx";
import Team from "./Components/Team/Index.jsx";
import Contact from "./Components/Contact/Index.jsx";
import Annonces from "./Components/Prestataire/Annonces.jsx";
import Favorites from "./Components/Prestataire/Favorites.jsx";
import Login from "./Components/Auth/Login.jsx";
import ClientRegister from "./Components/Auth/ClientRegister.jsx";
import ForgetPassword from "./Components/Auth/ForgetPassword.jsx";
import ResetPassword from "./Components/Auth/ResetPassword.jsx";
import PrestataireRegister from "./Components/Auth/PrestataireRegister.jsx";
import Dashboard from './Components/Admin/Dashboard.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import Clients from './Components/Admin/Clients.jsx';
import Prestataires from './Components/Admin/Prestataires.jsx';
import Posts from './Components/Admin/Posts.jsx';
import AllPosts from './Components/Admin/AllPosts.jsx';
import Reclamations from './Components/Admin/Reclamations.jsx';
import AnnounceForm from "./Components/Prestataire/AnnounceForm.jsx";
import AnnounceForm2 from "./Components/Prestataire/AnnounceForm2.jsx";
import AnnounceForm3 from "./Components/Prestataire/AnnounceForm3.jsx";
import Parametres from './Components/Prestataire/Parametres.jsx';
import AnnouncesDetails from './Components/AnnouncesDetails.jsx';
import FilterAnnounces from "./Components/FilterAnnounces.jsx";
import Conditions from './Components/Conditions/Index.jsx';
import { AnnonceProvider } from './Components/AnnonceContext';
import Chat from './Components/Chat/Index.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Messages from './Components/Prestataire/Messages.jsx';
import StripeContainer from './Components/CreditCard/StripeContainer.jsx';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
function App() {
    const [token, setToken] = useState(false);
    const [isValidToken, setIsValidToken] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);

        const verifyToken = async () => {
            if (!token) {
                setIsLoading(false);
                setIsValidToken(false);
                return;
            }

            try {
                const response = await axios.get('https://monassabatmaroc.online/api/verify-token', {
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


    return (
        <AnnonceProvider>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="Login" element={<Login />} />
                <Route path="ClientRegister" element={<ClientRegister />} />
                <Route path="PrestataireRegister" element={<PrestataireRegister />} />
                <Route path="ForgetPassword" element={<ForgetPassword />} />
                <Route path="reset-password/{:token}" element={<ResetPassword />} />
                
                {/* Admin routes */}
                <Route path="Dashboard" element={
                    <PrivateRoute roles={['admin']}>
                        <Dashboard />
                    </PrivateRoute>
                } />

                <Route path="Clients" element={
                    <PrivateRoute roles={['admin']}>
                        <Clients />
                    </PrivateRoute>
                } />

                <Route path="Prestataires" element={
                    <PrivateRoute roles={['admin']}>
                        <Prestataires />
                    </PrivateRoute>
                } />

                <Route path="Reclamations" element={
                    <PrivateRoute roles={['admin']}>
                        <Reclamations />
                    </PrivateRoute>
                } />

                <Route path="Posts" element={
                    <PrivateRoute roles={['admin']}>
                        <Posts />
                    </PrivateRoute>
                } />
                  <Route path="AllPosts" element={
                    <PrivateRoute roles={['admin']}>
                        <AllPosts />
                    </PrivateRoute>
                } />

                {/* Prestataire routes */}
                <Route path="Annonces" element={
                    <PrivateRoute roles={['prestataire']}>
                        <Annonces />
                    </PrivateRoute>
                } />

                <Route path="Favorites" element={
                    <PrivateRoute roles={['prestataire']}>
                        <Favorites />
                    </PrivateRoute>
                } />
                <Route path="Parametres" element={
                    <PrivateRoute roles={['prestataire']}>
                        <Parametres />
                    </PrivateRoute>
                } />

                <Route path="Messages" element={
                    <PrivateRoute roles={['prestataire']}>
                        <Messages />
                    </PrivateRoute>
                } />

                <Route path="AnnounceForm" element={
                    <PrivateRoute roles={['prestataire']}>
                        <AnnounceForm />
                    </PrivateRoute>
                } />
                <Route path="AnnounceForm2" element={
                    <PrivateRoute roles={['prestataire']}>
                        <AnnounceForm2 />
                    </PrivateRoute>
                } />
                <Route path="AnnounceForm3" element={
                    <PrivateRoute roles={['prestataire']}>
                        <AnnounceForm3 />
                    </PrivateRoute>
                } />

                {/* Client routes */}
                <Route path="Home" element={
                    <PrivateRoute roles={['client']}>
                        <Home />
                    </PrivateRoute>
                } />

                <Route path="Blog" element={
                    <PrivateRoute roles={['client']}>
                        <Blog />
                    </PrivateRoute>
                } />

                <Route path="Faq" element={
                    <PrivateRoute roles={['client']}>
                        <Faq />
                    </PrivateRoute>
                } />

                {/* TODO: */}
                <Route path="Compare" element={
                    <PrivateRoute roles={['client']}>
                        <Compare />
                    </PrivateRoute>
                } />

                <Route path="Team" element={
                    <PrivateRoute roles={['client']}>
                        <Team />
                    </PrivateRoute>
                } />

                <Route path="Contact" element={
                    <PrivateRoute roles={['client']}>
                        <Contact />
                    </PrivateRoute>
                } />

                <Route path="Quisommes-nous" element={
                    <QuiSommesNous />
                } />

                <Route path="AllAnnounces" element={
                    <AllAnnounces />
                } />

                <Route path="/AnnouncesDetails/:id" element={
                    <AnnouncesDetails />
                } />

                <Route path="FiltredAnnounces" element={
                    <FilterAnnounces />
                } />
                <Route path="Chat" element={
                    <PrivateRoute roles={['client', 'prestataire']}>
                        <Chat />
                    </PrivateRoute>
                } />

                <Route path="PayByCreditCard" element={
                    <PrivateRoute roles={['prestataire']}>
                        <StripeContainer />
                    </PrivateRoute>
                } />

                <Route path="/conditions" element={
                    <Conditions />
                } />
            </Routes>
        </AnnonceProvider>
    );
}

export default App;
