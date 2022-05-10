import React, { useContext, useState } from 'react';
import OrderItem from '@components/OrderItem';
import AppContext from '../context/AppContext';
import '@styles/MyOrder.scss';
import { formatMoney } from '@helpers/formatHelper'
import { usePost } from '../hooks/useAPI';
import check from '@icons/check.png'

const MyOrder = (props) => {
	const { state, emptyCart } = useContext(AppContext);
	const [orderComplete, setOrderComplete] = useState(true);

	const sumTotal = () => {
		const reducer = (accumalator, currentValue) => accumalator + (currentValue.unitPrice * currentValue.quantity);
		const sum = state.items.reduce(reducer, 0);
		return sum;
	}

	const sendOrder = async () => {
		let newCart = JSON.parse(JSON.stringify(state))
		newCart.items.forEach(item => { delete item.product; });
		const response = await usePost('orders', newCart);
		if (response.status == 201) {
			setOrderComplete(true);
			emptyCart();
		}
	}

	return (
		<>
			<p className="title-order col-10 center z-1" style={{position: "absolute", height: '20px', paddingTop: "10px" }}>Orden actual</p>
			<div className="my-order-content">
				{orderComplete
					&&
					<div className='flex-wrap center content-center' style={{height: "-webkit-fill-available"}}>
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
