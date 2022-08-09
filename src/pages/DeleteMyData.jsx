import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import AppContext from '../context/AppContext';
import { usePost } from '../hooks/useAPI';


const DeleteMyData = () => {
    const { state } = useContext(AppContext);
    const [message, setMessage] = useState("");
    const [deleteData, setDeleteData] = useState(false);

    const deleteMyData = async () => {
        if(state.auth.sub > 0 ){

            const response = await usePost('auth/delete-my-data', user);
            if (response.error) {
                setMessage("Tus datos han sido eliminados");
            }
            else{
                setMessage("No hemos logrado borrar tus datos, intentalo de nuevo o envianos un correo a rvilla3452@gmail.com y con gusto te ayudaremos")
            }
        }
        else{
            setMessage("Debes iniciar sesion antes");
        }
        setDeleteData(true);

    }
    return (
        <div className="col-10 center content-center items-center" style={{ height: '100%' }}>
            <h2>Eliminar datos</h2>
            <span className='col-10 center my-2'>¿Seguro que desea eliminar sus datos?</span>
            {deleteData &&
                <h3 className='col-12 center'>{message}</h3>
                ||
                <div className="col-10 center my-1">
                    <button type='button' onClick={() => deleteMyData()} className='p-1 btn danger m-1'>
                        Continuar
                    </button>
                    <Link className="btn center m-1 p-1" to="/">Volver</Link>

                </div>
            }
        </div>
    );
}

export default DeleteMyData;