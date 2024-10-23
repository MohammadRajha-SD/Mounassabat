import './App.css';
// import { Routes, Route } from "react-router-dom";
import React from "react";
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
import PrestataireRegister from "./Components/Auth/PrestataireRegister.jsx";
import Dashboard from './Components/Admin/Dashboard.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import Clients from './Components/Admin/Clients.jsx';
import Prestataires from './Components/Admin/Prestataires.jsx';
import Posts from './Components/Admin/Posts.jsx';
import Reclamations from './Components/Admin/Reclamations.jsx';
import AnnounceForm from "./Components/Prestataire/AnnounceForm.jsx";
import AnnounceForm2 from "./Components/Prestataire/AnnounceForm2.jsx";
import AnnounceForm3 from "./Components/Prestataire/AnnounceForm3.jsx";
import Parametres from './Components/Prestataire/Parametres.jsx';
import AnnouncesDetails from './Components/AnnouncesDetails.jsx';
import FilterAnnounces from "./Components/FilterAnnounces.jsx";
import { AnnonceProvider } from './Components/AnnonceContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chat from './Components/Chat/Index.jsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Messages from './Components/Prestataire/Messages.jsx';

function App() {
    return (
        <AnnonceProvider>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="Login" element={<Login />} />
                <Route path="ClientRegister" element={<ClientRegister />} />
                <Route path="PrestataireRegister" element={<PrestataireRegister />} />

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
                    <PrivateRoute roles={['client']}>
                        <QuiSommesNous />
                    </PrivateRoute>
                } />

                <Route path="AllAnnounces" element={
                    <PrivateRoute roles={['client']}>
                        <AllAnnounces />
                    </PrivateRoute>
                } />

                <Route path="/AnnouncesDetails/:id" element={
                    <PrivateRoute roles={['client']}>
                        <AnnouncesDetails />
                    </PrivateRoute>
                } />

                <Route path="FiltredAnnounces" element={
                    <PrivateRoute roles={['client']}>
                        <FilterAnnounces />
                    </PrivateRoute>
                } />
                <Route path="Chat" element={
                    <PrivateRoute roles={['client', 'prestataire']}>
                        <Chat />
                    </PrivateRoute>
                } />
            </Routes>
        </AnnonceProvider>
    );
}

export default App;
