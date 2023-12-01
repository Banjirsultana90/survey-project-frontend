import React from 'react';
import img1 from '../../assets/register-enquiry-online-web-page-concept (1).jpg';

const Testimonial = () => {
    return (
       <div>
           <h2 className='text-5xl font-bold text-center my-5'>Testimonial</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card card-side bg-base-100 shadow-xl">
                <figure>
                    <img src={img1} alt="Movie" className="w-full" />
                </figure>
            </div>
            <div className="card card-side bg-base-100 shadow-xl">
                <div className="card-body">
                    <p className='text-xl font-bold mt-5'>
                        "I've participated in multiple surveys through this platform, and I'm impressed by the diverse range of topics and the user-friendly interface. It's easy to navigate and provide feedback. The surveys are engaging, and I feel my opinions are valued. Great experience overall!"
                        <br />
                        <br />
                        John Doe, Participant since 2020
                    </p>
                </div>
            </div>
        </div>
       </div>
    );
};

export default Testimonial;
