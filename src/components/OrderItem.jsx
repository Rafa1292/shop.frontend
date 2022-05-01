import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import '@styles/OrderItem.scss';
import close from '@icons/icon_close.png'
import {formatMoney} from '@helpers/formatHelper'

const OrderItem = ({ product }) => {
	const { removeFromCart } = useContext(AppContext);

	const handleRemove = product => {
		removeFromCart(product);
	}

	return (
		<div className="OrderItem">
			<figure>
				<img src="https://cdn.lorem.space/images/shoes/.cache/640x480/luis-felipe-lins-J2-wAQDckus-unsplash.jpg" alt={product.title} />
			</figure>
			<p>Nike 116</p>
			<p>{formatMoney(40000)}</p>
			<img src={close} alt="close" onClick={() => handleRemove(product)} />
		</div>
	);
}

export default OrderItem;
