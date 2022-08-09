import React, { useState, useEffect, useContext, useRef } from 'react';
import { useGetList, usePost } from '../hooks/useAPI';
import Order from '@components/Order'
import OrderItem from '@components/OrderItem';
import { useHistory } from "react-router-dom"
import AppContext from '../context/AppContext';
import swal from 'sweetalert';

const CreatePayment = () => {
    const { state } = useContext(AppContext);

    const [customer, setCustomer] = useState({
        orders: []
    });
    const [customers, setCustomers] = useState([]);
    const [paymethods, setPaymethods] = useState([]);
    const [order, setOrder] = useState(null);
    const [paymethodId, setPaymethodId] = useState(0);
    const amount = useRef(0);
    const history = useHistory();
    const reducer = (accumalator, currentValue) => accumalator + (currentValue.price * currentValue.productMove.quantity);
    const historyReducer = (accumalator, currentValue) => accumalator + (currentValue.paymentAccountHistory.amount);

    useEffect(async () => {
        await loadCustomers();
        await loadPaymethods();
    }, []);

    const loadCustomers = async () => {
        const response = await useGetList('customers');

        if (!response?.error) {
            setCustomers(response.content);
        }
    };

    const loadCustomer = async (id) => {
        const response = await useGetList(`customers/withOrders/${id}`);
        console.log(response)
        if (!response?.error) {
            setCustomer(response.content);
        }
    };

    const loadPaymethods = async () => {
        const response = await useGetList(`paymethods`);
        if (!response?.error) {
            const tempPaymethods = response.content.filter(x => x.account.userId == state.auth.sub)
            setPaymethods(tempPaymethods);            
        }
    };

    const selectCustomer = (e) => {
        try {
            const customer = customers.find(x => x.name == e.target.value);
            if (customer)
                loadCustomer(customer.id);

        } catch (error) {

        }
    }

    const sendPay = async () => {
        const payments = order.payments.reduce(historyReducer, 0);
        const due = order.items.reduce(reducer, 0);
        const diference = due - payments;
        console.log(diference)

        if (amount.current.value <= diference) {
            const payment = {
                orderId: order.id,
                paymentAccountHistory: {
                    amount: parseInt(amount.current.value),
                    accountHistory: {
                        paymethodId: parseInt(paymethodId),
                        amount: parseInt(amount.current.value),
                        debit: false
                    }
                }
            };
            const response = await usePost('payments', payment);

            if (!response?.error) {
                history.push(`/orders/${order.id}`);
            }
        }
        else{
            swal('Error', 'Monto invalido', 'warning')
        }
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
                        <option className='col-10' value={customer.id}
                            key={customer.id}>{customer.name}</option>
                    ))}
                </datalist>
                <span className='col-10 p-1 center'>
                    <input type='number' ref={amount} id='amount' placeholder='Monto' className='input col-10' />
                </span>
                <span className='col-10 p-1 center'>
                    <select className='input p-2' onChange={(event) => setPaymethodId(event.target.value)}>
                        <option value="0">Seleccione una forma de pago</option>
                        {
                            paymethods.map(paymethod => (
                                <option key={paymethod.id} value={paymethod.id}>{paymethod.name}</option>
                            ))
                        }
                    </select>
                </span>
                {order &&
                    <div className="col-10 py-2 flex-wrap center">
                        <button onClick={sendPay} className='btn'>Abonar</button>
                    </div>
                }
                <div className="col-md-8">
                    {customer.id &&
                        <div style={{ borderBottom: '1px solid rgba(0,0,0,.1)' }} className='col-10 flex-wrap spaceAround py-1'>
                            <span className='col-2 items-center center'>Inicial</span>
                            <span className='col-2 items-center center'>Prima</span>
                            <span className='col-2 items-center center'>Abono</span>
                            <span className='col-2 items-center center'>Estado</span>
                            <span className='col-2 center'>
                                <button onClick={() => setOrder(null)} style={{ fontSize: '10px', padding: '8px' }} className='btn'>volver</button>
                            </span>
                        </div>
                    }
                    {order &&
                        <div className='col-12 start flex-wrap'>
                            <Order order={order} />
                            <span className='col-2' style={{ borderBottom: '1px solid rgba(0,0,0,.1)' }}></span>
                            <div className='col-10 center my-2 flex-wrap'>
                                {order.items.map(item => (
                                    <OrderItem showSizeInput={false} item={item} key={`orderItem-${item.id}`} />
                                ))}
                            </div>
                        </div>
                        ||
                        <>
                            {customer.orders.map(order => (
                                <div key={order.id} className='col-10 flex-wrap content-center p-0 my-2'>
                                    <Order order={order} />
                                    <span className='col-2 d-flex' style={{ borderBottom: '1px solid rgba(0,0,0,.1)' }}>
                                        <button onClick={() => setOrder(order)} style={{ height: '25px', fontSize: '11px', padding: '0' }} className='btn success-outline col-10'>ver</button>
                                    </span>
                                </div>
                            ))
                            }
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default CreatePayment;