import { Navbar } from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';

export const Layout = () => {
    const location = useLocation();
    const { user, employment } = location.state || {};

    return (
        <>
            <Navbar 
                firstName={user?.first_name} 
                lastName={user?.last_name} 
                profile={user?.profile}
                employment={employment}
            />
            <Outlet />
        </>
    );
};