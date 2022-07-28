import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import '@styles/OrderItem.scss';
import close from '@icons/icon_close.png'
import { formatMoney } from '@helpers/formatHelper'
import { useGetList } from '../hooks/useAPI';

const OrderItem = ({ item, showSizeInput = true }) => {
	const { removeFromCart } = useContext(AppContext);
	const [sizes, setSizes] = useState([]);

	const handleRemove = item => {
		removeFromCart(item);
	}

	const loadSizes = async () => {
		const response = await useGetList('sizes');
		if(!response.error){
			setSizes(response.content);
		}
	}

	useEffect(async () => {
		await loadSizes();
	}, []);

	const setSize = async (sizeId) => {
		console.log(item)
		item.productMove.sizeId = sizeId;
	}

	return (
		<div className="OrderItem col-10 center items-center d-flex">
			<strong className='center col-1'>{item.productMove.quantity}</strong>
			<figure className='col-2 center'>
				<img src={item.productMove.product.image} />
			</figure>
			{showSizeInput &&
				<div className="col-3 center">
					<select style={{ height: '40px' }} className='input col-8 p-2' onChange={(event) => setSize(event.target.value)}>
						<option key={0} value="0">Talla</option>
						{
							sizes.map(size => (
								<option key={size.id} value={size.id}>{size.name}</option>
							))
						}
					</select>
				</div>
			}
			<strong className='col-2 center'>{formatMoney(item.price * item.productMove.quantity)}</strong>
			{showSizeInput &&
				<div className="col-2 center">
					<img src={close} alt="close" height={15} width={15} onClick={() => handleRemove(item)} />
				</div>
			}
		</div>
	);
}

export default OrderItem;
