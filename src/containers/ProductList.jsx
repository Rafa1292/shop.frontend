import React, { useState, useEffect } from 'react';
import ProductItem from '@components/ProductItem';
import '@styles/ProductList.scss';
import { useGetList } from '../hooks/useAPI';
import loadingGif from '../assets/icons/loading.gif'


const ProductList = () => {
	const [colors, setColors] = useState([]);
	let [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(async () => {
		await loadProducts();
		await loadColors();
		setLoading(false);
	}, []);
	const loadProducts = async () => {
		const response = await useGetList('products');
		setProducts(response.data);
	};
	const loadColors = async () => {
		const response = await useGetList('colors');
		setColors(response.data);
	};
	return (
		<>
			{loading &&
				<img height={200} src={loadingGif} />
				||
					<div className="ProductList flex-wrap center">
						{products.map(product => (
							<ProductItem colors={colors} product={product} key={product.id} />
						))}
					</div>
			}
		</>
	);
}

export default ProductList;
