

import React from 'react';
import useAdmin from '../hooks/useAdmin';
import useSurveyor from '../hooks/useSurveyor';
import { NavLink, Outlet } from 'react-router-dom';
import { FaUserGroup } from 'react-icons/fa6';

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isSurveyor, isSurveyorLoading] = useSurveyor();

    if (isAdminLoading || isSurveyorLoading) {
        return <p>Loading...</p>; // Or show a loading indicator
    }

    return (
        <div className='flex gap-6 '>
            <div className="w-64 min-h-screen bg-purple-600 text-white  py-5 px-5">
                <ul>
                    {isAdmin ? (

                        <>
                            <li className='text-2xl font-bold'>Admin Home</li>
                            {/*  */}
                            <li>
                                <NavLink to='/dashboard/alluser' className='flex gap-1 items-center'>
                                    <FaUserGroup style={{ verticalAlign: 'middle', fontSize: '1.2em' }} />
                                    <span style={{ verticalAlign: 'middle', fontSize: '1.2em' }}>All Users</span>
                                </NavLink>
                            </li>
                            <li><NavLink to='/dashboard/users'>Manage user Role</NavLink></li>
                            <li><NavLink to='/dashboard/surveystatus'>Survey Status</NavLink></li>
                            <li><NavLink to='/dashboard/userspayment'>Users payments</NavLink></li>
                            <li><NavLink to='/dashboard/surveyresponse'>Survey Response</NavLink></li>
                            <li><NavLink to='/'>Home</NavLink></li>
                        </>
                    ) : isSurveyor ? (

                        <>   <li className='text-2xl font-bold'>Surveyor Home</li>
                            <li><NavLink to='/dashboard/surveyor'>Create Survey</NavLink></li>
                            {/* <li><NavLink to='/dashboard/update'>Update Survey</NavLink></li> */}
                            <li><NavLink to='/dashboard/feedback'>Survey Response</NavLink></li>
                            <li><NavLink to='/dashboard/surveyresponse'>Users feedback</NavLink></li>
                            {/* <li><NavLink to='/dashboard/userhome'>User</NavLink></li> */}

                            <li><NavLink to='/'>Home</NavLink></li>
                        </>
                    ) : (
                        <>
                            <div className="divider"></div>
                            <li className='text-2xl font-bold'>User Home</li>
                            {/* <li><NavLink to='/dashboard/userhome'>User</NavLink></li> */}
                            <li><NavLink to='/dashboard/userpayinfo'>User payment info</NavLink></li>

                            <div className="divider"></div>
                            <li><NavLink to='/'>Home</NavLink></li>
                        </>
                    )}
                </ul>
            </div>
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
