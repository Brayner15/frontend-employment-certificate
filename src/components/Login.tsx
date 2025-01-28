import '../styles/Login.css';
import { useRef, useState } from 'react';
import loginImage from '../assets/image-login.webp';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };
        const email = target.email.value;
        const password = target.password.value;

        try {
            const data = await login(email, password);
            console.log('Success:', data);
            if (data.status === 200) {
                navigate('/home', { 
                    state: { 
                        user: data.user,
                        employment: data.employment,
                    } 
                });
            }
        } catch (error: any) {
            console.error('Error:', error);
            setError(error.message || 'Error al iniciar sesión');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className='container-left'>
                <div className='login-form'>
                    <form ref={formRef} onSubmit={handleSubmit}  className='form-container'>
                            <h1 className='title-login'>Iniciar sesión</h1>
                            {error && <div className="error-message">{error}</div>}

                            <label className='label-login'>
                                Correo:
                                <input 
                                    className='input-login'
                                    type="email" 
                                    name="email" 
                                    placeholder='Escribe tu correo electrónico'
                                    required
                                    disabled={isLoading}
                                />
                            </label>

                            <div className='password-container'>
                                <label className='label-login'>
                                    Contraseña:
                                    <input 
                                        className='input-login'
                                        type="password" 
                                        name="password" 
                                         placeholder='Escribe tu correo contraseña'
                                        required
                                        disabled={isLoading}
                                    />
                                </label>
                            </div>
                            <div>
                                <input 
                                    className='button-login'
                                    type="submit" 
                                    value={isLoading ? "Cargando..." : "Iniciar Sesion"} 
                                    disabled={isLoading}
                                />
                            </div>
                    </form>
                </div>
            </div>
            <div className='container-right'>
                <img src={loginImage} alt="Login illustration" />
            </div>
        </div>
    );
};