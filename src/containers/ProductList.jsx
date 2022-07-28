import React, { useState, useEffect } from 'react';
import ProductItem from '@components/ProductItem';
import '@styles/ProductList.scss';
import { useGetList } from '../hooks/useAPI';
import Loader from '@components/Loader';

const ProductList = () => {
	let [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(async () => {
		await loadProducts();
		setLoading(false);
	}, []);
	const loadProducts = async () => {
		const response = await useGetList('products');
		if(!response?.error)
		setProducts(response.content);
	};

	return (
		<>
			{loading &&
				<Loader/>
				||
				<div className="ProductList flex-wrap center">
					{products.map(product => (
						<ProductItem product={product} key={product.id} />
					))}
				</div>
			}
		</>
	);
}

export default ProductList;
