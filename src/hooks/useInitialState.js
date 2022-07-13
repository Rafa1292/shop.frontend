import { useState } from "react";
import { useGet } from '../hooks/useAPI';

const initialState = {
	credit: true,
	customerId: 0,
	expiringDate: "2020/05/05",
	soldBy: "1",
	close: false,
	stateId: 1,
	items: [],
	delivered: false,
	firstPay: 0,
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
				if (item.productMove.productId == payload.id) {
					item.productMove.quantity++;
				}
			});
		}
		else {
			const newItem = {
				productMove: {
					quantity: 1,
					productId: payload.id,
					sizeId: 1,
					exit: true,
					cost: payload.price,
					product: payload,
				}
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
			if (item.productMove.productId == productId) {
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

	const setFirstPay = (firstPay) => {
		setState({
			...state,
			firstPay: firstPay
		});
	}

	const emptyCart = () => {
		setState({
			...state,
			firstPay: 0,
			customerId: 0,
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

	const resetAuthState = () => {
		setState(initialState);
	}

	return {
		state,
		addToCart,
		removeFromCart,
		emptyCart,
		setCustomerId,
		setRole,
		resetAuthState,
		setFirstPay
	}
}

export default useInitialState;
