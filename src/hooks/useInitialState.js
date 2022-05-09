import { useState } from "react";

const initialState = {
	customerId: 5,
	credit: false,
	soldBy: 1,
	expiringDate: "2020/05/05",
	close: false,
	items: [],
}

const useInitialState = () => {
	const [state, setState] = useState(initialState);

	const addToCart = (payload) => {
		if (isProductInCart(payload.id)) {
			state.items.forEach(item => {
				if(item.productId == payload.id)
				{
					item.quantity++;
				}
			});
		}
		else{
			const newItem = {
				"orderId": 0,
				"productId": payload.id,
				"quantity": 1,
				"unitPrice": payload.price,
				"product": payload
			};
			console.log(newItem)
			setState({
				...state,
				items: [...state.items, newItem]
			});
		}

		console.log(state);
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

	return {
		state,
		addToCart,
		removeFromCart
	}
}

export default useInitialState;
