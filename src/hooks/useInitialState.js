import { useState } from "react";
import { useGet } from '../hooks/useAPI';
import swal from 'sweetalert';

const initialState = {
	credit: false,
	customerId: 0,
	expiringDate: new Date(new Date().setMonth(new Date().getMonth() + 4)),
	soldBy: "1",
	close: false,
	stateId: 2,
	items: [],
	delivered: false,
	firstPay: 0,
	auth: {
		role: 'customer',
		sub: 0,
		user: null,
		justSee: false
	}
}


const useInitialState = () => {
	const [state, setState] = useState(initialState);

	const addToCart = (payload) => {

		if (state.auth.user) {
			if (isProductInCart(payload.id)) {
				console.log(state)
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
						sizeId: 0,
						exit: true,
						cost: 0,
						product: payload,
						confirmed: false
					},
					price: payload.price
				};
				setState({
					...state,
					items: [...state.items, newItem]
				});
			}
		}
		else{
			swal('Error', 'Debes iniciar sesion antes', 'warning')
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

	const setCredit = (credit) => {
		setState({
			...state,
			credit: credit
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
			if (!response.error) {
				setState({
					...state,
					customerId: response.content.customerId,
					auth: {
						user: response.content.user,
						role: response.content.role,
						sub: response.content.sub,
						phone: parseInt(response.content.phone)
					}
				})
			}

		} catch (error) {
		}
	}

	const changeSeeMode = () => {
		setState({
			...state,
			auth: {
				...state.auth,
				justSee: !state.auth.justSee
			}
		});
	}

	const resetAuthState = () => {
		setState(initialState);
	}

	return {
		state,
		changeSeeMode,
		addToCart,
		removeFromCart,
		emptyCart,
		setCustomerId,
		setRole,
		resetAuthState,
		setFirstPay,
		setCredit
	}
}

export default useInitialState;
