const RightSide = ({ title = 'Comment définir mon annonce', content }) => {
    return (
        <div className="w-full md:w-64 lg:w-96 h-auto bg-white shadow-md rounded-xl p-3 flex flex-col justify-between">
            {/* ICON && Text Header */}
            <div className='flex gap-2 justify-start items-center mb-3'>
                <div className='flex-col gap-2'>
                    <div className='bg-[#e6cf8c] rounded-full' style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="ic-lamp" fillRule="nonzero" fill="#FFFFFF">
                                    <path d="M14,15 L14,15 C14,15 17,10.7179603 17,8.86111111 C17,6.17639358 14.7614237,4 12,4 C9.23857625,4 7,6.17639358 7,8.86111111 C7,11.5458286 10,15 10,15 L14,15 Z M14,17 L10,17 L9.08801644,17 L8.49000407,16.3114543 C8.05227388,15.8074559 7.42989845,14.9980309 6.80434805,13.9978738 C6.16962621,12.983053 5.66962614,11.9751664 5.35561966,10.9828868 C5.12578781,10.2566042 5,9.55015675 5,8.86111111 C5,5.0590187 8.14641923,2 12,2 C15.8535808,2 19,5.0590187 19,8.86111111 C19,9.88033254 18.5978164,11.0183796 17.8910708,12.4133336 C17.6926413,12.8049882 17.4721551,13.2098586 17.2332398,13.6248118 C16.8847181,14.2301317 16.5138507,14.8283525 16.1430473,15.395869 C15.9195215,15.7379762 15.7434996,15.9970025 15.6380014,16.147585 L15.0407989,17 L14,17 Z M10,20 C9.44771525,20 9,19.5522847 9,19 C9,18.4477153 9.44771525,18 10,18 L14,18 C14.5522847,18 15,18.4477153 15,19 C15,19.5522847 14.5522847,20 14,20 L10,20 Z M11,23 C10.4477153,23 10,22.5522847 10,22 C10,21.4477153 10.4477153,21 11,21 L13,21 C13.5522847,21 14,21.4477153 14,22 C14,22.5522847 13.5522847,23 13,23 L11,23 Z M11.25,6 C10.9564596,6 10.5686937,6.06462764 10.1645898,6.26667961 C9.4501558,6.62389661 9,7.29913031 9,8.25 C9,8.66421356 9.33578644,9 9.75,9 C10.1642136,9 10.5,8.66421356 10.5,8.25 C10.5,7.88836969 10.6123442,7.71985339 10.8354102,7.60832039 C10.9938063,7.52912236 11.1685404,7.5 11.25,7.5 C11.6642136,7.5 12,7.16421356 12,6.75 C12,6.33578644 11.6642136,6 11.25,6 L11.25,6 Z" id="Combined-Shape"></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
                <h1 className='font-bold text-md'>{title}</h1>
            </div>

            <div className="bg-yellow-100 rounded-lg  p-0 lg:p-4">
                <div className="mt-2">
                    <svg
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto mb-2"
                    >
                        <g clipPath="url(#clip0_429_11086)">
                            <circle cx="12" cy="12" r="9" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="12" y="16" width="0.01" height="0.01" stroke="#B45309" strokeWidth="3.75" strokeLinejoin="round" />
                            <path d="M12 12L12 8" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_429_11086">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>

                <div className='flex-grow flex lg:items-center items-start lg:p-3 p-2 lg:justify-center  justify-start'>
                    <p className='text-yellow-700 font-medium text-sm text-center'>{content}</p>
                </div>
            </div>

            <div className='flex justify-center items-center mt-3'>
                <a className='underline text-md py-3 font-bold text-gray-900' href="/conditions">Termes et conditions d’annonce</a>
            </div>
        </div>
    );
}

export default RightSide;