import React, { useRef } from 'react';
import {usePost} from '../hooks/useAPI';
import '@styles/NewPassword.scss';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom"
import swal from 'sweetalert';

const NewPassword = () => {
	const { token } = useParams();
	const history = useHistory();
	const password = useRef("");
	const repeatPassword = useRef("");

	const handleSubmit = async () => {
        const tempToken = token.replace(/-/g, ".")
        console.log(tempToken)
		const data = {
			token: tempToken,
			password: password.current.value,
		}
		if (repeatPassword.current.value === password.current.value) {
			const response = await usePost("auth/new-password", data)
			if (!response.error) {
				history.push('/Login');
			}
		}
        else{
            swal('Error', 'Las contraseñas deben coincidir', 'warning')

        }

	}
	return (
		<div className="NewPassword p-1">
			<div className="center">
				<h1 className=" col-10 text-center">Crear nueva contraseña</h1>
				<p className="center my-2 col-10">Introduzca la nueva contraseña y el correo</p>
				<div className="col-10 center my-1">
					<input ref={password} type="password" id="password" placeholder="Contraseña" className="input col-md-4 m-1 input-password" />
				</div>
				<div className="col-10 center my-1">
					<input ref={repeatPassword} type="password" id="new-password" placeholder="Repetir contraseña" className="col-md-4 input m-1 input-password" />
				</div>
				<input onClick={handleSubmit} type="submit" value="Confirmar" className="btn my-2" />
			</div>
		</div>
	);
}

export default NewPassword;
