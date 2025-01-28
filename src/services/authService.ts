interface AuthResponse {
    message: string;
    status: number; 
    user?: {
        username: string;
        first_name: string;
        last_name: string;
    };
}
export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    identification_number: string;
    id_profile: number;
}

export interface UserFormData {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    identification_number: string;
    id_profile: number;
}

export interface EmploymentFormData {
    start_date: string;
    contract_type: string;
    salary: number;
    position: string;
    department: string;
}
 
const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ 
                username: email,
                password: password 
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || 'Error en el inicio de sesión');
        }

        return {
            ...data,
            status: response.status
        };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const logout = async (): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || 'Error al cerrar sesión');
        }

        return {
            ...data,
            status: response.status
        };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const generatePDF = async (userId: number): Promise<Blob> => {
    try {
        const response = await fetch(`${API_URL}/pdf/generate_pdf_report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ user_id: userId })
        });

        if (!response.ok) {
            throw new Error('Error al generar PDF');
        }

        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const downloadPDF = (blob: Blob, filename: string = 'certificado.pdf'): void => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};

export const registerUser = async (userData: UserFormData, employmentData: EmploymentFormData) => {
    const response = await fetch(`${API_URL}/auth/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            user: userData,
            employment: employmentData
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Error al registrar usuario');
    }

    return response.json();
};

export const updateUser = async (
    userId: number,
    userData: Partial<UserFormData>, 
    employmentData: Partial<EmploymentFormData>
) => {
    const response = await fetch(`${API_URL}/auth/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            user: userData,
            employment: employmentData
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Error al actualizar usuario');
    }

    return response.json();
};

export const getUsers = async () => {
    const response = await fetch(`${API_URL}/auth/users`, {
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Error al obtener usuarios');
    }

    return response.json();
};

export const deleteUser = async (userId: number) => {
    const response = await fetch(`${API_URL}/auth/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Error al eliminar usuario');
    }

    return response.json();
};