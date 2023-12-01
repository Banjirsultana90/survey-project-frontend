import React from 'react';
import img from '../../assets/survey-suggestion-opinion-review-feedback-concept.jpg'

const Banner = () => {
    return (
        <div className=''> 
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${img})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">Empowering Your Health, One Survey at a Time

                            Explore Surveys, Shape Your Well-being</p>
                        <button className="btn bg-purple-600 text-white">Get Started</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Banner;