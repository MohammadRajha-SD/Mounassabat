import { Link } from "react-router-dom";

const Header3 = () => {
    return (
        <div className="fixed bg-white w-full flex flex-col md:flex-row justify-between items-center px-2 md:px-10 py-2 z-10 shadow-none md:shadow-md">
            {/* Title Section */}
            <div className="text-center md:text-left mb-2 md:mb-0">
                <h1 className="font-bold text-sm md:text-md text-yellow-500">Photos de l’annonce</h1>
                <p className="text-xs md:text-sm text-yellow-500">Ajouter des photos de bonne qualité</p>
            </div>

            {/* Progress and Icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
                {/* Progress Circle 1 */}
                <div className="bg-green-500 rounded-full flex justify-center items-center" style={{ width: '30px', height: '30px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* SVG Icon 1 */}
                <svg width="16" height="16" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#FFD700" d="M28.5,60.5a6,6,0,0,1-5.73-7.78l2.94-9.45a2,2,0,0,1,3.82,1.19l-2.94,9.45a2,2,0,0,0,3.82,1.18l7-22.5a2,2,0,0,0,0-1.18l-7-22.5a2,2,0,0,0-3.82,1.18l6.63,21.32a2,2,0,0,1,0,1.18l-.88,2.85a2,2,0,0,1-3.82-1.19l.7-2.25L22.77,11.28A6,6,0,0,1,34.23,7.72l7,22.5a6,6,0,0,1,0,3.56l-7,22.5A6,6,0,0,1,28.5,60.5Z" />
                </svg>

                {/* Progress Circle 2 */}
                <div className="bg-green-500 rounded-full flex justify-center items-center" style={{ width: '30px', height: '30px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* SVG Icon 2 */}
                <svg width="16" height="16" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#FFD700" d="M28.5,60.5a6,6,0,0,1-5.73-7.78l2.94-9.45a2,2,0,0,1,3.82,1.19l-2.94,9.45a2,2,0,0,0,3.82,1.18l7-22.5a2,2,0,0,0,0-1.18l-7-22.5a2,2,0,0,0-3.82,1.18l6.63,21.32a2,2,0,0,1,0,1.18l-.88,2.85a2,2,0,0,1-3.82-1.19l.7-2.25L22.77,11.28A6,6,0,0,1,34.23,7.72l7,22.5a6,6,0,0,1,0,3.56l-7,22.5A6,6,0,0,1,28.5,60.5Z" />
                </svg>

                {/* Progress Circle 3 */}
                <div className="bg-yellow-500 rounded-full flex justify-center items-center" style={{ width: '30px', height: '30px' }}>
                    <svg fill="#FFFFFF" width="16" height="16" viewBox="0 0 576 576" xmlns="http://www.w3.org/2000/svg">
                        <path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z" />
                    </svg>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2">
                <Link className="bg-yellow-500 text-white p-2 rounded-lg" to='/AnnounceForm2'>
                    <svg fill="#FFFFFF" width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 21.984q0.032-0.8 0.608-1.376l4-4q0.448-0.48 1.056-0.576t1.12 0.128 0.864 0.736 0.352 1.12v1.984h18.016q0.8 0 1.408-0.576t0.576-1.408v-8q0-0.832-0.576-1.408t-1.408-0.608h-16q-0.736 0-1.248-0.416t-0.64-0.992 0-1.152 0.64-1.024 1.248-0.416h16q2.464 0 4.224 1.76t1.76 4.256v8q0 2.496-1.76 4.224t-4.224 1.76h-18.016v2.016q0 0.64-0.352 1.152t-0.896 0.704-1.12 0.096-1.024-0.544l-4-4q-0.64-0.608-0.608-1.44z"></path>
                    </svg>
                </Link>
                <Link to="/" className="text-xs font-semibold text-yellow-500">َQuitter</Link>
            </div>
        </div>
    );
};

export default Header3;
