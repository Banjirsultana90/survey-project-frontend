import React from 'react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const navigate=useNavigate()
    const handlepay=()=>{
       navigate('/payment')

    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Pro User!</h2>
                <p>Grab it to become pro!!!!</p>
                <p>Price:$200</p>
                <div className="card-actions justify-end">
                    <button onClick={handlepay} className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;