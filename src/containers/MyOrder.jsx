import React, { useContext, useState, useEffect } from 'react';
import OrderItem from '@components/OrderItem';
import AppContext from '../context/AppContext';
import '@styles/MyOrder.scss';
import { formatMoney } from '@helpers/formatHelper'
import { usePost } from '../hooks/useAPI';
import check from '@icons/check.png'
import { useGetList } from '../hooks/useAPI';

const MyOrder = (props) => {
	const { state, emptyCart, setCustomerId } = useContext(AppContext);
	const [orderComplete, setOrderComplete] = useState(false);
	const [customers, setCustomers] = useState([]);

	const loadCustomers = async () => {
		const response = await useGetList('customers');
		setCustomers(response.data);
	};

	const sumTotal = () => {
		const reducer = (accumalator, currentValue) => accumalator + (currentValue.productMove.unitPrice * currentValue.productMove.quantity);
		const sum = state.items.reduce(reducer, 0);
		return sum;
	}

	const sendOrder = async () => {
		let newCart = JSON.parse(JSON.stringify(state))
		newCart.items.forEach(item => { delete item.product; });
		delete newCart.auth;
		console.log(newCart)
		const response = await usePost('orders', newCart);
		if (response.status == 201) {
			setOrderComplete(true);
			emptyCart();
			await setTimeout(() => setOrderComplete(false), 2000)
		}
	}

	const setCustomer = async (id) => {
		await setCustomerId(id);
	}

	useEffect(async () => {
		await loadCustomers();
	}, []);

	return (
		<>
			<p className="title-order col-10 center z-1" style={{ position: "absolute", height: '20px', paddingTop: "10px" }}>Orden actual</p>
			<div className="my-order-content">
				{state.auth.role === 'admin' &&
					<>
						<span className='col-10 p-1 center'>
							<input onChange={e => setCustomer(e.target.value)} defaultValue="" list="customers" className='input col-8' placeholder='Cliente' />
						</span>
						<datalist id="customers">
							{customers.map(customer => (
								<option className='col-10' value={customer.id} key={customer.id}>{customer.name}</option>
							))}
						</datalist>
					</>
				}
				{orderComplete
					&&
					<div className='flex-wrap center content-center' style={{ height: "-webkit-fill-available" }}>
						<img height={45} style={{ opacity: 0.9 }} src={check} />
						<h3 className='col-10 center success-text my-1 flex-wrap'>
							Orden realizada
						</h3>
						<span className='col-10 center color-secondary hover'>Ver mis ordenes</span>
					</div>
					||
					<>
						{state.items.map(item => (
							<OrderItem item={item} key={`orderItem-${item.productId}`} />
						))}
					</>
				}
			</div>
			{!orderComplete
				&&
				<div className="resume">
					<div className="col-10 flex-wrap totalCart my-1 py-2">
						<p>
							<span>Total</span>
						</p>
						<p>{formatMoney(sumTotal())}</p>
					</div>
					<button className="btn col-10 p-2" onClick={() => sendOrder()}>
						Realizar pedido
					</button>
				</div>
			}
		</>
	);
}

export default MyOrder;
