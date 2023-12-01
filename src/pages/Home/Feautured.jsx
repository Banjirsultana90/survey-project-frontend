// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../../components/base/Useaxiossecure';

// const Featured = () => {
//     const [mostVotedSurveys, setMostVotedSurveys] = useState([]);
//     const axiosSecure=useAxiosSecure()

//     useEffect(() => {
//         axiosSecure.get('/allcreatedsurvey')
//             .then(response => {
//                 const sortedSurveys = response.data.sort((a, b) => b.totalVotes - a.totalVotes);
//                 setMostVotedSurveys(sortedSurveys);
//             })
//             .catch(error => {
//                 console.error('Error fetching most voted surveys:', error);
//             });
//     }, []);

//     return (
//         <div className="grid gap-4 grid-cols-3">
//             {mostVotedSurveys.slice(0, 6).map(survey => (
//                 <div key={survey._id} className="card card-compact bg-base-100 shadow-xl">
//                     <figure>
//                         <img className='h-44 w-full' src={survey.image} alt={survey.title} />
//                     </figure>
//                     <div className="card-body">
//                         <h2 className="card-title">{survey.title}</h2>
//                         <p>Description: {survey.description}</p>
//                         <p>Vote:{survey.totalVotes}</p>
//                         {/* <div className="card-actions justify-end">
//                             <button className="btn btn-primary">Buy Now</button>
//                         </div> */}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Featured;
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../components/base/Useaxiossecure';

const Featured = () => {
    const [mostRecentSurveys, setMostRecentSurveys] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/allcreatedsurvey')
            .then(response => {
                const sortedSurveys = response.data.sort((a, b) => {
                    // Assuming the timestamp is in a field named "timestamp"
                    return new Date(b.timestamp) - new Date(a.timestamp);
                });
                setMostRecentSurveys(sortedSurveys.slice(0, 6));
            })
            .catch(error => {
                console.error('Error fetching most recent surveys:', error);
            });
    }, [axiosSecure]);

    return (
        <div>
            <h3 className='text-5xl font-bold text-center my-5'> Recently Created Survey</h3>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
            {mostRecentSurveys.map(survey => (
                <div key={survey._id} className="card card-compact bg-purple-600 text-white shadow-xl">
                    {/* <figure>
                        <img className='h-44 w-full' src={survey.image} alt={survey.title} />
                    </figure> */}
                    <div className="card-body">
                        <h2 className="card-title">{survey.title}</h2>
                        <p>Description: {survey.description}</p>
                        {/* <p>Vote: {survey.timestamp}</p> */}
                        {/* <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div> */}
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default Featured;

