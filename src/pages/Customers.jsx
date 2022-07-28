import { useGetList, usePost, useDelete, usePatch } from '../hooks/useAPI';
import React, { useRef, useState, useEffect } from "react";
import Title from '@components/Title';
import '@styles/subcategories.scss';

const SubCategories = () => {
    let [customers, setCustomers] = useState([]);
    let [categoryId, setCategoryId] = useState(0);
    const [editId, setEditId] = useState(0);
    let nameInput = useRef();
    let mailInput = useRef();
    let nameEditInput = useRef();
    let phone = useRef();
    let maxOrders = useRef();


    const loadCustomers = async () => {
        const response = await useGetList('customers');

        if (!response.error) {
            setCustomers(response.content);            
        }
    };

    useEffect(async () => {
        await loadCustomers();
    }, []);

    const handleClickPost = async () => {
        const response = await usePost('customers', {
            name: nameInput.current.value,
            phone: phone.current.value,
            maxOrders: maxOrders.current.value,
            user: {
                email: mailInput.current.value,
                password: "contraseña",
                role: "customer"
            }
        });

        if (!response.error) {
            await loadCustomers();
            nameInput.current.value = null;
            mailInput.current.value = null;
            phone.current.value = null;
            maxOrders.current.value = null;
        }
    };

    const handleClickDelete = async (id) => {
        const response = await useDelete(`customers/${id}`);

        if (!response.error) {
            await loadCustomers();
        }
    };

    const handleClickPatch = async (id) => {
        let options = {
            name: nameEditInput.current.value,
            phone: phone.current.value,
            maxOrders: maxOrders.current.value
        };
        options = categoryId > 0 ? { ...options, categoryId: categoryId } : options;
        const response = await usePatch(`customers/${id}`, options);
        if (!response.error) {
            await loadCustomers();
            nameInput.current.value = null;
            phone.current.value = null;
            maxOrders.current.value = null;
            setEditId(0);
        }
    };

    return (
        <div className="subcategory-index">
            <Title title="Lista de clientes"></Title>
            <div className='add-subcategory-container my-2 col-sm-10 center'>
                <span className='col-10 center my-1'>
                    <input type="text" placeholder="Nuevo cliente" className="input" ref={nameInput} />
                </span>
                <span className='col-10 center my-1'>
                    <input type="text" placeholder="Correo" className="input" ref={mailInput} />
                </span>
                <span className='col-10 center my-1'>
                    <input type='number' id='phone' ref={phone} placeholder='89745213' className='input' />
                </span>
                <span className='col-10 center my-1'>
                    <input type='number' id='maxOrders' ref={maxOrders} placeholder='Ordenes max' className='input' />
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
                            <div className='col-10 flex-wrap center'>
                                <span className='col-10 p-1 center'>
                                    <input type="text" className="input col-5" defaultValue={customer.name} ref={nameEditInput} />
                                </span>
                                <span className='col-10 p-1 center'>
                                    <input type='number' id='phone' ref={phone} defaultValue={customer.phone} placeholder='89745213' className='input col-5' />
                                </span>
                                <span className='col-10 center p-1'>
                                    <input type='number' id='maxOrders' ref={maxOrders} defaultValue={customer.maxOrders} placeholder='Ordenes max' className='input col-5' />
                                </span>
                                <span className='col-4 mx-2 center'>
                                    <input className='btn success col-10' type="button" value='Cambiar' onClick={() => handleClickPatch(customer.id)} />
                                </span>
                                <span className='col-4 center'>
                                    <input className='btn danger col-10' type="button" value='X' onClick={() => setEditId(0)} />
                                </span>
                            </div>
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