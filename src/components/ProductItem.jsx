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
			<img src={product.image} alt={product.title} />

			<div className="product-info d-flex">
				<div>
					<p className=''>{formatMoney(product.price)}</p>
					<p>{product.name}</p>
				</div>
				<figure onClick={() => handleClick(product)} >
					<img src={addToCartImage} alt="" />
				</figure>
			<p className='col-10 text-start m-0'>{product.brand.name}</p>
			</div>
		</div>
	);
}

export default ProductItem;
