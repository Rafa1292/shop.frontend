import { useGetList, usePost, useDelete, usePatch } from '../hooks/useAPI';
import React, { useRef, useState, useEffect } from "react";
import Title from '@components/Title';
import '@styles/Paymethod.scss';

const Paymethods = () => {
    let [paymethods, setPaymethods] = useState([]);
    let [accounts, setAccounts] = useState([]);
    let [accountId, setAccountId] = useState(0);
    const [editId, setEditId] = useState(0);
    let nameInput = useRef();
    let nameEditInput = useRef();

    const loadPaymethods = async () => {
        const response = await useGetList('paymethods');
        setPaymethods(response.data);
    };
    const loadAccounts = async () => {
        const response = await useGetList('accounts');
        setAccounts(response.data);
    };
    useEffect(async () => {
        await loadPaymethods();
        await loadAccounts();
    }, []);
    const handleClickPost = async () => {
        const response = await usePost('paymethods', { name: nameInput.current.value, accountId: accountId.value, });
        if (response.status == "201") {
            setAccountId(0);
            loadPaymethods();
            nameInput.current.value = null;
        }
    };
    const handleClickPatch = async (id) => {
        let options = { 
            name: nameEditInput.current.value, 
            accountId: accountId.value,
        };
        options = accountId > 0 ? {...options, accountId : accountId} : options;
        const response = await usePatch(`paymethods/${id}`, options);

        if (response.status == "200") {
            loadPaymethods();
            nameInput.current.value = null;
            setAccountId(0);
            setEditId(0);
        }
    };
    const handleChange = (event) => {
        setAccountId({ value: event.target.value });
    };
    return (
        <div className="paymethod-index">
            <Title title="Lista de metodos de pago"></Title>
            <div className='add-paymethod-container my-2 col-sm-10 center'>
                <span className='col-10 center'>
                    <input type="text" placeholder="Nuevo metodo" className="input" ref={nameInput} />
                </span>
                <span className='col-sm-10 my-1 center'>
                    <select onChange={handleChange}>
                        <option value="0">Seleccione una cuenta</option>
                        {
                            accounts.map(account => (
                                <option key={account.id} value={account.id}>{account.name}</option>
                            ))
                        }
                    </select>
                </span>
                <span className='my-2 col-md-10 center'>
                    <input type='button' className='btn mx-2' value='Agregar' onClick={handleClickPost} />
                </span>
            </div>
            <div className="paymethod-index-container">
                {paymethods.map(paymethod => (
                    <div className="paymethod-index-item col-sm-6 center" key={paymethod.id}>
                        {
                            editId == paymethod.id
                            &&
                            <>
                                <span className='col-3 center'>
                                    <input type="text" className="input col-10" defaultValue={paymethod.name} ref={nameEditInput} />
                                </span>
                                <span className='col-sm-3 my-1 center'>
                                    <select onChange={handleChange} defaultValue={paymethod.accountId}>
                                        <option value="0">Seleccione una cuenta</option>
                                        {
                                            accounts.map(account => (
                                                <option key={account.id} value={account.id}>{account.name}</option>
                                            ))
                                        }
                                    </select>
                                </span>
                                <span className='col-3 mx-2 center'>
                                    <input className='btn success col-10' type="button" value='Cambiar' onClick={() => handleClickPatch(paymethod.id)} />
                                </span>
                                <span className='col-3 center'>
                                    <input className='btn danger col-10' type="button" value='X' onClick={() => setEditId(0)} />
                                </span>
                            </>
                            ||
                            <>
                                <h3 className='col-sm-3 center m-0'>{paymethod.account.name}</h3>
                                <h4 className='col-sm-3 mt-0 mb-2 center'>{paymethod.name}</h4>
                                <span className='center'>
                                    <input className='btn mx-2' type="button" value='Editar' onClick={() => setEditId(paymethod.id)} />
                                </span>
                                <span className=' center'>
                                    <input className='btn danger' type="button" value='Eliminar' onClick={() => handleClickDelete(paymethod.id)} />
                                </span>
                            </>
                        }


                    </div>
                ))}
            </div>
        </div>
    );
}

export default Paymethods;