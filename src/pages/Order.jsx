import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useGet, useGetList } from '../hooks/useAPI';
import OrderItem from '@components/OrderItem';

const Order = () => {
    const { orderId } = useParams();
    const [accounts, setAccounts] = useState([]);
    const [order, setOrder] = useState({
        customer: {
            name: ''
        },
        createdAt: '',
        expiringDate: '',
        items: []
    });
    const itemReducer = (accumulator, curr) => accumulator + (curr.unitPrice * curr.quantity);
    const paymentReducer = (accumulator, curr) => accumulator + curr.paymentAccountHistory.amount;

    const loadOrder = async () => {
        const response = await useGet(`orders/${orderId}`);
        await setOrder(response.data);
    };

    const loadAccounts = async () => {
        const response = await useGetList(`accounts`);
        await setAccounts(response.data);
    };

    const getAccountName = (id) =>{
        let name = '';
        accounts.forEach(account => {
            if (account.id === id) {
                name = account.name;
            }
        });

        return name;
    }

    const sumTotal = (reducer, arr) => {
        if (arr != undefined) {
            const sum = arr.reduce(reducer, 0);
            return sum;
        }
    }

    useEffect(async () => {
        await loadOrder();
        await loadAccounts();
    }, []);

    return (
        <>
            <span className='col-10 d-flex p-2 bold center'>General</span>
            <span className='col-5 d-flex px-2 end'>Cliente:</span>
            <span className='col-5 d-flex start'>{order.customer.name}</span>
            <span className='col-5 d-flex px-2 end'>Fecha de orden:</span>
            <span className='col-5 d-flex start'>{new Date(order.createdAt).toLocaleString()}</span>
            <span className='col-5 d-flex px-2 end'>Vencimiento:</span>
            <span className='col-5 d-flex start'>{new Date(order.expiringDate).toLocaleString()}</span>
            <span className='col-5 d-flex px-2 end'>Tipo de compra:</span>
            <span className='col-5 d-flex start'>{order.credit ? 'Credito' : 'Contado'}</span>
            <span className='col-5 d-flex px-2 end'>Total:</span>
            <span className='col-5 d-flex start'>{sumTotal(itemReducer, order.items)}</span>
            <span className='col-10 d-flex p-2 bold center'>Articulos</span>
            {order.items.map(item => (
                <OrderItem item={item} key={`orderItem-${item.productId}`} />
            ))}
            {order.credit &&
                <>
                    <span className='col-10 d-flex p-2 bold center'>Credito</span>
                    <span className='col-5 d-flex px-2 end'>Saldo:</span>
                    <span className='col-5 d-flex start'>{sumTotal(itemReducer, order.items) - sumTotal(paymentReducer, order.payments)}</span>
                    <span className='col-5 d-flex px-2 end'>Abono:</span>
                    <span className='col-5 d-flex start'>{sumTotal(paymentReducer, order.payments)}</span>
                    <span className='col-10 d-flex p-2 bold center'>Abonos</span>
                    <span className='col-3 d-flex p-1 center secondary'>Fecha</span>
                    <span className='col-3 d-flex p-1 center secondary'>Monto</span>
                    <span style={{textAlign: 'center'}} className='secondary col-4 d-flex p-1 center'>forma de pago</span>
                    {order.payments.map(payment => (
                        <div className='col-10 flex-wrap mb-2' key={payment.id}>
                            <span className='col-3 d-flex px-2 center'>{new Date(payment.createdAt).toLocaleString()}</span>
                            <span className='col-3 d-flex px-2 center'>{payment.paymentAccountHistory.amount}</span>
                            <span className='col-4 d-flex center'>{`${payment.paymentAccountHistory.accountHistory.paymethod.name} ${getAccountName(payment.paymentAccountHistory.accountHistory.paymethod.account)}`}</span>
                        </div>
                    ))}
                </>
            }
        </>
    );
}

export default Order;