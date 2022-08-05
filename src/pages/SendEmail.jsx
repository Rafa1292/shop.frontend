import React from 'react';
import cloud from '@logos/cloud.png';
import '@styles/SendEmail.scss';
import { Link } from 'react-router-dom';

const SendEmail = () => {
	return (
		<div className="SendEmail">
			<div className="form-container">
				<h1 className="title my-2">El correo ha sido enviado</h1>
				<strong className="subtitle-email">Por favor revise su bandeja de entrada y siga las instrucciones.</strong>
				<div className="email-image">
					<img alt="email" src={cloud}/>
				</div>
                <Link className='col-10 center' to={'/login'}>
				<button className="btn col-8" style={{margin: '2rem'}}>Login</button>
                </Link>
				<p className="resend">
					<span className='m-1'>No recibió el correo?</span>
                    <Link className='col-10 center' placeholder='Reenviar' to={'/password-recovery'}>
                        Reenviar
                    </Link>

				</p>
			</div>
		</div>
	);
}

export default SendEmail;
