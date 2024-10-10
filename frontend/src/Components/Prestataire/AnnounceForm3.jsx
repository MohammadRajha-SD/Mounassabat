import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header3 from './Header3.jsx';
import RightSide from './RightSide.jsx';
import axios from 'axios';

const AnnounceForm = () => {
    const [images, setImages] = useState([]);
    const [formIncomplete, setFormIncomplete] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const totalImages = images.length + fileList.length;

        if (totalImages > 5) {
            setFormIncomplete(true);
            setTimeout(() => {
                setFormIncomplete(false);
            }, 3000);
            return;
        }

        const imageArray = Array.from(fileList).map((file) => ({
            url: URL.createObjectURL(file),
            file: file,
        }));
        setImages((prevImages) => [...prevImages, ...imageArray]);
    };

    const handleDelete = (index, event) => {
        event.preventDefault();
        setImages((prevImages) => {
            const newImages = [...prevImages];
            newImages.splice(index, 1);
            return newImages;
        });
    };

    const handleContinueClick = async () => {
        if (images.length === 0) {
            setFormIncomplete(true);
            setTimeout(() => {
                setFormIncomplete(false);
            }, 3000);
        } else {
            setFormIncomplete(false);
            try {
                const token = localStorage.getItem('token');
                const title = localStorage.getItem('title');
                const description = localStorage.getItem('description');
                const location = localStorage.getItem('location');
                const sub_category_id = localStorage.getItem('sub_category_id');
                const sous_category_id = localStorage.getItem('sous_category_id');
                const price = localStorage.getItem('price');

                const formData = new FormData();
                formData.append('title', title);
                formData.append('description', description);
                formData.append('location', location);
                formData.append('sub_category_id', sub_category_id);
                formData.append('sous_category_id', sous_category_id);
                formData.append('price', price);

                images.forEach((image) => {
                    formData.append('image[]', image.file);
                });

                console.log(formData)
                if (token) {
                    axios.post('http://127.0.0.1:8000/api/annonce/create', formData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                        .then(response => {
                            setSuccessMessage('Annonce created successfully!');
                            setTimeout(() => {
                                navigate('/Annonces');
                            }, 3000);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });

                } else {
                    console.error('No token found');
                }

            } catch (error) {
                console.error('Error creating announce:', error);
            }
        }
    };

    return (
        <>
            <div className='min-h-screen  bg-gray-100 '>
                <Header3 />
                <div className="flex flex-col md:flex-row pt-32 pb-20 md:py-20  gap-5 mx-2  lg:mx-10">
                    <div className="flex-1 bg-gray-100 ">
                        <section className="bg-white p-6 rounded-xl shadow-none md:shadow-md">
                            <h1 className="text-2xl font-bold text-black capitalize">Photos de l’annonce</h1>
                            <h4 className="text-md font-semibold capitalize text-gray-500">Ajouter des photos sur votre annonce pour un maximum de visibilité</h4>

                            <form >
                                <div className="my-5 flex flex-col md:w-[30rem] gap-6 mt-4 justify-center">
                                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-yellow-300 border-dashed rounded-lg cursor-pointer bg-yellow-50 hover:bg-yellow-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-yellow-500 dark:text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-yellow-500 dark:text-yellow-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-yellow-500 dark:text-yellow-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} multiple />
                                    </label>

                                    <div className="flex flex-wrap w-full gap-2">
                                        {images.map((image, index) => (
                                            <div key={index} className="relative">
                                                <img src={image.url} alt={`Image ${index + 1}`} className="max-w-22 rounded-md max-h-36" />
                                                <button
                                                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                                                    onClick={(event) => handleDelete(index, event)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {formIncomplete && (
                                        <div className="fixed bottom-24 left-0 z-10 w-full flex justify-center">
                                            <div className="bg-red-500 text-white py-2 px-4 rounded-lg">
                                                Maximum number of photos allowed is 5.
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-yellow-100 rounded-lg flex items-center justify-start w-full p-3">
                                        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_429_11086)">
                                                <circle cx="12" cy="11.9999" r="9" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <rect x="12" y="16" width="0.01" height="0.01" stroke="#B45309" strokeWidth="3.75" strokeLinejoin="round" />
                                                <path d="M12 12L12 8" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_429_11086">
                                                    <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p className="text-yellow-700 font-medium text-sm ml-2">Réorganisez les photos pour modifier la couverture.</p>
                                    </div>

                                    {successMessage && (
                                        <div className="fixed bottom-24 left-0 z-10 w-full flex justify-center">
                                            <div className="bg-green-500 text-white py-2 px-4 rounded-lg">{successMessage}</div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </section>
                    </div>

                    <RightSide title="Comment joindre la photo et la vidéo sur mon annonce." content={"Fournir de bonnes photos du produit est également important, cela peut aider à donner à l'acheteur potentiel une idée claire de l'état et de l'apparence du produit."} />
                </div>
            </div>
            <div className="fixed right-0 bottom-0 z-10 bg-white w-screen flex justify-end items-center py-2 shadow-md">
                <button onClick={handleContinueClick} className='bg-yellow-600 text-white p-2 mx-2 rounded-lg' type='submit' >CONTINUER</button>
            </div>
        </>
    );
};

export default AnnounceForm;