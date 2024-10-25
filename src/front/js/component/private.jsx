import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Loggeduser = ()=>{
    return (
        <div className="container d-flex align-items-center justify-content-center flex-column h-75">
            <h1>¡Bienvenido/a!</h1>
            <h1>¡Este es un mensaje para socios exclusivos!</h1>
        </div>
    )
}
const Notloggeduser=({navigate})=>{
    return(
        <div className="container d-flex align-items-center justify-content-center flex-column h-75">
            <h1>¡Esta es una página privada!</h1>
            <h2>Por favor, antes de continuar es necesario que inicie sesión</h2>
            <div className="container d-flex justify-content-center">
                <button className="btn btn-success mx-2" onClick={()=>navigate('/')}>Iniciar sesión</button>
                <button className="btn btn-success mx-2" onClick={()=>navigate('/singup')}>Registrarse</button>
            </div>
        </div>
    )
}

export function Private(){
    let token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {store}=useContext(Context)

    

    return(<>
    {store.isLogin || token!=null ? <Loggeduser/> : <Notloggeduser navigate={navigate}/>}
    
    </>)
}
