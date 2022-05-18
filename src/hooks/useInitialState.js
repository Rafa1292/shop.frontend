import { useState } from "react";
import { useGet } from '../hooks/useAPI';

const initialState = {
	customerId: 0,
	credit: true,
	soldBy: "1",
	expiringDate: "2020/05/05",
	close: false,
	items: [],
	auth: {
		role: 'customer',
		sub: 0,
		user: null
	}
}

const useInitialState = () => {
	const [state, setState] = useState(initialState);

	const addToCart = (payload) => {
		if (isProductInCart(payload.id)) {
			state.items.forEach(item => {
				if (item.productId == payload.id) {
					item.quantity++;
				}
			});
		}
		else {
			const newItem = {
				"productId": payload.id,
				"quantity": 1,
				"unitPrice": payload.price,
				"product": payload
			};
			setState({
				...state,
				items: [...state.items, newItem]
			});
		}
	};

	const isProductInCart = (productId) => {
		let isInCart = false;
		state.items.forEach(item => {
			if (item.productId == productId) {
				isInCart = true;
			}
		});

		return isInCart;
	}

	const removeFromCart = (payload) => {
		setState({
			...state,
			items: state.items.filter(itemList => itemList.productId !== payload.productId),
		});
	}

	const setCustomerId = (id) => {
		setState({
			...state,
			customerId: id
		});
	}

	const emptyCart = () => {
		setState({
			...state,
			items: []
		});
	}

	const setRole = async () => {
		try {
			const response = await useGet('users/get-role', {});
			if (response.status == "200") {
				setState({
					...state,
					customerId: response.data.customerId,
					auth: {
						user: response.data.user,
						role: response.data.role,
						sub: response.data.sub
					}
				})
			}

		} catch (error) {
		}
	}

	const resetAuthState = ()=>{
		setState(initialState);
	}

	return {
		state,
		addToCart,
		removeFromCart,
		emptyCart,
		setCustomerId,
		setRole,
		resetAuthState
	}
}

export default useInitialState;
