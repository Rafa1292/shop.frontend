import React, { useState, useEffect } from 'react';
import '@styles/Products.scss';
import Title from '@components/Title';
import { useGetList } from '../hooks/useAPI';
import {formatMoney} from '@helpers/formatHelper';

const Products = () => {
    let [products, setProducts] = useState([]);
    const [colors, setColors] = useState([]);

    useEffect(async () => {
        await loadColors();
        await loadProducts();
    }, []);

    const loadProducts = async () => {
        const response = await useGetList('products');

        if (!response.error) {
            setProducts(response.content);            
        }
    };
    
    const loadColors = async () => {
        const response = await useGetList('colors');

        if (!response.error) {
            setColors(response.content);            
        }
    };

    const getColor = (id)=>{
        const color = colors.find( color =>{
            return color.id === id;
        });
        return color.name;
    }

    return (
        <div className='product-index col-md-6'>
            <Title title="Lista de productos" addRef="products/create"></Title>
            <div className="product-index-container">
                {products.map(product => (
                    <div className="product-index-item center" key={product.id}>
                        <span className='col-sm-1 center'>
                            <img className='product-index-item-img' src={product.image}></img>
                        </span>
                        <span className='col-sm-1 m-1 center'>{product.brand.name}</span>
                        <span className='col-sm-1 m-1 center'>{product.name}</span>
                        <span className='col-sm-1 m-1 center'>{formatMoney(product.price)}</span>
                        <span className='col-sm-1 m-1 center'>{product.subcategory.category.name} {product.subcategory.name}</span>
                        <span className='center col-sm-2 m-1'>
                            <input type="checkbox" id='isValid' />
                            <label className='mx-2' htmlFor='isValid'>Está activo?</label>
                        </span>
                        <span className='item-colors-container col-sm-1 m-1 center'>
                            <div className='item-colors' style={{ background: getColor(product.primaryColorId) }}></div>
                            <div className='item-colors' style={{ background: getColor(product.secondaryColorId) }}></div>
                        </span>
                        <span className='col-sm-1 center'>
                            <a className='btn success' type="button" href={`/products/update/${product.id}`}>Editar</a>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;