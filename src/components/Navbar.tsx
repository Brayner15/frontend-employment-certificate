import { Link } from 'react-router-dom';
import { LogoutButton } from './LogoutButton';
import '../styles/Navbar.css';
import userIcon  from '../assets/user.svg';
import { NavbarProps } from '../types/auth';

 export const Navbar = ({ firstName, lastName, profile, employment }: NavbarProps) => {
    const userRole = profile === 1 ? "Administrador" : "Empleado";
    
    const sharedState = {
        user: { 
            first_name: firstName,
            last_name: lastName,
            profile 
        },
        employment 
    };
 
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link 
                        to="/home" 
                        state={sharedState}
                        className="nav-link"
                    >
                        Inicio
                    </Link>
                    {profile === 1 && (
                        <Link 
                            to="/users" 
                            state={sharedState}
                            className="nav-link"
                        >
                            Usuarios
                        </Link>
                    )}
                </div>
                <div className="navbar-right">
                    
                    <div className="user-info">
                        <img src={userIcon} alt="" />
                        <div className='text-container'>
                            <span>{firstName} {lastName}</span>
                            <span className="user-role">{userRole}</span>
                        </div>
                        
                    </div>
                    <LogoutButton />
                </div>
            </div>
        </nav>
    );
 };