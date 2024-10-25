import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const {store, actions}= useContext(Context)
	const navigate = useNavigate()
	let token = localStorage.getItem('token')

	function logout(){
		actions.logout();
		if(store.isLogin===false){
			navigate('/')
		}
		
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<h3 className="col-6">¡Bienvenido/a!</h3>
				<div className="container col-3 d-flex justify-content-around">
				<button onClick={()=>navigate('/singup')} className="btn btn-success">Registro</button>
				<button onClick={()=>navigate('/')} className="btn btn-success">Iniciar sesión</button>
				<button onClick={()=>navigate('/private')} className="btn btn-success">Privado</button>
				</div>	
				{store.isLogin || token!=null ? 
					<button onClick={logout} className="btn btn-danger">Cerrar sesión</button>
					:null}
			</div>
		</nav>
	);
};
