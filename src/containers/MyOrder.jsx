import React, { useContext, useState, useEffect, useRef } from 'react';
import OrderItem from '@components/OrderItem';
import AppContext from '../context/AppContext';
import '@styles/MyOrder.scss';
import { formatMoney } from '@helpers/formatHelper'
import { usePost } from '../hooks/useAPI';
import check from '@icons/check.png'
import { useGetList } from '../hooks/useAPI';
import swal from 'sweetalert';

const MyOrder = (props) => {
	const { setCredit, state, changeSeeMode, emptyCart, setCustomerId, setFirstPay } = useContext(AppContext);
	const [orderComplete, setOrderComplete] = useState(false);
	const [customers, setCustomers] = useState([]);
	const loadCustomers = async () => {
		const response = await useGetList('customers');
		if (!response?.error)
			setCustomers(response.content);
	};
	const HandleCart = {props};

	const sumTotal = () => {
		const reducer = (accumalator, currentValue) => accumalator + (currentValue.price * currentValue.productMove.quantity);
		const sum = state.items.reduce(reducer, 0);
		return sum;
	}

	const sendOrder = async () => {
		let newCart = JSON.parse(JSON.stringify(state))
		newCart.items.forEach(item => { delete item.product; });
		delete newCart.auth;
		if (await validateNewCart(newCart)) {
			const response = await usePost('orders', newCart);
			if (!response?.error) {
				setOrderComplete(true);
				emptyCart();
				await setTimeout(() => setOrderComplete(false), 2000)
			}
		}
	}

	const validateNewCart = async (newCart) => {
		if (!state.auth.phone > 0) {
			await changeSeeMode();
			props.HandleCart(false);
			return false;
		}
		else {

			for (const item of newCart.items) {
				if (item.productMove.sizeId == 0) {
					swal('Error', 'Debes seleccionar una talla', 'warning')
					return false;
				}
			}
			
			return true;
		}
	}

	const setCustomer = async (name) => {
		const customer = customers.find(x => x.name == name);

		if (customer)
			await setCustomerId(customer.id);
	}

	useEffect(async () => {
		await loadCustomers();
	}, []);

	const firstPayHandler = (e) => {
		setFirstPay(e.target.value);
	}

	return (
		<>
			<p className="title-order col-10 center z-1" style={{ position: "absolute", height: '20px', paddingTop: "10px" }}>Orden actual</p>
			<div className="my-order-content">
				{!orderComplete &&
					<>
						<strong className='col-10 items-center my-2 center'>
							<input onChange={() => setCredit(!state.credit)} type={'checkbox'} />
							<label>Cr??dito</label>
						</strong>
						{state.credit &&
							<span className='col-10 p-1 center'>
								<input onKeyUp={(e) => firstPayHandler(e)} className='input col-8' placeholder='Prima' />
								<small style={{ color: 'rgba(0,0,0,.5)' }} className='col-10 center '>
									{
										state.firstPay > 0 &&
										formatMoney(state.firstPay)
									}
								</small>
							</span>
						}
						{state.auth.role === 'admin' &&
							<>
								<span className='col-10 p-1 center'>
									<input onChange={e => setCustomer(e.target.value)} defaultValue="" list="customers" className='input col-8' placeholder='Cliente' />
								</span>
								<datalist id="customers">
									{customers.map(customer => (
										<option className='col-10' value={customer.name} key={customer.id}>
											{customer.name}
										</option>
									))}
								</datalist>
							</>
						}
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
							<OrderItem item={item} key={`orderItem-${item.productMove.productId}`} />
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
