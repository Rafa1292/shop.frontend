import React from 'react';
import '@styles/Products.scss';
import Title from '@components/Title';

const Products = () => {
    return (
        <div className='product-index'>
            <Title title="Lista de productos"></Title>
            <div className="product-index-container">
                <div className="product-index-item">
                    <span className='col-1 center'>
                        <img className='product-index-item-img' src='https://cdn.lorem.space/images/shoes/.cache/640x480/luis-felipe-lins-J2-wAQDckus-unsplash.jpg'></img>
                    </span>
                    <span className='col-1 center'>Nike 16</span>
                    <span className='col-1 center'>¢40,000</span>
                    <span className='col-2 center'>Tennis Hombre</span>
                    <span className='item-colors-container col-1 center'>
                        <div Style="margin: 0px 2px; border: 1px solid gray; width: 25px; background: orange; height: 25px;"></div>
                        <div Style="margin: 0px 2px; border: 1px solid gray; width: 25px; background: white; height: 25px;"></div>
                    </span>
                    <span className='center col-2'>
                        <input type="checkbox" id='isValid' />
                        <label className='mx-2' for='isValid'>Está activo?</label>
                    </span>
                    <span className='col-2 center'>
                        <input className='btn success' type="button" value='Editar' />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Products;