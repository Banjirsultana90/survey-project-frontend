

import React from 'react';
import useAdmin from '../hooks/useAdmin';
import useSurveyor from '../hooks/useSurveyor';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isSurveyor, isSurveyorLoading] = useSurveyor();

    if (isAdminLoading || isSurveyorLoading) {
        return <p>Loading...</p>; // Or show a loading indicator
    }

    return (
        <div className='flex'>
            <div className="w-64 min-h-screen bg-orange-400">
                <ul>
                    {isAdmin ? (
                        <>
                            <li><NavLink to='/dashboard/admin'>Admin</NavLink></li>
                            <li><NavLink to='/dashboard/users'>Manage user</NavLink></li>
                            <li><NavLink to='/'>Home</NavLink></li>
                        </>
                    ) : isSurveyor ? (
                        <>
                            <li><NavLink to='/dashboard/surveyor'>Surveyor</NavLink></li>
                            <li><NavLink to='/dashboard/userhome'>User</NavLink></li>
                            <li><NavLink to='/'>Home</NavLink></li>
                        </>
                    ) : (
                        <>
                            <div className="divider"></div>
                            <li><NavLink to='/dashboard/userhome'>User</NavLink></li>
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
