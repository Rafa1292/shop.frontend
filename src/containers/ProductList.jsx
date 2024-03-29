import React, { useState, useEffect } from 'react';
import ProductItem from '@components/ProductItem';
import '@styles/ProductList.scss';
import { useGetList } from '../hooks/useAPI';
import Loader from '@components/Loader';
import checkGris from '@icons/checkGris.png'
import { Link } from "react-router-dom";

const ProductList = () => {
	let [products, setProducts] = useState([]);
	let [tempProducts, setTempProducts] = useState([]);
	let [colors, setColors] = useState([]);
	let [brands, setBrands] = useState([]);
	const [loading, setLoading] = useState(true);
	const [brandsId, setBrandsId] = useState([]);
	const [colorsId, setColorsId] = useState([]);
	const [files, setFiles] = useState(10);

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
			setTempProducts(response.content.slice(0, files));
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

	const filter = async (idList, isBrand, newFiles) => {
		let productList = products;
		const tempBrandsId = isBrand ? idList : brandsId;
		const tempColorsId = isBrand ? colorsId : idList;

		productList = tempBrandsId.length > 0 ? productList.filter(x => tempBrandsId.indexOf(x.brandId) != -1) : productList;
		productList = tempColorsId.length > 0 ?
			productList.filter(x =>
				tempColorsId.indexOf(x.primaryColorId) != -1 ||
				tempColorsId.indexOf(x.secondaryColorId) != -1) :
			productList = productList;

		const tempFiles = newFiles ? newFiles : files;
		await setTempProducts(productList.slice(0, tempFiles));
	}


	const showMore = async () => {
		const newFiles = files + 10;
		await setFiles(newFiles);
		await filter(brandsId, true, newFiles);
	}

	return (
		<>
			{loading &&
				<Loader />
				||
				<>
					<Link to={'/credit-info'} className="col-10 items-center center text-center" style={{ zIndex: '5', fontSize: '12px', height: '40px', color: 'white', background: '#CA2218', position: 'fixed', top: '0' }}>
						Credito a 4 meses!!!
						<br />
						<span className='col-10 center'>
							Solicita informacion
							<strong className='mx-1'>
								aqui
							</strong>

						</span>
					</Link>
					<div className="col-10 flex-wrap" style={{ marginTop: '40px' }}>
						<div className="col-md-4 spaceAround flex-wrap my-2">
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
						<div className="col-md-4 my-2 flex-wrap spaceAround">
							{brands.map(brand => (
								<label for={`brand-${brand.id}`} className="items-center justify-end my-1" style={{ width: '130px' }} key={brand.id}>
									<img height={20} src={brand.image} />
									{brand.name}
									<input id={`brand-${brand.id}`} type={'checkbox'} onChange={e => filterBrands(brand.id, e.target.checked)} />
								</label>
							))}
						</div>
					</div>
					<div className="ProductList flex-wrap center">
						{tempProducts.map(product => (
							<ProductItem product={product} key={product.id} />
						))}
					</div>

					<div className='col-10 center text-center p-2 hover' style={{ cursor: 'pointer', color: 'blue' }} onClick={() => showMore()}>
						Mostrar mas
					</div>
				</>
			}
		</>
	);
}

export default ProductList;
