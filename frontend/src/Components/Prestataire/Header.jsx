import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="fixed bg-white w-full flex flex-col md:flex-row justify-between items-center px-2 md:px-10 py-2 z-10 shadow-none md:shadow-md">
            <div className="text-center md:text-left mb-2 md:mb-0">
                <h1 className='font-bold text-md text-yellow-500'>Information Général</h1>
                <p className='text-yellow-500 text-sm sm'>Remplire les informations générales de votre annonce</p>
            </div>
            <div className="flex items-center space-x-2 md:mb-0 mb-2">
                <div className="bg-yellow-500 rounded-full p-1 flex justify-center items-center" style={{ width: '35px', height: '35px' }}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9H13C13.5523 9 14 8.55228 14 8C14 7.44772 13.5523 7 13 7H7Z" fill="#FFFFFF" />
                        <path d="M6 12C6 11.4477 6.44772 11 7 11H13C13.5523 11 14 11.4477 14 12C14 12.5523 13.5523 13 13 13H7C6.44772 13 6 12.5523 6 12Z" fill="#FFFFFF" />
                        <path d="M7 15C6.44772 15 6 15.4477 6 16C6 16.5523 6.44772 17 7 17H13C13.5523 17 14 16.5523 14 16C14 15.4477 13.5523 15 13 15H7Z" fill="#FFFFFF" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.625 3H7.03369C7.71014 2.37135 8.6473 2 9.62497 2H18.375C20.263 2 22 3.38491 22 5.33333V14.6667C22 16.6151 20.263 18 18.375 18H17.94C17.631 19.697 16.1637 21 14.375 21H5.625C3.60818 21 2 19.3435 2 17.3333V6.66667C2 4.65653 3.60818 3 5.625 3ZM18.375 16H18V6.66667C18 5.62093 17.5648 4.67089 16.8632 4H18.375C19.3864 4 20 4.70443 20 5.33333V14.6667C20 15.2956 19.3864 16 18.375 16ZM5.625 5C4.74233 5 4 5.73129 4 6.66667V17.3333C4 18.2687 4.74233 19 5.625 19H14.375C15.2577 19 16 18.2687 16 17.3333V6.66667C16 5.73129 15.2577 5 14.375 5H5.625Z" fill="#FFFFFF" />
                    </svg>
                </div>

                <svg width="20px" height="20px" viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path fill="#FFD700" className="cls-1" d="M28.5,60.5a6,6,0,0,1-5.73-7.78l2.94-9.45a2,2,0,0,1,3.82,1.19l-2.94,9.45a2,2,0,0,0,3.82,1.18l7-22.5a2,2,0,0,0,0-1.18l-7-22.5a2,2,0,0,0-3.82,1.18l6.63,21.32a2,2,0,0,1,0,1.18l-.88,2.85a2,2,0,0,1-3.82-1.19l.7-2.25L22.77,11.28A6,6,0,0,1,34.23,7.72l7,22.5a6,6,0,0,1,0,3.56l-7,22.5A6,6,0,0,1,28.5,60.5Z" /></svg>

                <div className='bg-gray-300 rounded-full' style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C12.5523 22 13 21.5523 13 21C13 20.4477 12.5523 20 12 20V22ZM12.4453 4.01216C12.9968 4.04235 13.4683 3.61979 13.4985 3.06833C13.5287 2.51687 13.1061 2.04535 12.5547 2.01515L12.4453 4.01216ZM11.7627 9.23726L11.0556 8.53015L11.7627 9.23726ZM17.411 3.58902L18.1181 4.29613L17.411 3.58902ZM9 15L8.01005 14.8586C7.96411 15.1802 8.07723 15.504 8.3134 15.727C8.54957 15.9501 8.87936 16.0445 9.19778 15.9802L9 15ZM9.04745 14.6678L8.0575 14.5264L8.0575 14.5264L9.04745 14.6678ZM9.48793 14.9016L9.29015 13.9213L9.48793 14.9016ZM12.8012 13.7247L12.2287 12.9048H12.2287L12.8012 13.7247ZM11.564 14.3882L11.9302 15.3187H11.9302L11.564 14.3882ZM10.1791 10.9786L9.34943 10.4203V10.4203L10.1791 10.9786ZM9.49029 12.3561L8.54586 12.0274V12.0274L9.49029 12.3561ZM16.7071 4.29289C16.3166 3.90237 15.6834 3.90237 15.2929 4.29289C14.9024 4.68342 14.9024 5.31658 15.2929 5.70711L16.7071 4.29289ZM18.1213 8.53553C18.5118 8.92606 19.145 8.92606 19.5355 8.53553C19.9261 8.14501 19.9261 7.51184 19.5355 7.12132L18.1213 8.53553ZM16 16C15.4477 16 15 16.4477 15 17C15 17.5523 15.4477 18 16 18V16ZM21.88 10.8011C21.7701 10.2598 21.2423 9.91012 20.701 10.02C20.1598 10.1299 19.8101 10.6577 19.92 11.1989L21.88 10.8011ZM12 20C7.58172 20 4 16.4183 4 12H2C2 17.5228 6.47715 22 12 22V20ZM4 12C4 7.58172 7.58172 4 12 4V2C6.47715 2 2 6.47715 2 12H4ZM12 4C12.1495 4 12.298 4.00409 12.4453 4.01216L12.5547 2.01515C12.371 2.00509 12.186 2 12 2V4ZM12.4698 9.94436L18.1181 4.29613L16.7039 2.88191L11.0556 8.53015L12.4698 9.94436ZM19.5323 5.71034L13.6703 11.5723L15.0845 12.9865L20.9465 7.12455L19.5323 5.71034ZM9.98995 15.1414L10.0374 14.8093L8.0575 14.5264L8.01005 14.8586L9.98995 15.1414ZM9.29015 13.9213L8.80222 14.0198L9.19778 15.9802L9.68571 15.8818L9.29015 13.9213ZM13.6703 11.5723C12.8844 12.3582 12.5736 12.664 12.2287 12.9048L13.3737 14.5447C13.8964 14.1797 14.3472 13.7239 15.0845 12.9865L13.6703 11.5723ZM9.68571 15.8818C10.7079 15.6755 11.3371 15.5522 11.9302 15.3187L11.1977 13.4577C10.8064 13.6118 10.3796 13.7015 9.29015 13.9213L9.68571 15.8818ZM12.2287 12.9048C11.9079 13.1288 11.5618 13.3144 11.1977 13.4577L11.9302 15.3187C12.44 15.1181 12.9245 14.8583 13.3737 14.5447L12.2287 12.9048ZM11.0556 8.53015C10.243 9.34283 9.74031 9.83942 9.34943 10.4203L11.0087 11.5369C11.2665 11.1538 11.6034 10.8108 12.4698 9.94436L11.0556 8.53015ZM10.0374 14.8093C10.2107 13.5963 10.2829 13.121 10.4347 12.6848L8.54586 12.0274C8.31572 12.6886 8.22004 13.3887 8.0575 14.5264L10.0374 14.8093ZM9.34943 10.4203C9.01364 10.9192 8.74356 11.4594 8.54586 12.0274L10.4347 12.6848C10.5759 12.2791 10.7688 11.8933 11.0087 11.5369L9.34943 10.4203ZM19.5323 4.29613C19.9228 4.68665 19.9228 5.31981 19.5323 5.71034L20.9465 7.12455C22.1181 5.95298 22.1181 4.05348 20.9465 2.88191L19.5323 4.29613ZM20.9465 2.88191C19.7749 1.71034 17.8754 1.71034 16.7039 2.88191L18.1181 4.29613C18.5086 3.9056 19.1418 3.9056 19.5323 4.29613L20.9465 2.88191ZM15.2929 5.70711L18.1213 8.53553L19.5355 7.12132L16.7071 4.29289L15.2929 5.70711ZM20 12C20 14.2091 18.2091 16 16 16V18C19.3137 18 22 15.3137 22 12H20ZM19.92 11.1989C19.9723 11.4569 20 11.7247 20 12H22C22 11.5903 21.9588 11.1893 21.88 10.8011L19.92 11.1989Z" fill="#FFFFFF" />
                    </svg>
                </div>

                <svg width="20px" height="20px" viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path fill="#FFD700" className="cls-1" d="M28.5,60.5a6,6,0,0,1-5.73-7.78l2.94-9.45a2,2,0,0,1,3.82,1.19l-2.94,9.45a2,2,0,0,0,3.82,1.18l7-22.5a2,2,0,0,0,0-1.18l-7-22.5a2,2,0,0,0-3.82,1.18l6.63,21.32a2,2,0,0,1,0,1.18l-.88,2.85a2,2,0,0,1-3.82-1.19l.7-2.25L22.77,11.28A6,6,0,0,1,34.23,7.72l7,22.5a6,6,0,0,1,0,3.56l-7,22.5A6,6,0,0,1,28.5,60.5Z" /></svg>

                <div className='bg-gray-300 rounded-full' style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <svg fill="#FFFFFF" width="30px" height="30px" viewBox="0 -32 576 576" xmlns="http://www.w3.org/2000/svg"><path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z" /></svg>
                </div>

                <svg width="20px" height="20px" viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path fill="#FFD700" className="cls-1" d="M28.5,60.5a6,6,0,0,1-5.73-7.78l2.94-9.45a2,2,0,0,1,3.82,1.19l-2.94,9.45a2,2,0,0,0,3.82,1.18l7-22.5a2,2,0,0,0,0-1.18l-7-22.5a2,2,0,0,0-3.82,1.18l6.63,21.32a2,2,0,0,1,0,1.18l-.88,2.85a2,2,0,0,1-3.82-1.19l.7-2.25L22.77,11.28A6,6,0,0,1,34.23,7.72l7,22.5a6,6,0,0,1,0,3.56l-7,22.5A6,6,0,0,1,28.5,60.5Z" /></svg>
                <div className='bg-gray-300 rounded-full' style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75 1C6.16421 1 6.5 1.33579 6.5 1.75V3.6L8.22067 3.25587C9.8712 2.92576 11.5821 3.08284 13.1449 3.70797L13.3486 3.78943C14.9097 4.41389 16.628 4.53051 18.2592 4.1227C19.0165 3.93339 19.75 4.50613 19.75 5.28669V12.6537C19.75 13.298 19.3115 13.8596 18.6864 14.0159L18.472 14.0695C16.7024 14.5119 14.8385 14.3854 13.1449 13.708C11.5821 13.0828 9.8712 12.9258 8.22067 13.2559L6.5 13.6V21.75C6.5 22.1642 6.16421 22.5 5.75 22.5C5.33579 22.5 5 22.1642 5 21.75V1.75C5 1.33579 5.33579 1 5.75 1Z" fill="#FFFFFF" />
                    </svg>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Link to="/Annonces" className="text-xs font-semibold text-yellow-500">َQuitter</Link>
            </div>
        </div>
    );
}

export default Header;