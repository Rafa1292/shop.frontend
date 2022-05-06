import { useGetList, usePost, useDelete, usePatch } from '../hooks/useAPI';
import React, { useRef, useState, useEffect } from "react";
import Title from '@components/Title';
import '@styles/subcategories.scss';

const SubCategories = () => {
    let [customers, setCustomers] = useState([]);
    let [categoryId, setCategoryId] = useState(0);
    const [editId, setEditId] = useState(0);
    let nameInput = useRef();
    let nameEditInput = useRef();
    let phone = useRef();


    const loadCustomers = async () => {
        const response = await useGetList('customers');
        setCustomers(response.data);
    };
    useEffect(async () => {
        await loadCustomers();
    }, []);
    const handleClickPost = async () => {
        const response = await usePost('customers', { 
            name: nameInput.current.value, 
            phone: phone.current.value, 
        });
        if (response.status == "201") {
            await loadCustomers();
            nameInput.current.value = null;
            phone.current.value = null;
        }
    };
    const handleClickDelete = async (id) => {
        const response = await useDelete(`customers/${id}`);
        if (response.status == "201") {
            await loadCustomers();
        }
    };
    const handleClickPatch = async (id) => {
        let options = { 
            name: nameEditInput.current.value, 
            phone: phone.current.value,
        };
        options = categoryId > 0 ? {...options, categoryId : categoryId} : options;
        const response = await usePatch(`customers/${id}`, options);
        if (response.status == "200") {
            await loadCustomers();
            nameInput.current.value = null;
            phone.current.value = null;
            setEditId(0);
        }
    };

    return (
        <div className="subcategory-index">
            <Title title="Lista de clientes"></Title>
            <div className='add-subcategory-container my-2 col-sm-10 center'>
                <span className='col-10 center'>
                    <input type="text" placeholder="Nuevo cliente" className="input" ref={nameInput} />
                </span>
                <span className='col-10 center my-2'>
                <input type='number' id='phone' ref={phone} placeholder='89745213' className='input' />
                </span>
                <span className='my-2 col-md-10 center'>
                    <input type='button' className='btn mx-2' value='Agregar' onClick={handleClickPost} />
                </span>
            </div>
            <div className="customer-index-container">
                {customers.map(customer => (
                    <div className="customer-index-item col-sm-6 center" key={customer.id}>
                        {
                            editId == customer.id
                            &&
                            <>
                                <span className='col-3 center'>
                                    <input type="text" className="input col-10" defaultValue={customer.name} ref={nameEditInput} />
                                </span>
                                <span className='col-3 center'>
                                <input type='number' id='phone' ref={phone} defaultValue={customer.phone} placeholder='89745213' className='input' />
                                </span>

                                <span className='col-3 mx-2 center'>
                                    <input className='btn success col-10' type="button" value='Cambiar' onClick={() => handleClickPatch(customer.id)} />
                                </span>
                                <span className='col-3 center'>
                                    <input className='btn danger col-10' type="button" value='X' onClick={() => setEditId(0)} />
                                </span>
                            </>
                            ||
                            <>
                                <h3 className='col-sm-3 center m-0'>{customer.name}</h3>
                                <h4 className='col-sm-3 mt-0 mb-2 center'>{customer.phone}</h4>
                                <span className='center'>
                                    <input className='btn mx-2' type="button" value='Editar' onClick={() => setEditId(customer.id)} />
                                </span>
                                <span className=' center'>
                                    <input className='btn danger' type="button" value='Eliminar' onClick={() => handleClickDelete(customer.id)} />
                                </span>
                            </>
                        }


                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubCategories;