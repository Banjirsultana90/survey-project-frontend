import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../components/provider/AuthProvider';
import img1 from '../../assets/05042315.jpg'


const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const handlesignout = () => {
        logout()
            .then()
            .catch()}
    const nav=
            <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/allsurvey'>All Survey</NavLink></li>
            <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
            <li><NavLink to='/price'>Pricing</NavLink></li>
           
            
            </>
    return (
        <div className="navbar  text-white max-w-screen-xl mx-auto bg-opacity-30 bg-black">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {nav}
                    </ul>
                </div>
                <img className="rounded-full h-16 w-22 bg-slate-300" src={img1} alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {nav}
                </ul>
            </div>
            <div className="navbar-end">
                
            {
                            user?.email ?

                                <><label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full ">

                                        <img src={user.photoURL} alt={user.displayName} />

                                    </div>
                                    <button className='btn btn-sm btn-ghost'>{user.displayName}</button>
                                </label>
                                    <button onClick={handlesignout} className='btn'>Sign Out</button></> :
                                <Link to='/Login'><button className='btn'>Login</button></Link>
                        }
            </div>
        </div>
    );
};

export default Navbar;
// import React, { useContext } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { AuthContext } from '../../components/provider/AuthProvider';
// import img1 from '../../assets/05042315.jpg'


// const Navbar = () => {
//     const { user, logout } = useContext(AuthContext)
//     const handlesignout = () => {
//         logout()
//             .then()
//             .catch()}
//     const nav=
//             <>
//             <li><NavLink to='/'>Home</NavLink></li>
//             <li><NavLink to='/allsurvey'>All Survey</NavLink></li>
//             <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
//             <li><NavLink to='/price'>Pricing</NavLink></li>
           
            
//             </>
//     return (
//         <div className="navbar  text-white max-w-screen-xl mx-auto bg-opacity-30 bg-black">
//             <div className="navbar-start">
//                 <div className="dropdown">
//                     <label tabIndex={0} className="btn btn-ghost lg:hidden">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
//                     </label>
//                     <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
//                         {nav}
//                     </ul>
//                 </div>
//                 <img className="rounded-full h-16 w-22 bg-slate-300" src={img1} alt="" />
//             </div>
//             <div className="navbar-center hidden lg:flex">
//                 <ul className="menu menu-horizontal px-1">
//                     {nav}
//                 </ul>
//             </div>
//             <div className="navbar-end">
                
//             {
//                             user?.email ?

//                                 <><label tabIndex={0} className="btn btn-ghost btn-circle avatar">
//                                     <div className="w-10 rounded-full ">

//                                         <img src={user.photoURL} alt={user.displayName} />

//                                     </div>
//                                     <button className='btn btn-sm btn-ghost'>{user.displayName}</button>
//                                 </label>
//                                     <button onClick={handlesignout} className='btn'>Sign Out</button></> :
//                                 <Link to='/Login'><button className='btn'>Login</button></Link>
//                         }
//             </div>
//         </div>
//     );
// };

// export default Navbar;import React, { useContext } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { AuthContext } from '../../components/provider/AuthProvider';
// import img1 from '../../assets/05042315.jpg';
// import useAdmin from '../../hooks/useAdmin';
// import useSurveyor from '../../hooks/useSurveyor';
// import { useContext } from 'react';

// const Navbar = () => {
//     const { user, logout } = useContext(AuthContext);
//     const [isAdmin] = useAdmin();
//     const [isSurveyor] = useSurveyor();

//     const handlesignout = () => {
//         logout()
//             .then()
//             .catch();
//     };

//     return (
//         <div className="navbar text-white max-w-screen-xl mx-auto bg-opacity-30 bg-black">
//             <div className="navbar-start">
//                 <div className="dropdown">
//                     <label tabIndex={0} className="btn btn-ghost lg:hidden">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//                         </svg>
//                     </label>
//                     <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
//                         <li><NavLink to='/'>Home</NavLink></li>
//                         <li><NavLink to='/allsurvey'>All Survey</NavLink></li>
//                         <li><NavLink to='/price'>Pricing</NavLink></li>
//                         {isAdmin && <li><NavLink to='/dashboard/adminhome'>Admin Dashboard</NavLink></li>}
//                         {isSurveyor && <li><NavLink to='/dashboard/surveyorhome'>Surveyor Dashboard</NavLink></li>}
//                         {!isAdmin && !isSurveyor && <li><NavLink to='/dashboard/userhome'> Dashboard</NavLink></li>}
//                     </ul>
//                 </div>
//                 <img className="rounded-full h-16 w-22 bg-slate-300" src={img1} alt="" />
//             </div>
//             <div className="navbar-center hidden lg:flex">
//                 <ul className="menu menu-horizontal px-1">
//                     <li><NavLink to='/'>Home</NavLink></li>
//                     <li><NavLink to='/allsurvey'>All Survey</NavLink></li>
//                     <li><NavLink to='/price'>Pricing</NavLink></li>
//                     {isAdmin && <li><NavLink to='/dashboard/adminhome'>Admin Dashboard</NavLink></li>}
//                     {isSurveyor && <li><NavLink to='/dashboard/surveyorhome'>Surveyor Dashboard</NavLink></li>}
//                     {!isAdmin && !isSurveyor && <li><NavLink to='/dashboard/userhome'>User Dashboard</NavLink></li>}
//                 </ul>
//             </div>
//             <div className="navbar-end">
//                 {user?.email ?
//                     <>
//                         <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
//                             <div className="w-10 rounded-full ">
//                                 <img src={user.photoURL} alt={user.displayName} />
//                             </div>
//                             <button className='btn btn-sm btn-ghost'>{user.displayName}</button>
//                         </label>
//                         <button onClick={handlesignout} className='btn'>Sign Out</button>
//                     </> :
//                     <Link to='/Login'><button className='btn'>Login</button></Link>
//                 }
//             </div>
//         </div>
//     );
// };

// export default Navbar;
