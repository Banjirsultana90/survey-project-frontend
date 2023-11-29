import React, { useContext } from 'react';
import { AuthContext } from '../../components/provider/AuthProvider';
import useAxiosPublic from '../../components/base/useAxiosPublic';
import { useNavigate } from 'react-router-dom';


const Sociallogin = () => {
    const{user,googlelogin}=useContext(AuthContext)
    const axiosPublic=useAxiosPublic()
    const navigate=useNavigate()
    const handlesociallogin=()=>{
        googlelogin()
        .then((result) => {
            
            console.log(result.user);
            const userInfo={
                email:result.user?.email,
                name:result.user?.displayName
            }
            axiosPublic.post('/alluser',userInfo)
             .then(res=>{
                console.log(res.data);
                navigate('/')
             })
        })
        .catch((error) => {
            ('/')
            console.error(error);
        });
        

    }
    return (
        <div>
            <button onClick={handlesociallogin} className='btn btn-ghost'>Google login</button>
        </div>
    );
};

export default Sociallogin;