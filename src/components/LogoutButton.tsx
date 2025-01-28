import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import '../styles/LogoutButton.css';

export const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <button 
            onClick={handleLogout}
            className="logout-button"
        >
            Cerrar Sesión
        </button>
    );
};