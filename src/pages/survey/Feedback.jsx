// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAxiosSecure from '../../components/base/Useaxiossecure';

// const Feedback = () => {
//     const axiosSecure=useAxiosSecure()
//     const { data: votes = [] } = useQuery({
//         queryKey: ['votes'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/allvotedfeature', { withCredentials: true });
//             return res.data;
//         }
//     });
//     return (
//         <div className="overflow-x-auto">
//             <table className="table">
//                 {/* head */}
//                 <thead>
//                     <tr>
//                         <th></th>
//                         <th>SurveyId</th>
//                         <th>Email</th>
//                         <th>Feedback</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                 {votes.map((vote, index) =>
//                             <tr key={vote._id}>
//                                 <th>{index + 1}</th>
//                                 <td>{vote.surveyId}</td>
//                                 <td>{vote.email}</td>
//                                 <td>{vote.comment }</td>
                                

//                             </tr>)}
                   
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Feedback;
import React from 'react';
import useAxiosSecure from '../../components/base/Useaxiossecure';
import { useQuery } from '@tanstack/react-query';

const Feedback = () => {
    const axiosSecure = useAxiosSecure();
    const { data: votes = [] } = useQuery({
        queryKey: ['votes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allvotedfeature', { withCredentials: true });
            return res.data;
        }
    });

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>SurveyId</th>
                        <th>Email</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {votes.map((vote, index) => (
                        <tr key={vote._id}>
                            <th>{index + 1}</th>
                            <td>{vote.surveyId}</td>
                            <td>{vote.email}</td>
                            <td>
                                <button
                                    className="text-blue-500"
                                    onClick={() => document.getElementById(`comment_${vote._id}`).showModal()}
                                >
                                    View Comment
                                </button>

                                {/* Modal */}
                                <dialog id={`comment_${vote._id}`} className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Feedback Comment</h3>
                                        <p className="py-4">{vote.comment}</p>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* Button to close the modal */}
                                                <button className="btn" onClick={() => document.getElementById(`comment_${vote._id}`).close()}>Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Feedback;
