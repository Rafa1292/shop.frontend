import React, { useRef, useContext } from 'react';
import { useHistory } from "react-router-dom"
import {usePost} from '../hooks/useAPI';
import '@styles/PasswordRecovery.scss';


const PasswordRecovery = () => {
	const email = useRef("");
	const history = useHistory();

	const handleSubmit = async () => {
		const response = await usePost('auth/recovery-password', { email: email.current.value });
		if (!response.error) {
			history.push("/send-email");
		}
		else {
			var message = response?.error ? response.mensaje : "No hay conexion con el servidor";
			addError(message);
		}

	}
	return (
		<div className="col-10 center items-center" style={{height: '100%'}}>
			<div className="PasswordRecovery-container center p-2" style={{boxShadow: '0px 0px 10px -2px rgba(0,0,0,.3)', borderRadius: '7px'}}>
				<h3 className="col-10 text-center">Recuperar contraseña</h3>
				<p className="col-8 my-2" style={{ textAlign: 'center' }}>Por favor ingrese el correo con el que creo la cuenta</p>
                <div className="col-8 center my-2">
				<input ref={email} placeholder="Correo" type="text" id="email" className="input my-2 input-email" />
                </div>
				<input type="button" onClick={handleSubmit} value="Recuperar" className="btn my-2" />
			</div>
		</div>
	);
}

export default PasswordRecovery;