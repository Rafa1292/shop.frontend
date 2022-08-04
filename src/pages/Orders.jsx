import React, { useEffect, useState, useContext } from 'react';
import { useGetList, usePost } from '../hooks/useAPI';
import '@styles/Orders.scss';
import OrderState from '@components/OrderState';
import Loader from '@components/Loader';
import AppContext from '../context/AppContext';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [states, setStates] = useState([]);
	const [loader, setLoader] = useState(false);
    const [paymethods, setPaymethods] = useState([]);
    const { state } = useContext(AppContext);

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

	const loadPaymethods = async () => {
        const response = await useGetList(`paymethods`);
        if (!response?.error) {
            const tempPaymethods = response.content.filter(x => x.account.userId == state.auth.sub)
            setPaymethods(tempPaymethods);            
        }
    };

	const loadStates = async () => {
		const response = await useGetList('states');

		if (!response.error) {
			setStates(response.content.filter(x => x.name.toLowerCase() != "finalizado"));			
		}
	};

	const refresh = async () => {
		await loadOrders();
	}

	useEffect(async () => {
		await loadOrders();
		await loadStates();
		await loadPaymethods();
	}, []);

	return (
		<div className="Orders" style={{ alignContent: 'baseline' }}>
			{loader &&
				<Loader />
				||
				<div className="Orders-container col-10 center" >
					{orders.map(order => (
						<OrderState paymethods={paymethods} states={states} key={order.id} refresh={refresh} order={order} />
					))}
				</div>
			}
		</div >
	);
}

export default Orders;
