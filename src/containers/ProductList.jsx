import React, { useState, useEffect } from 'react';
import ProductItem from '@components/ProductItem';
import '@styles/ProductList.scss';
import { useGetList } from '../hooks/useAPI';
import Loader from '@components/Loader';
import checkGris from '@icons/checkGris.png'

const ProductList = () => {
	let [products, setProducts] = useState([]);
	let [tempProducts, setTempProducts] = useState([]);
	let [colors, setColors] = useState([]);
	let [brands, setBrands] = useState([]);
	const [loading, setLoading] = useState(true);
	const [brandsId, setBrandsId] = useState([]);
	const [colorsId, setColorsId] = useState([]);

	useEffect(async () => {
		await loadProducts();
		await loadBrands();
		await loadColors();
		setLoading(false);
	}, []);

	const loadProducts = async () => {
		const response = await useGetList('products');
		if (!response?.error) {
			setProducts(response.content);
			setTempProducts(response.content);
		}
	};

	const loadBrands = async () => {
		const response = await useGetList('brands');

		if (!response.error) {
			setBrands(response.content);
		}
	};

	const loadColors = async () => {
		const response = await useGetList('colors');
		if (!response.error) {
			setColors(response.content);
		}
	};

	const filterBrands = async (id, isChecked) => {
		let tempBrandsId = [
			...brandsId
		];

		if (isChecked) {
			tempBrandsId = [
				...brandsId,
				id
			];
		}
		else {
			tempBrandsId = tempBrandsId.filter(x => x != id);
		}
		await setBrandsId(tempBrandsId);
		await filter(tempBrandsId, true);
	};

	const filterColors = async (id, isChecked) => {
		let tempColorsId = [
			...colorsId
		];

		if (isChecked) {
			tempColorsId = tempColorsId.filter(x => x != id);
		}
		else {
			tempColorsId = [
				...colorsId,
				id
			];
		}

		await setColorsId(tempColorsId);
		await filter(tempColorsId, false);
	}

	const filter = async (idList, isBrand) => {
		let productList = products;
		const tempBrandsId = isBrand ? idList : brandsId;
		const tempColorsId = isBrand ? colorsId : idList;

		productList = tempBrandsId.length > 0 ? productList.filter(x => tempBrandsId.indexOf(x.brandId) != -1) : productList;
		productList = tempColorsId.length > 0 ?
			productList.filter(x =>
				tempColorsId.indexOf(x.primaryColorId) != -1 ||
				tempColorsId.indexOf(x.secondaryColorId) != -1) :
			productList = productList;


		await setTempProducts(productList);
	}

	return (
		<>
			{loading &&
				<Loader />
				||
				<>
					<div className="col-10 my-2  flex-wrap">
						<div className="col-md-5 my-2 flex-wrap spaceAround">
							{brands.map(brand => (
								<span className="items-center justify-end my-1" style={{width: '130px'}} key={brand.id}>
									<img height={20} src={brand.image} />
									{brand.name}
									<input type={'checkbox'} onChange={e => filterBrands(brand.id, e.target.checked)} />
								</span>
							))}
						</div>
						<div className="col-md-5 center my-2">

							{colors.map(color => (
								<span className="col-1 m-1 items-center center text-center" key={color.id}>
									<div
										onClick={() => filterColors(color.id, colorsId.indexOf(color.id) != -1)}
										style={
											{
												background: color.name,
												height: '30px',
												width: '30px',
												border: '1px solid rgba(0,0,0,.2)',
												borderRadius: '50px'
											}}>
										{colorsId.indexOf(color.id) != -1
											&&
											<img src={checkGris} height='30' width='30' style={{ opacity: '0.5' }} />
										}
									</div>
								</span>
							))}
						</div>
					</div>
					<div className="ProductList flex-wrap center">
						{tempProducts.map(product => (
							<ProductItem product={product} key={product.id} />
						))}
					</div>
				</>
			}
		</>
	);
}

export default ProductList;
