import '../styles/ContentPdf.css';
import { ContentPdfProps } from '../types/auth';

export const ContentPdf = ({ firstName, lastName, employment }: ContentPdfProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const currentDate = new Date().toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="certificate-container">
            <div className="certificate-content">
                <h1>Certificado Laboral</h1>
                
                <p className="certificate-body">
                    Certifica que:
                </p>
                
                <p className="employee-info">
                    <strong>{firstName} {lastName}</strong>, identificado con Cédula de ciudadanía 
                    Nro. {employment.identification_number}, labora en la empresa desde 
                    el: {formatDate(employment.start_date)} a la fecha, como {employment.position} en 
                    el departamento de {employment.department} con un contrato a 
                    término {employment.contract_type} y con un salario básico 
                    de {formatCurrency(employment.salary)}.
                </p>

                <p className="certificate-date">
                    Este certificado se expide el {currentDate}
                </p>

                <p className="signature">
                    Cordialmente,
                </p>

                <div className="signature-line">
                    <div className="line"></div>
                    <p>Recursos Humanos</p>
                </div>
            </div>
        </div>
    );
};