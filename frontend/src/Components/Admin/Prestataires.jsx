import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Sidebar from './Sidebar';
import axios from 'axios';

const Prestataires = () => {
    const [prestataires, setPrestataires] = useState([]);


    useEffect(() => {
        fetchAllPrestataires();
    }, []);


    const fetchAllPrestataires = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            const response = await axios.get('http://127.0.0.1:8000/api/getAllPrestataires', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            setPrestataires(response.data);
        } catch (error) {
            console.error('Error fetching Prestataires:', error);
        }
    };


    return (
        <div class="flex">
            <Sidebar active="prestataires" />

            <section className="bg-black w-full h-[100vh] px-5 py-2.5">
                <div class="flex gap-2 text-center items-center">
                    <svg class="w-9 h-9 text-orange-500 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="flex text-center items-center mt-2 gap-2">
                        <h1 class="text-3xl text-white font-bold font-mono">Prestataires</h1>
                        <h1 class="text-sm text-gray-300 mt-2">135</h1>
                    </div>

                </div>
                <div class="bg-white w-full h-[1px] mt-4"></div>

                <table class="w-full">
                    <thead class="text-white text-sm">
                        <th>ID</th>
                        <th>FULL NAME</th>
                        <th>ADRESS EMAIL</th>
                        <th>PHONE</th>
                        <th>CREATED DATE</th>
                        <th class="py-6">ACTION</th>
                    </thead>
                    <tbody class="text-white text-md text-center">
                        {prestataires.map((prestataire) => (
                            <tr className="text-white" key={prestataire.id}>
                                <td className="text-white font-medium font-serif">{prestataire.id}</td>
                                <td className="text-white font-medium font-serif">{prestataire.user.firstName} {prestataire.user.lastName}</td>
                                <td className="text-white font-medium font-serif">{prestataire.user.email}</td>
                                <td className="text-white font-medium font-serif">{prestataire.user.phone}</td>
                                <td className="text-white font-medium font-serif">{format(new Date(prestataire.user.created_at), 'dd MMMM yyyy')}</td>
                                <td>
                                    <button className="text-white bg-red-600 font-medium font-serif px-5 py-1 rounded">BAN</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>



                </table>

            </section>
        </div>
    );
};

export default Prestataires;