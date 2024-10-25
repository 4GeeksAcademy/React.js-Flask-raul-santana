import React, {useState, useEffect} from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useContext } from 'react/cjs/react.development'
import { Context } from '../store/appContext'

const TokenReady = () => {
    return (<Navigate to='/private' />);
}

const TokenNoReady = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const login = (e, email, password) => {
        e.preventDefault();

        if (email === '' || password === '') {
            setErrorMessage('Por favor, antes de continuar es necesario que inicie sesión o se registre');
            return;
        }

        actions.login(email, password);

        if (store.isLogin === true) {
            navigate('/private');
        }
    }

    return (
        <div className='d-flex align-items-center justify-content-center h-75'>
            <h1 className='container d-flex justify-content-end col-4 me-1 text-primary '>Inicio de sesión</h1>
            <form onSubmit={(e) => { login(e, email, password) }} className='container col-4 ms-2' >
                <div>
                    <label className="h5" htmlFor="email">Correo electrónico</label>
                    <input className="form-control mb-4 --bs-primary-border-subtle" type="email" id="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Correo electrónico' />
                    <label className="h5" htmlFor="password" placeholder='Password'>Contraseña</label>
                    <input className="form-control mb-4" type="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>

                {errorMessage && <p className="text-danger">{errorMessage}</p>}

                <div className='d-flex justify-content-evenly'>
                    <button type="button" className='btn btn-secondary' onClick={() => navigate('/')}>Cancelar</button>
                    <button type="submit" className='btn btn-success'>Iniciar sesión</button>
                </div>
            </form>
        </div>
    )
}

export function Login() {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            actions.setLogin(true);
        }
    }, [actions]);

    return (
        <>
            {sessionStorage.getItem('token') ? <TokenReady /> : <TokenNoReady />}
        </>
    );
}
