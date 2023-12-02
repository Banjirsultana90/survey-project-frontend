import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/2144781.jpg'

const Error = () => {
    return (
        <div className=''>
        <img className='mx-auto h-64'  src={img1}alt="" />
      <Link to='/'> <button className='px-10  mx-20 text-center bg-green-500 text-lg'>Back to home</button></Link>


       
        
    </div>
    );
};

export default Error;