import { createContext, useState, useContext } from 'react';

const AnnonceContext = createContext();

export const AnnonceProvider = ({ children }) => {
    const [annonces, setAnnonces] = useState([]);

    const filterAnnonces = async (category, subCategory, sousCategory, city, search) => {
        try {
            // const token = localStorage.getItem('token');
            // if (!token) {
            //     console.error('JWT token not found in local storage');
            //     return;
            // }

            let url = 'https://monassabatmaroc.com/api/getFiltredAnnonces';

            const urlObj = new URL(url);
            const params = new URLSearchParams();

            // Dynamically append query parameters only if they are provided
            if (category) {
                params.append('category', category);
            }
            if (subCategory) {
                params.append('subCategory', subCategory);
            }
            if (sousCategory) {
                params.append('sousCategory', sousCategory);
            }
            if (city) {
                params.append('city', city);
            }
            if (search) {
                params.append('search', search);
            }

            // If params have been appended, set the search part of the URL
            if (params.toString()) {
                urlObj.search = params.toString();
            }

            const finalUrl = urlObj.toString();
            const response = await fetch(finalUrl, {
                method: 'GET',

            });

            if (!response.ok) {
                console.error('Failed to fetch annonces:', response.statusText);
                return;
            }

            const data = await response.json();

            setAnnonces(data.annonces);
        } catch (error) {
            console.error('Error fetching annonces:', error);
        }
    };

    const filterAnnonces2 = async (category = null, city = null) => {
        try {
            let url = 'https://monassabatmaroc.com/api/getFiltredAnnonces';

            const urlObj = new URL(url);
            const params = new URLSearchParams();

            if (category != null) {
                params.append('category', category);
            }

            if (city != null) {
                params.append('city', city);
            }
            if (params.toString()) {
                urlObj.search = params.toString();
            }

            const finalUrl = urlObj.toString();
            const response = await fetch(finalUrl, {
                method: 'GET',

            });

            if (!response.ok) {
                console.error('Failed to fetch annonces:', response.statusText);
                return;
            }

            const data = await response.json();

            setAnnonces(data.annonces);
        } catch (error) {
            console.error('Error fetching annonces:', error);
        }
    };
    return (
        <AnnonceContext.Provider value={{ annonces, filterAnnonces, setAnnonces, filterAnnonces2 }}>
            {children}
        </AnnonceContext.Provider>
    );
};
export const useAnnonces = () => {
    return useContext(AnnonceContext);
};
