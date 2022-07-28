import React, { useEffect, useState } from 'react';
import { useGetList, usePost } from '../hooks/useAPI';
import '@styles/Orders.scss';
import OrderState from '@components/OrderState';
import Loader from '@components/Loader';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [states, setStates] = useState([]);
	const [loader, setLoader] = useState(false);

	const loadOrders = async () => {
		setLoader(true);
		const response = await useGetList('orders');

		if (!response.error) {			
			const orderStates = response.content.sort(function (a, b) {
				return b.id - a.id
			});
			setOrders(orderStates);
			setLoader(false);
		}
	};

	const loadStates = async () => {
		const response = await useGetList('states');

		if (!response.error) {
			setStates(response.content);			
		}
	};

	const refresh = async () => {
		await loadOrders();
	}

	useEffect(async () => {
		await loadOrders();
		await loadStates();
	}, []);

	return (
		<div className="Orders" style={{ alignContent: 'baseline' }}>
			{loader &&
				<Loader />
				||
				<div className="Orders-container" >
					{orders.map(order => (
						<OrderState states={states} key={order.id} refresh={refresh} order={order} />
					))}
				</div>
			}
		</div >
	);
}

export default Orders;
