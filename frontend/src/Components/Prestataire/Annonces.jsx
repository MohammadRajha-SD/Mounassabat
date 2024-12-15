import { useEffect, useState } from 'react';
import Footer from '../Footer.jsx';
import HeaderAnnounces from './HeaderAnnounces.jsx';
import axios from 'axios';
import Carousel from '../Carousel/Index.jsx';
import { PencilIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

const Annonces = () => {
    const [annonces, setAnnonces] = useState([]);
    const [currentSlides, setCurrentSlides] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAnnonce, setSelectedAnnonce] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [annonceToDelete, setAnnonceToDelete] = useState(null);
    const [price, setPrice] = useState(0);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        fetchAllAnnonces();
    }, []);

    const fetchAllAnnonces = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            const response = await axios.get('https://mounassabat.ma/api/getMyAnnonces', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status === 'success') {
                setAnnonces(response.data.annonces);
            }
        } catch (error) {
            console.error('Error fetching annonces:', error);
        }
    };

    useEffect(() => {
        const initialSlides = annonces.map(() => 0);
        setCurrentSlides(initialSlides);
    }, [annonces]);

    const openModal = (annonce) => {
        setSelectedAnnonce(annonce);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedAnnonce(null);
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        setSelectedAnnonce({
            ...selectedAnnonce,
            [e.target.name]: e.target.value,
        });
    };

    const deleteAnnonce = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            // Send DELETE request to Laravel API
            const response = await axios.delete(`https://mounassabat.ma/api/annonces/${annonceToDelete}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status === 'success') {
                toast.success('Annonce supprimée avec succès');

                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                console.error('Error deleting annonce:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting annonce:', error);
        } finally {
            setShowModal(false);
        }
    };

    const handleUpdateAnnonce = async (e) => {
        e.preventDefault(); // Prevent form default submission

        const id = selectedAnnonce.id;

        if (price > 0 && title.trim() && description.trim()) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('JWT token not found in local storage');
                    return;
                }
                const response = await axios.put(`https://mounassabat.ma/api/annonces/${id}`,
                    {
                        title,
                        description,
                        price,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Add token in the Authorization header
                            'Content-Type': 'application/json', // Ensure the content type is JSON
                        },
                    }
                );

                toast.success('Annonce mise à jour avec succès');

                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } catch (error) {
                toast.error('Erreur lors de la mise à jour. Veuillez réessayer.');
            }
        } else {
            toast.error('Veuillez remplir tous les champs obligatoires.');
        }
    };

    useEffect(() => {
        if (selectedAnnonce) {
            setTitle(selectedAnnonce.title || '');
            setDescription(selectedAnnonce.description || '');
            setPrice(selectedAnnonce.price || 0);
        }
    }, [selectedAnnonce]);

    return (
        <div>
            <HeaderAnnounces actived="Mes Annonces" />

            <div className="container mx-auto px-4 sm:px-8">
                {annonces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
                        {annonces.map((annonce, index) => (
                            <div key={annonce.id} className="card relative bg-white shadow-lg rounded-lg overflow-hidden">
                                {/* Carousel */}
                                <Carousel images={annonce.image} isVip={annonce.type === 'vip'} />
                                {/* Card content */}
                                <div className="p-5">
                                    <div className='flex justify-between items-center'>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{annonce.title}</h2>
                                        <div >

                                            <button
                                                onClick={() => openModal(annonce)}
                                                className="mt-4 mx-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                                            >
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setAnnonceToDelete(annonce.id);
                                                    setShowModal(true);
                                                }} className="mt-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <svg
                                            className="w-5 h-5 bg-[#e6cf8c]"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.12.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                                            />
                                        </svg>
                                        <p className="text-md text-gray-500">{annonce.location}</p>
                                    </div>
                                    <p className="text-md text-gray-600 mb-4">{annonce.sub_name}</p>
                                    <div className="flex justify-between items-center">
                                        <p className="bg-[#e6cf8c] font-medium">
                                            {annonce.accepted_at ? 'Accepted' : 'Not accepted yet'}
                                        </p>

                                        <p className="text-lg text-gray-500 font-bold font-serif">
                                            {annonce.price} <span className="text-gray-500 font-serif font-bold">MAD</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-16 flex justify-center items-center text-center">
                        <div className="border-2 border-gray-400 p-10 rounded-lg">
                            <h1 className="text-black text-2xl font-semibold mb-6">You do not have any ads yet.</h1>
                            <svg
                                className="w-36 h-36 text-gray-400 mx-auto mb-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9"
                                />
                            </svg>
                            <button className="bg-[#e6cf8c] hover:bg-yellow-200 text-white px-5 py-3 rounded-md">
                                Publish Your Ad
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white py-6 px-2 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-lg font-semibold mb-4">Edit Annonce</h2>
                        <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                            <form className='p-3' onSubmit={handleUpdateAnnonce}>
                                <div className='gap-5 items-center flex'>
                                    <div className='bg-gray-100 m-1 rounded-full' style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="..." fill="#000000" />
                                        </svg>
                                    </div>
                                    <label className="text-md font-medium"><span className='text-red-500'>*</span>Titre de lannonce</label>
                                </div>

                                <input id="title" type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="block ml-2 w-full h-14 font-bold text-md py-2 px-2 mt-2 bg-white border border-gray-300 rounded-md focus:border-yellow-500 focus:outline-none focus:ring"
                                />

                                <div className='gap-2 items-center flex mt-2'>
                                    <div className='bg-gray-100 m-1 rounded-full' style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24">
                                            <path d="..." />
                                        </svg>
                                    </div>
                                    <label className="text-md font-medium"><span className='text-red-500'>*</span>Texte de l'annonce</label>
                                </div>

                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="block ml-2 w-full h-64 font-bold text-md py-2 px-2 mt-2 bg-white border border-gray-300 rounded-md focus:border-yellow-500 focus:outline-none focus:ring"
                                >
                                </textarea>

                                <div className='gap-2 items-center flex mt-2'>
                                    <div className='bg-gray-100 m-1 rounded-full' style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <svg fill="#000000" width="20px" height="20px" viewBox="-2 0 19 19" xmlns="http://www.w3.org/2000/svg" >
                                            <path d="..." />
                                        </svg>
                                    </div>
                                    <label className="text-md font-medium"><span className='text-red-500'>*</span>Prix(MAD)</label>
                                </div>

                                <input
                                    value={price}
                                    className='flex items-center justify-between w-full px-4 h-14 mb-3 py-2 mt-2 bg-white border border-gray-300 rounded-md focus:border-yellow-500 dark:focus:border-yellow-500 focus:outline-none focus:ring m-2 text-black font-semibold text-md'
                                    type="number"
                                    min={0}
                                    onChange={(e) => setPrice(e.target.value)}
                                />

                                <div className="flex justify-end my-5">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type='submit'
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        mise à jour
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div >
            )}

            {
                showModal && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                            <h3 className="text-lg font-semibold mb-4">Etes-vous sûr de vouloir supprimer cette annonce ?</h3>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowModal(false)}

                                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={deleteAnnonce}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Oui, supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <Footer />
        </div >
    );
};

export default Annonces;
