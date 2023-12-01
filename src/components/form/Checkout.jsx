
import React, { useContext, useEffect, useState } from 'react';
import { Await, useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../base/Useaxiossecure';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const Checkout = () => {
    const navigate=useNavigate()
    const [clientSecret, setClientSecret] = useState('');
    const [transactionid,settransactid]=useState('')

    const stripe = useStripe();
    const {user}=useContext(AuthContext)
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();

    const location = useLocation();
    const { price } = location.state || { price: 0 }; // Retrieve the price from location state

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price }).then((res) => {
            // console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        });
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('payment error', error);
            setError(error.message);
        } else {
            console.log('payment method', paymentMethod);
        }
        const{paymentIntent,error:confirmerror}=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:card,
                billing_details:{
                    email:user?.email ||"anonymous",
                    name:user?.displayName||'anonymous'


                }
            }

        })
        if(confirmerror){
            console.log('confirm error');

        }
        else{
            console.log('payment method',paymentIntent);
            if(paymentIntent.status==='succeeded'){
                console.log('transaction id',paymentIntent.id);
                settransactid(paymentIntent.id)
                // save payment to db
                const payment={
                    email:user.email,
                    price:price,
                    transactionid:paymentIntent.id,
                    date:new Date(),
                    status:' pending'
                }
                const res=await axiosSecure.post('/payments',payment)
                console.log('payment saved',res.data);
                
                if (res.data?.paymentresult?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "payment done successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/dashboard/userpayinfo')
                }
            }

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-2xl text-red-500">{error}</p>
            {
                transactionid && <p className='text-2xl text-green-700'>Your transaction successful</p>
            }
        </form>
    );
};

export default Checkout;
