import React, { useContext } from 'react';
import '@styles/ProductItem.scss';
import AppContext from '../context/AppContext';
import addToCartImage from '@icons/bt_add_to_cart.svg';
import {formatMoney} from '@helpers/formatHelper'
const ProductItem = ({ product }) => {
	const { addToCart } = useContext(AppContext);

	const handleClick = item => {
		addToCart(item);
	}

	return (
		<div className="ProductItem">
			<img src="https://cdn.lorem.space/images/shoes/.cache/640x480/luis-felipe-lins-J2-wAQDckus-unsplash.jpg" alt={product.title} />
			<div className="product-info">
				<div>
					<p>{formatMoney(40000)}</p>
					<p>Nike 165</p>
				</div>
				<figure onClick={() => handleClick(product)} >
					<img src={addToCartImage} alt="" />
				</figure>
			</div>
		</div>
	);
}

export default ProductItem;
