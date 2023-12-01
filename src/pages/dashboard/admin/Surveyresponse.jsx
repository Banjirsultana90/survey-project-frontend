// import React from 'react';
// import { axiosSecure } from '../../../components/base/Useaxiossecure';
// import { useQuery } from '@tanstack/react-query';



// const Surveyresponse = () => {
//     const { data: votes = [] } = useQuery({
//         queryKey: ['votes'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/allvotedfeature', { withCredentials: true });
//             return res.data;
//         }
//     });
//     return (
//         <div>
//             <div className="overflow-x-auto">
//                 <table className="table">

//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Time</th>
//                             <th>Voted</th>
//                         </tr>
//                     </thead>
//                     <tbody>

//                         {votes.map((vote, index) =>
//                             <tr key={vote._id}>
//                                 <th>{index + 1}</th>
//                                 <td>{vote.name}</td>
//                                 <td>{vote.email}</td>
//                                 <td>{vote.timestamp }</td>
//                                 <td>{vote.votedOption }</td>


//                             </tr>)}

//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Surveyresponse;
import React, { useEffect, useRef } from 'react';
import { axiosSecure } from '../../../components/base/Useaxiossecure';
import { useQuery } from '@tanstack/react-query';
import Chart from 'chart.js/auto';

const Surveyresponse = () => {
    const { data: votes = [] } = useQuery({
        queryKey: ['votes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allvotedfeature', { withCredentials: true });
            return res.data;
        }
    });

    const chartRef = useRef(null);

    useEffect(() => {
        if (votes.length > 0) {
            if (chartRef.current) {
                chartRef.current.destroy(); // Destroy previous chart instance
            }

            const labels = votes.map((vote, index) => `Vote ${index + 1}`);
            const votesData = votes.map(vote => vote.votedOption);

            const ctx = document.getElementById('surveyChart');
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Voted Options',
                        data: votesData,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [votes]);

    return (
        <div>
           <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                       <tr>
                             <th></th>
                             <th>Name</th>
                            <th>Email</th>
                          <th>Time</th>
                            <th>Voted</th>
                       </tr>
                    </thead>
                   <tbody>

                         {votes.map((vote, index) =>
                            <tr key={vote._id}>
                                <th>{index + 1}</th>
                                <td>{vote.surveyId}</td>
                                <td>{vote.email}</td>
                                <td>{vote.timestamp }</td>
                                <td>{vote.votedOption }</td>


                            </tr>)}

                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <canvas id="surveyChart" width="400" height="200"></canvas>
            </div>
        </div>
    );
};

export default Surveyresponse;
