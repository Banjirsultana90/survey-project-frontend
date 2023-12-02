import React, { useContext } from 'react';
import { AuthContext } from '../../components/provider/AuthProvider';

const Userhome = () => {
    const {user}=useContext(AuthContext)
    return (
        <div>
               <h2 className='text-3xl'>
            <span>Hi welcome </span>
            {
                user?.displayName?user.displayName:'back'
            }

           </h2>
        </div>
    );
};

export default Userhome;