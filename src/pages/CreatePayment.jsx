import React from 'react';
import { useState, useEffect } from 'react/cjs/react.development';
import { useGetList, usePost } from '../hooks/useAPI';
import Order from '@components/Order'

const CreatePayment = () => {
    const [customer, setCustomer] = useState({
        orders: []
    });
    const [customers, setCustomers] = useState([]);
    const [paymethods, setPaymethods] = useState([]);

    useEffect(async () => {
        await loadCustomers();
    }, []);

    const loadCustomers = async () => {
        const response = await useGetList('customers');
        setCustomers(response.data);
    };

    const loadCustomer = async (id) => {
        const response = await useGetList(`customers/${id}`);
        setCustomer(response.data);
    };

    const selectCustomer = (e) => {
        loadCustomer(e.target.value);
    }

    const selectOrder = (id)=>{
        console.log(id)
    }

    return (
        <>
            <h2 className='color-secondary'>Agregar abono</h2>
            <div className='col-10 d-flex center fit-content'>
                <span className='col-10 p-1 center'>
                    <input onChange={e => selectCustomer(e)} list="customers" className='input col-10' placeholder='Cliente' />
                </span>
                <datalist id="customers">
                    {customers.map(customer => (
                        <option className='col-10' value={customer.id} key={customer.id}>{customer.name}</option>
                    ))}
                </datalist>
                <span className='col-10 p-1 center'>
                    <input type='number' id='amount' placeholder='Monto' className='input col-10' />
                </span>
                <span className='col-10 p-1 center'>
                    <select className='input p-2'>
                        <option value="0">Seleccione una forma de pago</option>
                        {
                            paymethods.map(paymethod => (
                                <option key={paymethod.id} value={paymethod.id}>{paymethod.name}</option>
                            ))
                        }
                    </select>
                </span>

                <div className="col-md-8">
                    <div style={{ borderBottom: '1px solid rgba(0,0,0,.1)' }} className='col-10 flex-wrap spaceAround py-1'>
                        <span className='col-2 center'>Inicial</span>
                        <span className='col-2 center'>Prima</span>
                        <span className='col-2 center'>Abono</span>
                        <span className='col-2 center'>Estado</span>
                        <span className='col-2 center'>
                        </span>
                    </div>
                    {customer.orders.map(order => (
                        <div onClick={()=>selectOrder(order.id)} key={order.id} className='col-10 flex-wrap content-center p-0 my-2'>
                            <Order order={order} />
                            <span className='col-2 d-flex' style={{borderBottom: '1px solid rgba(0,0,0,.1)'}}>
                            <button style={{height: '25px', fontSize: '17px', padding: '0'}} className='btn success col-10'>$</button>
                            </span>
                        </div>
                    ))
                    }
                </div>
            </div>
        </>
    );
}

export default CreatePayment;