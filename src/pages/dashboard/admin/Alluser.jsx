import React, { useState } from 'react';
import useAxiosSecure from '../../../components/base/Useaxiossecure';
import { useQuery } from '@tanstack/react-query';

const Alluser = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/alluser', { withCredentials: true });
            return res.data;
        }
    });

    const [filter, setFilter] = useState('');

    // Filter users based on role
    const filteredUsers = users.filter(user =>
        user.role.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <div className='my-7 outline w-fit mx-auto'>
                <input
                    type="text"
                    placeholder="Filter by role"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table overflow-x-hidden">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Alluser;
