import React , { useContext, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/private.css";
import { Context } from "../store/appContext";

const Private = () => {
    const navigate = useNavigate();
    const { actions } = useContext(Context);

    const handleLogout = () => {
        actions.cerrarSesion();
        navigate('/');
    };

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        
        if (!token) {
            console.log("No se encontró token, redirigiendo a la página de inicio");
            navigate('/');
        } else {
            fetch(`${process.env.BACKEND_URL}/api/verify-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            })
                .then(response => { 
    
                    if (response.status === 401) {
                        console.log("Token inválido, redirigiendo al inicio"); 
                        navigate('/');
                    }
    
                    return response.json();
                })
                .then(data => {
                    console.log("Datos recibidos del servidor al verificar token:", data); 
    
                    if (data.valid) {
                        console.log("Token válido, usuario autenticado");
                    } else {
                        console.log("Token inválido, redirigiendo al inicio");
                        navigate('/');
                    }
                })
                .catch(error => {
                    console.error("Error validando el token", error);
                    navigate('/'); 
                });
        }
    }, [navigate]);

    return (
        <div>
            <div className="vip-container">
                <h2>Este mensaje es para usuarios registrados.</h2>
            </div>
            <div className="private-container">
                <p>Esta sección es exclusiva de usuarios registrados.</p>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </div>
    );
};

export default Private;
