import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react/cjs/react.development';
import { Context } from '../store/appContext';
export function Signup(){

    const{ store, actions } = useContext(Context)
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const navigate = useNavigate()

    const singup= async (e)=>{
        e.preventDefault();
        actions.singup(email, password)
        navigate('/')
    }
    console.log(email)
    console.log(password)

    return (
        <div className='d-flex align-items-center justify-content-center h-75'>
                <h1 className='container text-end col-4 me-1 text-success'>Registro</h1>
                <form onSubmit={singup} className='container col-4 ms-2' >
                    <div>                
                        <label className="h5" htmlFor="email">Correo electrónico</label>
                        <input className="form-control mb-4" type="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Correo electrónico'/>
                        <label className="h5" htmlFor="password"  placeholder='Password'>Contraseña</label>
                        <input className="form-control mb-4" type="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className='d-flex justify-content-evenly'>
                        <button className='btn btn-secondary'>Cancelar</button>
                        <button className='btn btn-success'>Registrarse</button>
                    </div>
                </form>
        </div>
    )
}
