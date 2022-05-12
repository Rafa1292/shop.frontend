import React, {useEffect} from 'react';
import '@styles/Order.scss';
import { Link } from "react-router-dom";
import { useState } from 'react/cjs/react.development';

const Order = ({order, goTo}) => {
const [orderWidth, setOrderWith] = useState({width: '100%'})
	useEffect(async () => {
		if (!goTo) {
			setOrderWith({width: '80%'})
		}
    }, []);
	return (
		<div className="Order flex-wrap" style={orderWidth}>
			<div style={{borderBottom : '1px solid rgba(0,0,0,.1)'}} className='col-10 flex-wrap spaceAround py-1'>
				<span className='col-2 center'>¢40,000</span>
				<span className='col-2 center'>¢20,000</span>
				<span className='col-2 center'>¢5,000</span>
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
