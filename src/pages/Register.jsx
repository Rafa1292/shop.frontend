import React, { useRef, useContext } from 'react';
import { usePost } from '../hooks/useAPI';
import { useHistory } from "react-router-dom"
import '@styles/CreateAccount.scss';

const CreateAccount = () => {
    const history = useHistory();
    const email = useRef('');
    const name = useRef('');
    const phone = useRef('');
    const password = useRef('');
    const repeatPassword = useRef('');

    const handleRegister = async () => {

        if (password.current.value === repeatPassword.current.value) {

            const user = {
                email: email.current.value,
                role: 'customer',
                password: password.current.value,
                customer: {
                    name: name.current.value,
                    phone: phone.current.value,
                    maxOrders: 1
                }
            }

            const response = await usePost('users', user);
            console.log(response)
            if (!response.error) {
                history.push('/Login');
            }
        }
    }

    return (
        <div className='col-10 items-center center' style={{ height: '100%' }}>
            <div className="col-sm-4 m-2 items-center flex-wrap center" style={{ borderRadius: '7px', padding: '30px 30px', boxShadow: '0px 0px 10px -2px rgba(0,0,0,.3)' }}>
                <h3 className="col-10 text-center" style={{ color: 'rgba(0,0,0,.5)' }}>Registrarse</h3>
                <div className="col-10 py-1 center">
                    <input type="text" id="Nombre" ref={name} placeholder="Nombre" className="input col-10" />
                </div>
                <div className="col-10 py-1 center">
                    <input type="text" id="Correo" ref={email} placeholder="Correo" className="input col-10" />
                </div>
                <div className="col-10 py-1 center">
                    <input type="text" id="Telefono" ref={phone} placeholder="Telefono" className="input col-10" />
                </div>
                <div className="col-10 py-1 center">
                    <input type="password" id="Password" ref={password} placeholder="Contraseña" className="input col-10" />
                </div>
                <div className="col-10 py-1 center">
                    <input type="password" id="RepeatPassword" ref={repeatPassword} placeholder="Repetir contraseña" className="input col-10" />
                </div>
                <div className="col-10 py-2 my-2 center">
                    <input type="submit" value="Agregar" onClick={handleRegister} className="btn py-2 col-md-3" />
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;