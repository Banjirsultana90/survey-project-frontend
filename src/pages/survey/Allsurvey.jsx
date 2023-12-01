

import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Allsurvey = () => {
    const allcollection = useLoaderData()
    // console.log(allcollection);
    const [filter, setFilter] = useState({ title: '', category: '', vote: '' });

    const filteredSurveys = allcollection.filter(survey =>
        survey.title.toLowerCase().includes(filter.title.toLowerCase()) &&
        survey.category.toLowerCase().includes(filter.category.toLowerCase()) &&
        String(survey.totalVotes).includes(filter.vote)
    );

    return (
        <div className='my-10'>
          <div className='my-10 mx-20'>
              {/* Filter options */}
              <input
                type="text"
                placeholder="Filter by title"
                value={filter.title}
                onChange={e => setFilter({ ...filter, title: e.target.value })}
            />
            <input
                type="text"
                placeholder="Filter by category"
                value={filter.category}
                onChange={e => setFilter({ ...filter, category: e.target.value })}
            />
            <input
                type="text"
                placeholder="Filter by votes"
                value={filter.vote}
                onChange={e => setFilter({ ...filter, vote: e.target.value })}
            />
          </div>

            {/* Display surveys */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {filteredSurveys.map(survey => (
                    // eslint-disable-next-line react/jsx-key
                  <div key={survey.id} className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body bg-purple-600 text-white">
                        <h2 className="card-title">{survey.title}</h2>
                        <p>Category:{survey.category}</p>
                        <p>Description: {survey.description}</p>
                        {/* <p>vote:{survey.votr}</p> */}



                        <div className="card-actions justify-end">
                        <Link to= {`/surveydetails/${survey._id}`}><button className="btn">See details</button> </Link>
                            <Link to={`/update/${survey._id}`}><button className="btn">Update</button></Link>
                        </div>
                    </div>
                   
                </div>
                ))}
            </div>

              
        
        </div>
    );
};


export default Allsurvey;
