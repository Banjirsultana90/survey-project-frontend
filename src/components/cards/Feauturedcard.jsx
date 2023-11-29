import React from 'react';
import { Link } from 'react-router-dom';

const Feauturedcard = ({ card }) => {
    const { title, image, category ,id} = card
    return (
        <Link  to={`/jobdetails/${id}`} >
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                {/* <figure><img src={image} alt="Shoes" /></figure> */}
                <div className="card-body">
                    <h2 className="card-title">{title}!</h2>
                    <p>{category}</p>
                    {/* <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div> */}
                </div>
            </div></Link>
    );
};

export default Feauturedcard;