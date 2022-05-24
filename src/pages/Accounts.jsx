import Title from '@components/Title';
import '@styles/Accounts.scss';
import { useGetList, usePost, useDelete, usePatch } from '../hooks/useAPI';
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Accounts = () => {
    let [accounts, setAccounts] = useState([]);
    const [editId, setEditId] = useState(0);

    let nameInput = useRef();
    let nameEditInput = useRef();

    useEffect(async () => {
        await loadAccounts();
    }, []);

    const handleClickPost = async () => {
        const response = await usePost('accounts', { name: nameInput.current.value });
        if (response.status == "201") {
            loadAccounts();
            nameInput.current.value = null;
        }
    };

    const handleClickDelete = async (id) => {
        const response = await useDelete(`accounts/${id}`);
        if (response.status == "201") {
            loadAccounts();
        }
    };

    const loadAccounts = async () => {
        const response = await useGetList('accounts');
        setAccounts(response.data);
    };

    const handleClickPatch = async (id) => {
        const response = await usePatch(`accounts/${id}`, { name: nameEditInput.current.value });

        if (response.status == "200") {
            loadAccounts();
            nameInput.current.value = null;
            setEditId(0);
        }
    };

    return (
        <div className="account-index col-10">
            <Title title="Lista de cuentas"></Title>
            <div className='add-account-container my-2 col-sm-10 center'>
                <span className='col-10 center'>
                    <input type="text" placeholder="Nueva cuenta" className="input" ref={nameInput} />
                </span>
                <span className='my-2 center'>
                    <input type='button' className='btn mx-2' value='Agregar' onClick={handleClickPost} />
                </span>
            </div>
            <div className="account-index-container">
                {accounts.map(account => (
                    <div className="account-index-item col-sm-6 center" key={account.id}>
                        {
                            editId == account.id
                            &&
                            <>
                                <span className='col-3 center'>
                                    <input type="text" className="input col-10" defaultValue={account.name} ref={nameEditInput} />
                                </span>
                                <span className='col-3 mx-2 center'>
                                    <input className='btn success col-10' type="button" value='Cambiar' onClick={() => handleClickPatch(account.id)} />
                                </span>
                                <span className='col-3 center'>
                                    <input className='btn danger col-10' type="button" value='X' onClick={() => setEditId(0)} />
                                </span>
                            </>
                            ||
                            <>
                                <span className='col-3 center'>{account.name}</span>
                                <span className='center'>
                                    <input className='btn mx-2' type="button" value='Editar' onClick={() => setEditId(account.id)} />
                                </span>
                                <Link className='center' to={`/accounts/${account.id}`}>
                                    <input className='btn mx-2 success' type="button" value='Detalles' />
                                </Link>
                            </>
                        }


                    </div>
                ))}
            </div>
        </div>
    );
}

export default Accounts;