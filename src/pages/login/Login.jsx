import React, { useContext, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

import { AuthContext } from '../../components/provider/AuthProvider';
import Sociallogin from '../social/Sociallogin';





const Login = () => {

    const { signin, user } = useContext(AuthContext);
    console.log(signin, user);
    const location = useLocation();
    const navigate = useNavigate();
    const formRef = useRef(null);

    const handlesubmit = (e) => {
        e.preventDefault();
        const form = new FormData(formRef.current);
        const email = form.get('email');
        const password = form.get('password');

        signin(email, password)
            .then(result => {
                console.log(result.user);
                navigate(location?.state ? location.state : '/');
                toast.success('Login successful');
            })
            .catch(error => {
                console.log(error);
                toast.error('Login failed. Please check your credentials.');
            });
    }
    return (
        <div className="hero min-h-screen bg-base-200 overflow-x-hidden">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form ref={formRef} onSubmit={handlesubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
                <p className='text-center'>Not registered yet! Please <Link to='/Register'> <span className='text-red-600'>Register</span></Link></p>
                <Sociallogin></Sociallogin>
                <Toaster />

            </div>
        </div>
    );
};

export default Login;