import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../components/provider/AuthProvider';

const Surveyorhome = () => {
    const {user}=useContext(AuthContext)
    return (
        <div>
              <h2 className='text-3xl'>
            <span>Hi welcome</span>
            {
                user?.displayName?user.displayName:'back'
            }

           </h2>
        </div>
    );
};

export default Surveyorhome;