import { useState } from 'react';
import '../styles/UserRegistrationForm.css';
import { UserFormData, EmploymentFormData, User } from '../types/auth';
import { updateUser } from '../services/authService';
import { useEffect } from 'react';

interface UserRegistrationFormProps {
    onSubmit: (userData: Partial<UserFormData>, employmentData: Partial<EmploymentFormData>) => Promise<void>;
    isEditing?: boolean;
    userId?: number;
    initialData?: User | null;
    onSuccess?: () => void; 
}

export const UserRegistrationForm = ({ onSubmit, isEditing = false, userId, initialData, onSuccess }: UserRegistrationFormProps) => {
    const [userForm, setUserForm] = useState<Partial<UserFormData>>({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        identification_number: '',
        id_profile: undefined
    });

    const [employmentForm, setEmploymentForm] = useState<Partial<EmploymentFormData>>({
        start_date: '',
        contract_type: '',
        salary: undefined,
        position: '',
        department: ''
    });

    // Cargar datos iniciales cuando se está editando
    useEffect(() => {
        if (initialData) {
            setUserForm({
                username: initialData.username,
                first_name: initialData.first_name,
                last_name: initialData.last_name,
                identification_number: initialData.identification_number,
                id_profile: initialData.id_profile
            });

            if (initialData.employment) {
                setEmploymentForm({
                    start_date: initialData.employment.start_date,
                    contract_type: initialData.employment.contract_type,
                    salary: initialData.employment.salary,
                    position: initialData.employment.position,
                    department: initialData.employment.department
                });
            }
        }
    }, [initialData]);

    // ... resto del código ...

    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid = () => {
        if (isEditing) {
            // En modo edición, al menos un campo debe estar lleno
            return Object.values(userForm).some(value => value !== '' && value !== undefined) ||
                   Object.values(employmentForm).some(value => value !== '' && value !== undefined);
        }
        // En modo creación, todos los campos son requeridos
        return Object.values(userForm).every(value => value !== '' && value !== undefined) &&
               Object.values(employmentForm).every(value => value !== '' && value !== undefined);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);
    
        try {
            const userData = isEditing ? 
                Object.fromEntries(
                    Object.entries(userForm).filter(([_, value]) => value !== '' && value !== undefined)
                ) : userForm;
    
            const employmentData = isEditing ?
                Object.fromEntries(
                    Object.entries(employmentForm).filter(([_, value]) => value !== '' && value !== undefined)
                ) : employmentForm;
    
            if (isEditing && userId) {
                await updateUser(userId, userData, employmentData);
                onSuccess?.();  // Llamar a la función de actualización si existe
            } else {
                await onSubmit(userData, employmentData);
            }
            
            setMessage({ 
                type: 'success', 
                text: isEditing ? 'Usuario actualizado exitosamente' : 'Usuario registrado exitosamente' 
            });
    
            if (!isEditing) {
                setUserForm({
                    username: '',
                    password: '',
                    first_name: '',
                    last_name: '',
                    identification_number: '',
                    id_profile: undefined
                });
                setEmploymentForm({
                    start_date: '',
                    contract_type: '',
                    salary: undefined,
                    position: '',
                    department: ''
                });
            }
        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: error instanceof Error ? error.message : 'Error en la operación'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <h2>{isEditing ? 'Editar Usuario' : 'Registro de Usuario'}</h2>
            
            <div className="form-section">
                <h3>Información Personal</h3>
                <input
                    required={!isEditing}
                    type="text"
                    placeholder="Correo electrónico"
                    value={userForm.username || ''}
                    onChange={e => setUserForm({...userForm, username: e.target.value})}
                />
                {!isEditing && (
                    <input
                        required
                        type="password"
                        placeholder="Contraseña"
                        value={userForm.password || ''}
                        onChange={e => setUserForm({...userForm, password: e.target.value})}
                    />
                )}
                <input
                    required={!isEditing}
                    type="text"
                    placeholder="Nombre"
                    value={userForm.first_name || ''}
                    onChange={e => setUserForm({...userForm, first_name: e.target.value})}
                />
                <input
                    required={!isEditing}
                    type="text"
                    placeholder="Apellido"
                    value={userForm.last_name || ''}
                    onChange={e => setUserForm({...userForm, last_name: e.target.value})}
                />
                <input
                    required={!isEditing}
                    type="text"
                    placeholder="Número de Identificación"
                    value={userForm.identification_number || ''}
                    onChange={e => setUserForm({...userForm, identification_number: e.target.value})}
                />
                <select
                    required={!isEditing}
                    value={userForm.id_profile || ''}
                    onChange={e => setUserForm({...userForm, id_profile: Number(e.target.value)})}
                >
                    <option value="">Seleccione un perfil</option>
                    <option value={1}>Administrador</option>
                    <option value={2}>Usuario</option>
                </select>
            </div>

            <div className="form-section">
                <h3>Información Laboral</h3>
                <input
                    required={!isEditing}
                    type="date"
                    value={employmentForm.start_date || ''}
                    onChange={e => setEmploymentForm({...employmentForm, start_date: e.target.value})}
                />
                <input
                    required={!isEditing}
                    type="text"
                    placeholder="Tipo de Contrato"
                    value={employmentForm.contract_type || ''}
                    onChange={e => setEmploymentForm({...employmentForm, contract_type: e.target.value})}
                />
                <input
                    required={!isEditing}
                    type="number"
                    placeholder="Salario"
                    value={employmentForm.salary || ''}
                    onChange={e => setEmploymentForm({...employmentForm, salary: Number(e.target.value)})}
                />
                <input
                    required={!isEditing}
                    type="text"
                    placeholder="Cargo"
                    value={employmentForm.position || ''}
                    onChange={e => setEmploymentForm({...employmentForm, position: e.target.value})}
                />
                <input
                    required={!isEditing}
                    type="text"
                    placeholder="Departamento"
                    value={employmentForm.department || ''}
                    onChange={e => setEmploymentForm({...employmentForm, department: e.target.value})}
                />
            </div>

            <button 
                type="submit" 
                className="submit-button"
                disabled={!isFormValid() || isSubmitting}
            >
                {isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar' : 'Guardar'}
            </button>

            {message && (
                <div className={`${message.type}-message`}>
                    {message.text}
                </div>
            )}
        </form>
    );
};

