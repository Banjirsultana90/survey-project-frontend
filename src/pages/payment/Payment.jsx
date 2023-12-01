import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import Checkout from '../../components/form/Checkout';
// add pk
const stripePromise=loadStripe(import.meta.env.VITE_PUBLISHABLEKEY)
const Payment = () => {
    return (
        <div className='mx-10 my-9'>
         <Elements stripe={stripePromise} >
            <Checkout></Checkout>

         </Elements>
        </div>
    );
};

export default Payment;