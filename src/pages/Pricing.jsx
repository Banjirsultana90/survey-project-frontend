
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const navigate = useNavigate();

    const handlePay = () => {
        navigate('/payment', { state: { price: 200 } }); // Set the price here
    };

    return (
        <div className="flex justify-center items-center h-screen">
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Pro User!</h2>
                <p>Grab it to become pro!!!!</p>
                <p>Price: $200</p>
                <div className="card-actions justify-end">
                    <button onClick={handlePay} className="btn bg-purple-800 text-white w-full">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    );
};

export default Pricing;
