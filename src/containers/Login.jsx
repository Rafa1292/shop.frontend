import React, { useRef, useContext } from 'react';
import { usePost } from '../hooks/useAPI';
import { Link, useHistory } from "react-router-dom"
import AppContext from '../context/AppContext';
import face from '@icons/face.png';
import googleauth from '@icons/googleauth.png';

const Login = () => {
    const email = useRef('');
    const password = useRef('');
    const history = useHistory();
    const { setRole } = useContext(AppContext);

    const handleLogin = async () => {
        const user = {
            username: email.current.value,
            password: password.current.value
        };
        const response = await usePost('auth/login', user);
        if (!response.error) {
            localStorage.removeItem('token');
            localStorage.setItem('token', response.content.token);
            await setRole();
            history.push('/');
        }
    }

    const facebook = async () => {
        window.open("https://limitless-hamlet-11683.herokuapp.com/api/v1/auth/facebook", "_self");
    }

    const google = async () => {
        window.open("https://limitless-hamlet-11683.herokuapp.com/api/v1/auth/google", "_self");
    }

    return (
        <div className='col-sm-4 flex-wrap center content-center' style={{ overflowY: 'scroll', height: 'calc(100vh - 40px)', paddingBottom: '100px' }}>
            <strong
                style={{
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                }}
                className='col-10 text-center center my-2'>
                Inicia sesion con tus redes sociales
            </strong>
            <button onClick={facebook} type='button' className="col-4 m-1 btn flex-wrap center" style={{ padding: '0.75rem', background: '#3b5998', color: 'white', fontWeight: 'bold', borderRadius: '5px' }}>
                <img height={25} src={face} className='' />
            </button>
            <button onClick={google} type='button' className="col-4 m-1 flex-wrap btn center" style={{ border: '1px solid lightgray', padding: '0.75rem', background: '#fff', color: 'black', fontWeight: 'bold', borderRadius: '5px' }}>
                <img height={25} src={googleauth} className='' />
            </button>
            <span className='col-10 center'>0</span>
            <div className="col-md-6 center my-1">
                <input className='input col-8' ref={email} placeholder='Email' />
            </div>
            <div className="col-md-6 my-1 center">
                <input className='input col-8' type='password' ref={password} placeholder='Contraseña' />
            </div>
            <div className="col-md-6 center my-1">
                <button onClick={handleLogin} type='button' className='col-8 btn success' placeholder='Iniciar sesion'>
                    Iniciar sesion
                </button>
            </div>
            <Link className='col-10 center' to={'/password-recovery'}>
                <small className='col-10 center p-1'>¿Olvidó su contraseña?</small>
            </Link>


            <div className='col-10 p-0 center' style={{ marginTop: '2rem', borderTop: '1px solid rgba(0,0,0,.2)' }}>
                <span className='col-10 center py-2 ' >¿No estas registrado?</span>
                <div className="col-md-6 center">
                    <Link className='col-10 center' to={'/register'}>
                        <button type='button' className='col-8 btn ' placeholder='Iniciar sesion'>
                            Registrarse
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;