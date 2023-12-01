import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../components/base/Useaxiossecure';
import { Toaster } from 'react-hot-toast';

const Userspayment = () => {

    const axiosSecure = useAxiosSecure()
    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments', { withCredentials: true });
            return res.data;
        }
    });
    return (
        <div>
            <h2 className='text-3xl text-center my-5'>Users payment History</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Transaction id</th>
                            <th>Date</th>

                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) =>
                            <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.email}</td>
                                <td>{payment.price}</td>
                                <td>{payment.transactionid}</td>
                                <td>{payment.date}</td>
                            </tr>)}


                    </tbody>
                </table>
            </div>
            <Toaster />
        </div>
    );
};

export default Userspayment;