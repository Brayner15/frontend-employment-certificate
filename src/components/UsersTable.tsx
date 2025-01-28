import { useState, useEffect } from 'react';
import { getUsers, User, registerUser, deleteUser } from '../services/authService';
import Modal from './Modal';
import { UserRegistrationForm } from './UserRegistrationForm';
import '../styles/UsersTable.css';
import { UserFormData, EmploymentFormData } from '../types/auth';

export const UsersTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const data = await getUsers();
                setUsers(data);
                setError('');
            } catch (error) {
                setError('Error al cargar usuarios');
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const refreshUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error al actualizar lista de usuarios:', error);
        }
    };
    
    const handleOpenRegisterModal = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (userData: UserFormData, employmentData: EmploymentFormData) => {
        try {
            await registerUser(userData, employmentData);
            alert('Usuario registrado exitosamente');
            setIsModalOpen(false);
            
            // Actualizar la lista de usuarios
            const updatedUsers = await getUsers();
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error:', error);
            alert(error instanceof Error ? error.message : 'Error al registrar usuario');
        }
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = async (userId: number) => {
        if (window.confirm('¿Está seguro de eliminar este usuario?')) {
            try {
                await deleteUser(userId);
                // Actualizar la lista de usuarios
                const updatedUsers = await getUsers();
                setUsers(updatedUsers);
                alert('Usuario eliminado exitosamente');
            } catch (error) {
                console.error('Error:', error);
                alert(error instanceof Error ? error.message : 'Error al eliminar usuario');
            }
        }
    };

    if (isLoading) {
        return <div className="loading-message">Cargando usuarios...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="users-table-container">
            <button 
                className="register-button"
                onClick={handleOpenRegisterModal}
            >
                Registrar Usuario
            </button>

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <UserRegistrationForm 
                        onSubmit={handleSubmit}
                        isEditing={selectedUser !== null}
                        userId={selectedUser?.id}
                        initialData={selectedUser}
                        onSuccess={() => {
                            refreshUsers();
                            setIsModalOpen(false);
                        }}
                    />
                </Modal>
            )}

            {users.length === 0 ? (
                <p className="no-users-message">No hay usuarios registrados</p>
            ) : (
                <table className="users-table">
                    <thead>
                        
                        <tr>
                            <th>Correo electrónico</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Identificación</th>
                            <th>Fecha Inicio</th>
                            <th>Tipo Contrato</th>
                            <th>Salario</th>
                            <th>Cargo</th>
                            <th>Departamento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.identification_number}</td>
                                <td>{user.employment?.start_date}</td>
                                <td>{user.employment?.contract_type}</td>
                                <td>{user.employment?.salary}</td>
                                <td>{user.employment?.position}</td>
                                <td>{user.employment?.department}</td>
                                <td className="action-buttons">
                                    <button 
                                        onClick={() => handleEdit(user)}
                                        className="edit-button"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(user.id)}
                                        className="delete-button"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};