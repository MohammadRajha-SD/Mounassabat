import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from '/src/assets//logo.png';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Sidebar from './Sidebar';


const Dashboard = () => {
    const [latestPrestataires, setLatestPrestataires] = useState([]);
    const [latestClients, setLatestClients] = useState([]);
    const [latestAnnonces, setLatestAnnonces] = useState([]);
    const [latestReclamations, setLatestReclamations] = useState([]);

    const [prestatairesCount, setPrestatairesCount] = useState(0);
    const [clientsCount, setClientsCount] = useState(0);
    const [annoncesCount, setAnnoncesCount] = useState(0);
    const [reclamationsCount, setReclamationsCount] = useState(0);

    useEffect(() => {
        fetchCounts();
        fetchLatestData();
    }, []);

    const fetchCounts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('JWT token not found in local storage');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const [prestatairesResponse, clientsResponse, annoncesResponse, reclamationsResponse] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/countPrestataires', { headers }),
                axios.get('http://127.0.0.1:8000/api/countClients', { headers }),
                axios.get('http://127.0.0.1:8000/api/countAnnonces', { headers }),
                axios.get('http://127.0.0.1:8000/api/countReclamations', { headers }),
            ]);

            setPrestatairesCount(prestatairesResponse.data.count);
            setClientsCount(clientsResponse.data.count);
            setAnnoncesCount(annoncesResponse.data.count);
            setReclamationsCount(reclamationsResponse.data.count);
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };

    const fetchLatestData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('JWT token not found in local storage');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const [prestatairesResponse, clientsResponse, annoncesResponse, reclamationsResponse] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/getLatestPrestataires', { headers }),
                axios.get('http://127.0.0.1:8000/api/getLatestClients', { headers }),
                axios.get('http://127.0.0.1:8000/api/getLatestAnnonces', { headers }),
                axios.get('http://127.0.0.1:8000/api/getLatestReclamations', { headers }),
            ]);

            setLatestPrestataires(prestatairesResponse.data);
            setLatestClients(clientsResponse.data);
            setLatestAnnonces(annoncesResponse.data);
            setLatestReclamations(reclamationsResponse.data);
        } catch (error) {
            console.error('Error fetching latest data:', error);
        }
    };

    return (
        <div className="flex">
            <Sidebar active="dashboard" />

            <section className="bg-black w-full h-[100vh] px-5 py-2.5">
                <div className="text-center flex gap-3 items-center justify-center lg:justify-start">
                    <svg
                        className="w-9 h-9 text-yellow-600"
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
                            d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"
                        />
                    </svg>
                    <h1 className="text-3xl text-white font-bold font-mono mt-1">Dashboard</h1>
                </div>
                <div className="w-full h-[1px] mt-5"></div>

                {/* Grid layout */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-6">
                    {/* Card 1 */}
                    <div className="border border-white rounded-lg">
                        <div className="p-4">
                            <h1 className="text-yellow-600 text-2xl font-medium font-serif">Prestataires</h1>
                            <div className="flex justify-between mt-2 px-2">
                                <h1 id="user-count" className="text-white font-medium text-2xl">{prestatairesCount}</h1>
                                <svg
                                    className="w-8 h-8 text-yellow-600"
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
                                        strokeWidth="2"
                                        d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="border border-white rounded-lg">
                        <div className="p-4">
                            <h1 className="text-yellow-600 text-2xl font-medium font-serif">Clients</h1>
                            <div className="flex justify-between mt-2 px-2">
                                <h1 id="cinema-count" className="text-white font-medium text-2xl">{clientsCount}</h1>
                                <svg
                                    className="w-8 h-8 text-yellow-600"
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
                                        strokeWidth="2"
                                        d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="border border-white rounded-lg">
                        <div className="p-4">
                            <h1 className="text-yellow-600 text-2xl font-medium font-serif">Annonces</h1>
                            <div className="flex justify-between mt-2 px-2">
                                <h1 id="category-count" className="text-white font-medium text-2xl">{annoncesCount}</h1>
                                <svg
                                    className="w-8 h-8 text-yellow-600"
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
                                        d="M12 15v5m-3 0h6M4 11h16M5 15h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="border border-white rounded-lg">
                        <div className="p-4">
                            <h1 className="text-yellow-600 text-2xl font-medium font-serif">Reclamations</h1>
                            <div className="flex justify-between mt-2 px-2">
                                <h1 id="movie-count" className="text-white font-medium text-2xl">{reclamationsCount}</h1>
                                <svg
                                    className="w-8 h-8 text-yellow-600"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;