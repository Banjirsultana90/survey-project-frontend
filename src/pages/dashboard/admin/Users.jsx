// import { useQuery } from '@tanstack/react-query';
// // import { FaUserGroup } from "react-icons/fa6";
// import useAxiosSecure from '../../../components/base/Useaxiossecure';
// import Swal from 'sweetalert2';
// import { useState } from 'react';

// const Users = () => {
//     const [selectedRole, setSelectedRole] = useState('');
//     const axiosSecure = useAxiosSecure()
//     const { data: users = [] } = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/alluser',{withCredentials:true})
//             return res.data

//         }
//     })
//     // const handlemakeadmin=user=>{
//     //     axiosSecure.patch(`/alluser/admin/${user._id}`)
//     //     .then(res=>{
//     //         console.log(res.data);
//     //         if(res.data.modifiedCount>0){
//     //             // refetch()
//     //             Swal.fire({
//     //                 position: "top-end",
//     //                 icon: "success",
//     //                 title: `${user.name} is Admin now`,
//     //                 showConfirmButton: false,
//     //                 timer: 1500
//     //               });

//     //         }
//     //     })
//     //     .catch((error) => {
//     //         console.error('Error making user admin:', error);
//     //         // Handle the error, such as displaying an error message to the user
//     //         Swal.fire({
//     //           icon: 'error',
//     //           title: 'Oops...',
//     //           text: 'Something went wrong while making user admin!',
//     //         });
//     //       });
//     return (
//         <div>
//             <div className='flex justify-evenly my-4'>
//                 <h2 className="text-3xl">All Users</h2>
//                 <h2 className="text-3xl">Total Users:{users.length}</h2>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="table">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Roll
                            
//                             </th>
                          
//                             <th>Action</th>

//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             users.map((user,index)=><tr key={user._id}>
//                                 <th>{index+1}</th>
//                                 <td>{user.name}</td>
//                                 <td> {user.email}</td>
//                                  {/* <td>
//                                     {user.role==='admin'? "Admin" :<button onClick={()=>handleUserRoleChange(user)}>
                                     
//                                         <FaUserGroup />
//                                     </button>}
                                   
//                                    </td> */}
//                                     <td>
//                             {user.role === 'admin' ? (
//                                 "Admin"
//                             ) : (
//                                 <div>
//                                     <button onClick={() => {
//                                         setSelectedRole('admin');
//                                         handleUserRoleChange(user, 'admin');
//                                     }}>
//                                         Make Admin
//                                     </button>
//                                     <button onClick={() => {
//                                         setSelectedRole('surveyor');
//                                         handleUserRoleChange(user, 'surveyor');
//                                     }}>
//                                         Make Surveyor
//                                     </button>
//                                 </div>
//                             )}
//                         </td>
//                                 <td>Blue</td>
//                             </tr>)
//                         }
                        


//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };


import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaUserGroup } from "react-icons/fa6";
import Swal from 'sweetalert2';
import useAxiosSecure from "../../../components/base/Useaxiossecure";
import { useState } from "react";

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedUser, setSelectedUser] = useState(null);
    const queryClient = useQueryClient();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/alluser', { withCredentials: true });
            return res.data;
        }
    });

    const handleUserRoleChangeadmin = async (user) => {
        try {
            const res = await axiosSecure.patch(`/alluser/admin/${user._id}`);
            if (res.data.modifiedCount > 0) {
                await queryClient.invalidateQueries('users'); // Invalidate and refetch the 'users' query
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is now a admin`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error changing user role:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong while changing user role!',
            });
        }
        setSelectedUser(null);
    };
    const handleUserRoleChangesurveyor = async (user) => {
        try {
            const res = await axiosSecure.patch(`/alluser/surveyor/${user._id}`);
            if (res.data.modifiedCount > 0) {
                await queryClient.invalidateQueries('users'); // Invalidate and refetch the 'users' query
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is now a surveyor`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error changing user role:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong while changing user role!',
            });
        }
        setSelectedUser(null);
    };

    const renderRoleButton = (user) => {
        if (selectedUser === user._id) {
            return (
                <div>
                    <button onClick={() => handleUserRoleChangeadmin(user, 'admin')}>
                        Make Admin
                    </button>
                    <button onClick={() => handleUserRoleChangesurveyor(user, 'surveyor')}>
                        Make Surveyor
                    </button>
                </div>
            );
        } else {
            return (
                <button onClick={() => setSelectedUser(user._id)}>
                    <FaUserGroup />
                </button>
            );
        }
    };

    return (
        <div>
            <div className='flex justify-evenly my-4'>
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users:{users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
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
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? (
                                        "Admin"
                                    ) : user.role === 'surveyor' ? (
                                        "Surveyor"
                                    ) : (
                                        renderRoleButton(user)
                                    )}
                                </td>
                                <td>Blue</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
