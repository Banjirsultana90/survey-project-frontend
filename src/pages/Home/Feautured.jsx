import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Featured = () => {
    const [mostVotedSurveys, setMostVotedSurveys] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/allsurvey')
            .then(response => {
                const sortedSurveys = response.data.sort((a, b) => b.totalVotes - a.totalVotes);
                setMostVotedSurveys(sortedSurveys);
            })
            .catch(error => {
                console.error('Error fetching most voted surveys:', error);
            });
    }, []);

    return (
        <div className="grid gap-4 grid-cols-3">
            {mostVotedSurveys.slice(0, 6).map(survey => (
                <div key={survey._id} className="card card-compact bg-base-100 shadow-xl">
                    <figure>
                        <img className='h-44 w-full' src={survey.image} alt={survey.title} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{survey.title}</h2>
                        <p>Description: {survey.description}</p>
                        <p>Vote:{survey.totalVotes}</p>
                        {/* <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Featured;
