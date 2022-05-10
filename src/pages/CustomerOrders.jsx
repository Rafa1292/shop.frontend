import React, { useState, useEffect } from 'react';
import { useGetList } from '../hooks/useAPI';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Order from '@components/Order'

const CustomerOrders = () => {
    const { customerId } = useParams();
    let [orders, setOrders] = useState([]);

    const loadOrders = async () => {
        const response = await useGetList(`orders/customer/${customerId}`);
        setOrders(response.data);
    };

    useEffect(async () => {
        await loadOrders();
    }, []);

    return (
        <>
            <h2 className='col-10 center'>Ordenes</h2>
            <div className="col-md-8">

            <div style={{ borderBottom: '1px solid rgba(0,0,0,.1)' }} className='col-10 flex-wrap spaceAround py-1'>
                <span className='col-2 center'>Inicial</span>
                <span className='col-2 center'>Prima</span>
                <span className='col-2 center'>Abono</span>
                <span className='col-2 center'>Estado</span>
                <span className='col-2 center'>
                </span>
            </div>
            {orders.map(order => (
                <Order key={order.id} order={order} />
                ))
            }
            </div>
        </>
    );
}

export default CustomerOrders;