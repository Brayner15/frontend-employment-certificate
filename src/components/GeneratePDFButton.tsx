import { useState } from 'react';
import { generatePDF, downloadPDF } from '../services/authService';
import '../styles/GeneratePDFButton.css';
interface idUserProps {
    idUser: number;
}

export const GeneratePDFButton = ({ idUser }:idUserProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleGeneratePDF = async () => {
        setIsLoading(true);
        setError('');

        try {
            const pdfBlob = await generatePDF(idUser);
            downloadPDF(pdfBlob);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al generar PDF');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pdf-button-container">
            <button 
                onClick={handleGeneratePDF}
                className="generate-pdf-button"
                disabled={isLoading}
            >
                {isLoading ? 'Generando...' : 'Generar PDF'}
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};