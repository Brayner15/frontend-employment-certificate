import { useLocation } from 'react-router-dom';
import { GeneratePDFButton } from './GeneratePDFButton';
import { ContentPdf } from './ContentPdf';
import '../styles/Home.css';
import { LocationState } from '../types/auth';


export const Home = () => {
    const location = useLocation();
    const { user, employment} = (location.state as LocationState) || {};

    return (
        <div className="home-page">
            <div className="home-container">
                <div className="home-content">
                    <h1>Genere su certificado laboral</h1>
                    <ContentPdf
                        firstName={user?.first_name || ''}  
                        lastName={user?.last_name || ''} 
                        employment={employment}
                    />
                    <GeneratePDFButton idUser={user?.id_user} />
                </div>
            </div>
        </div>
    );
};