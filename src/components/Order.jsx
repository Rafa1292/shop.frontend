import React, {useEffect} from 'react';
import '@styles/Order.scss';
import { Link } from "react-router-dom";
import { useState } from 'react/cjs/react.development';

const Order = ({order, goTo}) => {
const [orderWidth, setOrderWith] = useState({width: '100%'});
const itemReducer = (accumulator, curr) => accumulator + (curr.unitPrice * curr.quantity);
const paymentReducer = (accumulator, curr) => accumulator + curr.paymentAccountHistory.amount;

	useEffect(async () => {
		if (!goTo) {
			setOrderWith({width: '80%'})
		}
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
	return (
		<div className="Order flex-wrap" style={orderWidth}>
			<div style={{borderBottom : '1px solid rgba(0,0,0,.1)'}} className='col-10 flex-wrap spaceAround py-1'>
				<span className='col-2 center'>{sumTotal(itemReducer, order.items)}</span>
				<span className='col-2 center'>-</span>
				<span className='col-2 center'>{sumTotal(paymentReducer, order.payments)}</span>
				<span className='col-2 center'>Al dia</span>
				{goTo &&
				<span className='col-2 center'>
					<Link to={`/orders/${order.id}`}>
					<button className='btn'>Ver</button>
					</Link>
				</span>
				}
			</div>
		</div>
	);
}

export default Order;
