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
		<div className="OrderItem">
			<figure>
				<img src={item.product.image}/>
			</figure>
			<strong className='center'>{item.productMove.quantity}</strong>
			<p className=''>{formatMoney(item.productMove.cost)}</p>
			<img src={close} alt="close" onClick={() => handleRemove(item)} />
		</div>
	);
}

export default OrderItem;
