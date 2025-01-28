
interface Employment {
    start_date: string;
    contract_type: string;
    salary: number;
    position: string;
    department: string;
    identification_number: number;
}

interface User {
    id_user: number;
    first_name: string;
    last_name: string;
    profile: number;
}

export interface LocationState {
    user: User;
    employment: Employment;
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

export interface ContentPdfProps {
    firstName: string;
    lastName: string;
    employment: {
        start_date: string;
        contract_type: string;
        salary: number;
        position: string;
        department: string;
        identification_number: number;
    }
}

export interface NavbarProps {
    firstName: string;
    lastName: string;
    profile: number;
    employment?: { 
        identification_number: string;
        start_date: string;
        contract_type: string;
        salary: number;
        position: string;
        department: string;
    };
 }
