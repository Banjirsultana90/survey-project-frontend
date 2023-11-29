import React, { useContext } from 'react';
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../components/provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const Adminroute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const [isAdmin,isAdminloading]=useAdmin()
    const location=useLocation()
    if(loading||isAdminloading){
        return <h2 className='text-center text-2xl'>loading</h2>
    }
    if(user && isAdmin){
        return children
    } 
    return <Navigate state={location.pathname} to='/Login'></Navigate>
};

export default Adminroute;