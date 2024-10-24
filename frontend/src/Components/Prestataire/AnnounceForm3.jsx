import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header3 from './Header3.jsx';
import RightSide from './RightSide.jsx';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const AnnounceForm = () => {
    const [images, setImages] = useState([]);
    const [formIncomplete, setFormIncomplete] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [visiblePaymentForm, setVisiblePaymentForm] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const options = [
        { days: 3, price: 5, label: '3 days - 5$' },
        { days: 14, price: 10.90, label: '14 days - 10.90$' },
        { days: 30, price: 29.90, label: '30 days - 29.90$' },
    ];

    const handleSelectChange = (e) => {
        const selectedDays = parseInt(e.target.value);
        const selected = options.find((option) => option.days === selectedDays);
        setSelectedOption(selected);
    };

    // get annonce type
    useEffect(() => {
        setToken(localStorage.getItem('token'));
        const annonceType = localStorage.getItem('annonce_type');

        if (annonceType === 'vip') {
            setVisiblePaymentForm(true);
        } else {
            setVisiblePaymentForm(false);
        }
    }, []);

    // Create annonce function
    const createAnnonce = async (payment_method) => {
        try {
            const formData = new FormData();

            formData.append('title', localStorage.getItem('title'));
            formData.append('description', localStorage.getItem('description'));
            formData.append('location', localStorage.getItem('location'));
            formData.append('sub_category_id', localStorage.getItem('sub_category_id'));
            formData.append('sous_category_id', localStorage.getItem('sous_category_id'));
            formData.append('price', localStorage.getItem('price'));
            formData.append('annonce_type', localStorage.getItem('annonce_type'));
            formData.append('payment_method', payment_method);
            formData.append('annonce_duration', selectedOption.days);
            formData.append('amount', selectedOption.price);

            images.forEach((image) => { formData.append('image[]', image.file); });

            const response = await axios.post(
                'http://127.0.0.1:8000/api/annonce/create',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setSuccessMessage('Annonce created successfully!');

            setTimeout(() => { navigate('/Annonces'); }, 3000);
        } catch (error) {
            console.error('Error creating annonce:', error);
        }
    };

    // handle continue button
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
                const annonce_type = localStorage.getItem('annonce_type');

                const formData = new FormData();
                formData.append('title', title);
                formData.append('description', description);
                formData.append('location', location);
                formData.append('sub_category_id', sub_category_id);
                formData.append('sous_category_id', sous_category_id);
                formData.append('price', price);
                formData.append('annonce_type', annonce_type);
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

    // functions 
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

    const openModalWithCheck = () => {
        if (images.length === 0) {
            setFormIncomplete(true);
            setTimeout(() => {
                setFormIncomplete(false);
            }, 3000);
        } else {
            setModalOpen(true)
        }
    }

    const Modal = ({ isOpen, onClose }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full my-5">
                    <div className='flex justify-between items-center'>
                        <h2 className="text-lg font-semibold">Payment Confirmation</h2>
                        <h1 className='text-red-500 cursor-pointer font-bold' onClick={() => setModalOpen(false)}>X</h1>
                    </div>

                    <div className="max-w-md mx-auto my-5">
                        <label htmlFor="announcement-select" className="block text-sm font-medium text-gray-700 mb-2">
                            Choose Announcement Duration:
                        </label>
                        <select
                            id="announcement-select"
                            value={selectedOption?.days}
                            onChange={handleSelectChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select an option</option>
                            {options.map((option) => (
                                <option key={option.days} value={option.days}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Elements stripe={stripePromise}>
                        <PaymentForm />
                    </Elements>
                </div>
            </div >
        );
    };

    // STRIPE START
    const stripePromise = loadStripe('pk_test_51OdOFNKPwcneq4cfGY5dJmtpoZCmPivYiWVOcfKiWGEv6dsh8x2kSl0STrr9giYpVeXZbU0DxHJA99yArGXN7yvF00y0YQCe17');

    const PaymentForm = () => {
        const stripe = useStripe();
        const elements = useElements();
        const [isLoading, setIsLoading] = useState(false);
        const [paymentMethod, setPaymentMethod] = useState('card');

        const handleSubmit = async (event) => {
            event.preventDefault();
            setIsLoading(true);

            if (paymentMethod === 'card') {
                try {
                    const token = localStorage.getItem('token');
                    const { data } = await axios.post('http://127.0.0.1:8000/api/pay-by-creditcard', {
                        amount: selectedOption.price,
                        payment_method: 'card'
                    }, { headers: { Authorization: `Bearer ${token}` } });

                    const { clientSecret, name, email } = data;

                    if (!stripe || !elements) {
                        toast.error('Stripe not Loaded');
                        return;
                    }

                    const cardElement = elements.getElement(CardElement);

                    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                        payment_method: {
                            card: cardElement,
                            billing_details: {
                                name: name,
                                email: email,
                            },
                        },
                    });

                    if (paymentError) {
                        toast.error('Payment failed. Please try again.');
                    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                        createAnnonce(paymentMethod);

                        toast.success('Payment successful!');

                        setTimeout(() => {
                            window.location.href = '/Annonces';
                        }, 1000);
                    }
                } catch (error) {
                    toast.error('Something went wrong');
                }
            }

            setIsLoading(false);
        };

        return (
            <form onSubmit={handleSubmit}>
                <h2 className="mb-4 mt-2">Select Payment Method</h2>

                <div className="mb-4">
                    <label>
                        <input
                            type="radio"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                        />
                        <span className='pl-1'>Credit Card</span>
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={() => setPaymentMethod('paypal')}
                        />

                        <span className='pl-1'>PayPal</span>
                    </label>
                </div>

                {paymentMethod === 'card' && (
                    <CardElement
                        disabled={isLoading}
                        className="border p-2 rounded-md mb-4" />
                )}

                {paymentMethod === 'paypal' && (
                    <PayPalScriptProvider options={{ "client-id": "AYXjOmFXvDTfxT7SXSVfnb2YNglIjPUXmfndHC5soxBuDxrp16nM26d2MvhDJOMcnSCRTU-RfGK2xJPr" }}>
                        <PayPalButtons
                            createOrder={async (data, actions) => {
                                try {
                                    const response = await axios.post(
                                        'http://127.0.0.1:8000/api/paypal/payment',
                                        { price: selectedOption.price },
                                        { headers: { Authorization: `Bearer ${token}` } }
                                    );

                                    if (response.data.status === 'success' && response.data.approval_url) {
                                        return response.data.id;
                                    } else {
                                        toast.error('Order creation failed. Please try again.');
                                    }
                                } catch (error) {
                                    console.error('Error creating order:', error);
                                    toast.error('Error creating order. Please try again.');
                                    throw error;
                                }
                            }}

                            onApprove={async (data, actions) => {
                                try {
                                    const response = await axios.get(
                                        `http://127.0.0.1:8000/api/paypal/success`,
                                        {
                                            params: { token: data.orderID },
                                            headers: { Authorization: `Bearer ${token}` },
                                        }
                                    );

                                    if (response.data.status === 'success') {
                                        createAnnonce(paymentMethod);

                                        toast.success('Payment successful!');

                                        setTimeout(() => {
                                            window.location.href = '/Annonces';
                                        }, 1000);

                                    } else {
                                        toast.error('Payment failed. Please try again.');
                                    }
                                } catch (error) {
                                    toast.error('Something went wrong');
                                }
                            }}


                            onCancel={() => {
                                toast.warning('Transaction cancelled');
                            }}

                            onError={(err) => {
                                toast.warning('An error occurred during the transaction.');
                            }}
                        />
                    </PayPalScriptProvider>
                )}

                {paymentMethod === 'card' && (
                    <button
                        type="submit"
                        disabled={isLoading || !selectedOption?.days}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                    >
                        {isLoading ? 'Processing...' : paymentMethod === 'card' ? 'Pay with Credit Card' : 'Pay with PayPal'}
                    </button>
                )}
            </form>
        );
    };

    // STRIPE END

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
                {visiblePaymentForm ? (
                    <>
                        <button className='bg-blue-400 text-white px-3 py-2 font-serif mx-2 rounded-lg' type='button' onClick={() => openModalWithCheck()}>
                            Pay Now
                        </button>

                        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
                    </>
                ) : <>
                    <button onClick={handleContinueClick} className='bg-yellow-600 text-white p-2 mx-2 rounded-lg' type='submit' >CONTINUER</button>
                </>}
            </div >
        </>
    );
};

export default AnnounceForm;