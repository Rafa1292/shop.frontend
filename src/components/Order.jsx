import React, { useEffect } from 'react';
import '@styles/Order.scss';
import { Link } from "react-router-dom";
import { useState } from 'react/cjs/react.development';
import { formatMoney } from '@helpers/formatHelper'

const Order = ({ order, goTo }) => {
	const [orderWidth, setOrderWith] = useState({ width: '100%' });
	const itemReducer = (accumulator, curr) => accumulator + (curr.price * curr.productMove.quantity);
	const paymentReducer = (accumulator, curr) => accumulator + curr.paymentAccountHistory.amount;
	const [initialAmount, setInitialAmount] = useState(0);
	const [payAmount, setPayAmount] = useState(0);
	const [firstPay, setFirstPay] = useState(0);
	const [loader, setLoader] = useState(true);

	useEffect(async () => {
		if (!goTo) {
			setOrderWith({ width: '80%' })
		}
		setInitialAmount(sumTotal(itemReducer, order.items));
		setPayAmount(sumTotal(paymentReducer, order.payments));
		setFirstPay(order.firstPay ? order.firstPay : 0);
		setLoader(false);
	}, []);

	const sumTotal = (reducer, arr) => {
		try {
			if (arr != undefined) {
				const sum = arr.reduce(reducer, 0);
				return sum;
			}
		} catch (error) {

		}

	}

	const getState = () => {
		const diference = initialAmount - payAmount - firstPay;
		let currentState = 'Al dia';
		const months = getElapsedMonths();
		const totalDue = initialAmount - firstPay;
		currentState = diference == 0 ? "Finalizado" : currentState;
		currentState = !order.credit && order.close ? "Finalizado" : currentState;
		currentState = order.stateId == 1 ? "Rechazado" : currentState;
		currentState = (months * 0.25 * totalDue) > payAmount ? "Atrasado" : currentState;

		return currentState;
	}

	const getElapsedMonths = () => {
		const to = new Date(Date.now());
		const from = new Date(order.createdAt);
		var months = to.getMonth() - from.getMonth() + (12 * (to.getFullYear()
			- from.getFullYear()));

		if (to.getDate() < from.getDate())
			months--;

		return months;

	}

	return (
		<div className="Order flex-wrap" style={orderWidth}>
			{!loader &&
				<div style={{ borderBottom: '1px solid rgba(0,0,0,.1)' }} className='col-10 flex-wrap spaceAround py-1'>
					<span className='col-2 center'>{formatMoney(initialAmount)}</span>
					<span className='col-2 center'>{formatMoney(firstPay)}</span>
					<span className='col-2 center'>{formatMoney(payAmount)}</span>
					<span className='col-2 center'>{getState()}</span>
					{goTo &&
						<span className='col-2 center'>
							<Link to={`/orders/${order.id}`}>
								<button className='btn'>Ver</button>
							</Link>
						</span>
					}
				</div>
			}
		</div>
	);
}

export default Order;
