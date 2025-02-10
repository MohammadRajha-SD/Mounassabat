import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header2 from './Header2';
import RightSide from './RightSide';

const AnnounceForm = () => {

    const category = localStorage.getItem("category");

    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [title, setTitle] = useState('');
    const [formIncomplete, setFormIncomplete] = useState(false);
    const [errorMsg, setErrorMsg] = useState('Veuillez remplir tous les champs obligatoires.');
    const navigate = useNavigate();

    const handleContinueClick = () => {
        // Check if any required fields are empty
        if (!title || !description) {
            setFormIncomplete(true);
            setErrorMsg('Veuillez remplir tous les champs obligatoires.');
            setTimeout(() => {
                setFormIncomplete(false);
            }, 3000);
        }else if(description.length > 365){
            setFormIncomplete(true);
            setErrorMsg('la limite de la description est de 365 caractères.');
            setTimeout(() => {
                setFormIncomplete(false);
            }, 3000);
        } else {
            setFormIncomplete(false);

            localStorage.setItem("title", title);
            localStorage.setItem("price", price ?? null);
            localStorage.setItem("description", description);

            navigate('/AnnounceForm3');
        }
    };

    return (
        <>
            <div className='min-h-screen  bg-gray-100 '>
                <Header2 />

                <div className="flex flex-col md:flex-row pt-40 pb-20 md:py-20  gap-5 mx-2  lg:mx-10">
                    <div className="flex-1 bg-gray-100 ">
                        <section className="bg-white p-6 rounded-xl shadow-none md:shadow-md  ">
                            <h1 className="text-2xl font-bold text-black capitalize ">Détails de l'annonce</h1>
                            <h4 className="text-md font-semibold capitalize text-gray-500">Ajouter plus de détails sur votre annonce pour un maximum de visbilité</h4>
                            <form>
                                <div className="flex-col gap-6 mt-4 ">
                                    <div>
                                        <label className="text-md ml-3 font-medium" >Catégorie</label>
                                        <div>
                                            <div className="flex  ml-2 items-center justify-between w-full px-4 h-14 mb-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  dark:text-gray-300  focus:border-yellow-500 dark:focus:border-yellow-500 focus:outline-none focus:ring">
                                                <div className="flex">
                                                    <h1 className='m-2 text-black font-semibold text-md'>{category}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h1 className='font-semibold text-2xl'>Information de l'annonce</h1>
                                        <p className='text-gray-500 text-md py-5'>Une annonce avec un prix exacte et une description bien détaillé a 10 fois plus de visibilité </p>
                                    </div>


                                    <div className=' gap-2 items-center flex'>
                                        <div className='bg-gray-100 m-1 rounded-full' style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <svg fill="#000000" width="20px" height="20px" viewBox="-2 0 19 19" xmlns="http://www.w3.org/2000/svg" ><path d="m13.842 11.52-4.389 4.388a1.112 1.112 0 0 1-1.567 0l-6.28-6.28a3.027 3.027 0 0 1-.771-1.892l.043-3.681A1.141 1.141 0 0 1 2 2.935L5.67 2.9a3.04 3.04 0 0 1 1.892.773l6.28 6.28a1.112 1.112 0 0 1 0 1.567zM3.826 5.133a.792.792 0 1 0-.792.792.792.792 0 0 0 .792-.792zm6.594 7.348a.554.554 0 0 0 0-.784l-.401-.401a2.53 2.53 0 0 0 .35-.83 1.565 1.565 0 0 0-.397-1.503 1.59 1.59 0 0 0-1.017-.46 2.14 2.14 0 0 0-.75.085h-.002a2.444 2.444 0 0 0-.59.277H7.61a2.677 2.677 0 0 0-.438.357 2.043 2.043 0 0 1-.259.22 1.29 1.29 0 0 1-.329.17h-.002a.835.835 0 0 1-.338.038h-.002a.53.53 0 0 1-.314-.136.539.539 0 0 1-.106-.534 1.54 1.54 0 0 1 .41-.71 1.632 1.632 0 0 1 .23-.165l.03-.019a1.783 1.783 0 0 1 .322-.155.942.942 0 0 1 .325-.06.554.554 0 0 0 0-1.108h-.001a2.058 2.058 0 0 0-.717.132 2.846 2.846 0 0 0-.529.26l-.01.006-.398-.4a.554.554 0 1 0-.784.785l.388.387a2.513 2.513 0 0 0-.347.803 1.644 1.644 0 0 0 .404 1.561 1.622 1.622 0 0 0 .983.456 1.922 1.922 0 0 0 .805-.089 2.372 2.372 0 0 0 .624-.319 3.142 3.142 0 0 0 .398-.339 1.569 1.569 0 0 1 .256-.208 1.381 1.381 0 0 1 .32-.151 1.023 1.023 0 0 1 .348-.038.485.485 0 0 1 .308.139c.05.049.165.165.097.488a1.558 1.558 0 0 1-.413.729 2.476 2.476 0 0 1-.28.219 1.727 1.727 0 0 1-.306.157.687.687 0 0 1-.32.042.554.554 0 1 0-.08 1.106c.052.004.103.005.152.005a1.723 1.723 0 0 0 .685-.134 2.678 2.678 0 0 0 .507-.27l.01-.007.397.398a.555.555 0 0 0 .783 0z" /></svg>
                                        </div>
                                        <label className="text-md font-medium" >Prix(MAD)</label>
                                    </div>

                                    <input
                                        value={price}
                                        className='flex items-center justify-between w-full px-4 h-14  mb-3 py-2 mt-2 bg-white border border-gray-300 rounded-md    focus:border-yellow-500 dark:focus:border-yellow-500 focus:outline-none focus:ring m-2  text-black font-semibold text-md'
                                        onChange={(e) => setPrice(e.target.value)} type="number" min={0} />

                                    <div className=' gap-2 items-center flex'>
                                        <div className='bg-gray-100 m-1 rounded-full' style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <svg
                                                width="26"
                                                height="26"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M13 9H10V17H8V9H5V7H13V9ZM18 13H16V17H14V13H12V11H18V13Z"
                                                    fill="#000000"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <label className="text-md font-medium" ><span className='text-red-500'>*</span>Titre de lannonce</label>
                                        </div>
                                    </div>

                                    <input id="title" type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)} className="block ml-2 w-full h-14 font-bold text-md py-2 px-2 mt-2  bg-white border border-gray-300 rounded-md  focus:border-yellow-500  focus:outline-none focus:ring" />

                                    <div className=' gap-2 items-center flex'>
                                        <div className='bg-gray-100 m-1 rounded-full' style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24"><path d="M21,20H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h18c0.6,0,1-0.4,1-1S21.6,20,21,20z M10,4h11c0.6,0,1-0.4,1-1s-0.4-1-1-1H10C9.4,2,9,2.4,9,3S9.4,4,10,4z M21,16H11c-0.6,0-1,0.4-1,1s0.4,1,1,1h10c0.6,0,1-0.4,1-1S21.6,16,21,16z M21,10H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h18c0.6,0,1-0.4,1-1S21.6,10,21,10z M21,6H3C2.4,6,2,6.4,2,7s0.4,1,1,1h18c0.6,0,1-0.4,1-1S21.6,6,21,6z" /></svg>
                                        </div>
                                        <div>
                                            <label className="text-md font-medium" ><span className='text-red-500'>*</span>Texte de l'annonce</label>
                                        </div>
                                    </div>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="block ml-2 w-full font-bold text-md py-2 px-2 mt-2 bg-white border border-gray-300 rounded-md focus:border-yellow-500 focus:outline-none focus:ring"
                                        maxLength="365"
                                        rows="5"
                                    />
                                </div>
                                {formIncomplete && (
                                    <div className="fixed bottom-24 left-0 z-10 w-full flex justify-center">
                                        <div className="bg-red-500 text-white py-2 px-4 rounded-lg">
                                            {errorMsg}
                                        </div>
                                    </div>
                                )}
                            </form>
                        </section>
                    </div>

                    <RightSide content={"Choisir la marque et le modèle est important car cela fournit aux acheteurs potentiels des informations spécifiques sur l'article que vous vendez. Cela aide également à attirer le public cible qui recherche cette marque ou ce modèle spécifique. ainsi que toute autre information qui pourrait être pertinente. Fournir un prix et des informations détaillées sur l'article peut aider à attirer le public cible, construire la confiance avec les acheteurs potentiels et les aider à prendre une décision informée sur l'achat de l'article."} />
                </div>
            </div>


            <div className="fixed right-0 bottom-0 z-10 bg-white w-screen flex justify-end items-center py-2 shadow-md">
                <button onClick={handleContinueClick} className='bg-[#e6cf8c] text-white p-2 mx-2 rounded-lg' type='submit' to='/src/Components/AnnounceForm2.jsx'>CONTINUER</button>
            </div>
        </>
    );
};

export default AnnounceForm;