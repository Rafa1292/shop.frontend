import React, { useState, useEffect } from 'react';
import ProductItem from '@components/ProductItem';
import '@styles/ProductList.scss';
import { useGetList } from '../hooks/useAPI';


const ProductList = () => {
    let [products, setProducts] = useState([]);
    useEffect(async () => {
        await loadProducts();
    }, []);
    const loadProducts = async () => {
        const response = await useGetList('products');
        setProducts(response.data);
    };
	return (
		<section className="main-container">
			<div className="ProductList">
				{products.map(product => (
					<ProductItem product={product} key={product.id} />
				))}
			</div>
		</section>
	);
}

export default ProductList;
