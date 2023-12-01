import React, { useContext } from 'react';
import { AuthContext } from '../../components/provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../components/base/Useaxiossecure';

const Userpaymentinfo = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`,{withCredentials:true})
            return res.data
        }
    })
    return (
        <div>
            <h2>Total payments:{payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Price</th>
                            <th>Transaction Id</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment,index)=>
                         <tr key={payment._id}>
                         <th>{index+1}</th>
                         <td>{payment.price}</td>
                         <td>{payment.transactionid}</td>
                         <td>{payment.status}</td>
                     </tr>)}
                       
                       
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default Userpaymentinfo;