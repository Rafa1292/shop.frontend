import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import '@styles/OrderItem.scss';
import close from '@icons/icon_close.png'
import { formatMoney } from '@helpers/formatHelper'

const OrderItem = ({ item }) => {
	const { removeFromCart } = useContext(AppContext);

	const handleRemove = item => {
		removeFromCart(item);
	}

	return (
		<div className="OrderItem items-center d-flex">
			<div className="col-2 center">
			<img src={close} alt="close" height={15} width={15} onClick={() => handleRemove(item)} />
			</div>
			<figure className='col-3 center'>
				<img src={item.productMove.product.image}/>
			</figure>
			<strong className='center col-2'>{item.productMove.quantity}</strong>
			<strong className='col-3'>{formatMoney(item.price * item.productMove.quantity)}</strong>
		</div>
	);
}

export default OrderItem;
