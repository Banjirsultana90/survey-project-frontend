import React from 'react';
import Banner from '../../components/banner/Banner';
import Feautured from './Feautured';
import Testimonial from './Testimonial';
import Question from './Question';
import Footer from './Footer';

const Home = () => {
    return (
        <div className=''>
           <Banner></Banner>
           <Feautured></Feautured>
           <Testimonial></Testimonial>
           <Question></Question>
           <Footer></Footer>
        </div>
    );
};

export default Home;