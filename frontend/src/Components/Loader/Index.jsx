import React from 'react';
import './Index.css'; // Import the CSS for the loader
// import LoaderVideo from '../../assets/loader.mp4';

const Index = () => {
    
    return (
        <div className="loader-container">
            <video className="loader-video" autoPlay loop muted>
                <source src={LoaderVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Index;
