import React, { useContext, useEffect, useState } from 'react';
import '@styles/ProductItem.scss';
import AppContext from '../context/AppContext';
import addToCartImage from '@icons/addCartVector.png';
import shopcart from '@icons/shopcart.png';
import { formatMoney } from '@helpers/formatHelper'
import wapp from '@icons/wapp.png';

const ProductItem = ({ product }) => {
	const { addToCart } = useContext(AppContext);

	const handleClick = item => {
		addToCart(item);
	}

	return (
		<div className="ProductItem">
			<img className='product-item-img' src={product.image} alt={product.title} />

			<div className="product-info d-flex px-2">
				<span className='p-0 col-10' style={{ height: '40px' }}>
					{product.name}
				</span>
				<div className=' flex-wrap col-10 justify-end flex-wrap'>
					<figure className='absolute d-flex items-center'>
						<a href={`https://wa.me/+50670078323?text=¡Buenas,+tengo+interes+en+las+tenis+${product.name}`} 
						className="center items-center"
							style={{
								background: '#02A820',
								color: 'white',
								height: '40px',
								width: '40px',
								borderRadius: '200px',
								padding: '10px',
								margin: '0 5px'
							}}>
							<img src={wapp} height={20} />
						</a>
						<img style={{borderRadius: '50px'}} src={shopcart} onClick={() => handleClick(product)} />
					</figure>
					<em className='col-10 my-1 items-center' style={{ fontWeight: 200 }}>
						<img src={product.brand.image} height={20} width={20} />
						{product.brand.name}
					</em>
					<strong className='col-10'>
						{formatMoney(product.price)}
					</strong>
				</div>
			</div>
		</div>
	);
}

export default ProductItem;
