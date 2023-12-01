import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import Checkout from '../../components/form/Checkout';
// add pk
const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLEKEY)
const Payment = () => {
    return (
        <div>
            <div className='mx-20 my-20'>
                <Elements stripe={stripePromise} >
                    <Checkout></Checkout>

                </Elements>
            </div>
        </div>
    );
};

export default Payment;
