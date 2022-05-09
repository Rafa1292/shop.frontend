import React, { useContext } from 'react';
import OrderItem from '@components/OrderItem';
import AppContext from '../context/AppContext';
import '@styles/MyOrder.scss';
import { formatMoney } from '@helpers/formatHelper'

const MyOrder = (props) => {
	const { state } = useContext(AppContext);

	const sumTotal = () => {
		const reducer = (accumalator, currentValue) => accumalator + (currentValue.unitPrice * currentValue.quantity);
		const sum = state.items.reduce(reducer, 0);
		return sum;
	}

	const sendOrder = () => {

	}

	return (
		<>
			<p className="title-order col-10 center" style={{ height: '20px' }}>Orden actual</p>
			<div className="my-order-content">
				{state.items.map(item => (
					<OrderItem item={item} key={`orderItem-${item.productId}`} />
				))}
			</div>
			<div className="resume">
				<div className="col-10 flex-wrap totalCart my-2 py-2">
					<p>
						<span>Total</span>
					</p>
					<p>{formatMoney(sumTotal())}</p>
				</div>
				<button className="btn col-10 p-2">
					Realizar pedido
				</button>
			</div>
		</>
	);
}

export default MyOrder;
