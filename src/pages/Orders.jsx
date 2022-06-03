import React, { useEffect, useState } from 'react';
import { useGetList, usePost } from '../hooks/useAPI';
import '@styles/Orders.scss';
import OrderState from '@components/OrderState'
const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [states, setStates] = useState([]);

	const loadOrders = async () => {
		const response = await useGetList('orders');
		const orderStates = response.data.sort(function (a, b) {
			return b.id - a.id
		});
		setOrders(orderStates);
	};

	const loadStates = async () => {
		const response = await useGetList('states');
		setStates(response.data);
	};

	const refresh = async () => {
		await loadOrders();
	}

	useEffect(async () => {
		await loadOrders();
		await loadStates();
	}, []);

	return (
		<div className="Orders" style={{alignContent:'baseline'}}>
			<div className="Orders-container" >
				{orders.map(order => (
					<OrderState states={states} key={order.id} refresh={refresh} order={order} />
				))}
			</div>
		</div>
	);
}

export default Orders;
