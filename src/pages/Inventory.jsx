import React, { useEffect, useState } from 'react';
import { usePost, useGetList } from '../hooks/useAPI';
import '@styles/Inventory.scss';

const Inventory = () => {
    const [inventory, setInventory] = useState({ productInventories: [] });
    let [products, setProducts] = useState([]);
    let [sizes, setSizes] = useState([]);

    const getInventory = async () => {
        const response = await usePost('inventories');

        if (!response.error) {
            await setInventory(response.content);
        }
    }

    const getProductImage = (id) => {
        const product = products.find(x => x.id == id);
        if (product) {
            return product.image
        }
    }

    const loadSizes = async () => {
        const response = await useGetList('sizes');

        if (!response.error) {
            setSizes(response.content);            
        }
    };

    const getSizeName = (id)=> {
        const size = sizes.find(x => x.id == id);
        if (size) {
            return size.name
        }
    }

    const loadProducts = async () => {
        const response = await useGetList('products');
        if (!response?.error) {
            setProducts(response.content);
        }
    };

    useEffect(async () => {
        await getInventory();
        await loadProducts();
        await loadSizes();
    }, []);

    return (
        <>
            <div className="col-10 center my-2 text-center">
                <strong className='my-2'>Inventario</strong>
                <div className="col-10 center my-2">
                    <span className='col-10'>
                        <small className='m-1'>Desde:</small>
                        <strong>{new Date(inventory.from).toLocaleDateString()}</strong>
                    </span>
                    <span className='col-10'>
                        <small className='m-1'>Hasta:</small>
                        <strong>{new Date(inventory.to).toLocaleDateString()}</strong>
                    </span>
                </div>
                <div className="col-10 flex-wrap">
                    <div className="col-2 center"></div>
                    <small className="col-1 center">Talla</small>
                    <small className="col-2 center">Inicial</small>
                    <small className="col-2 center">Pedido</small>
                    <small className="col-2 center">Vendido</small>
                    <small className="col-1 center">Final</small>
                    {
                        inventory.productInventories.map((product, index) => (
                            <div className={`col-10 items-center ${index % 2 == 0 ? "inventory-item" : "inventory-item-dark"} center py-1`} style={{ borderBottom: '1px solid rgba(0,0,0,.2)' }} key={`${product.productId}${product.sizeId}`}>
                                <div className="col-2 center">                                    
                                    <img src={getProductImage(product.productId)} height={50} />
                                </div>
                                <div className="col-1 center">{getSizeName(product.sizeId)}</div>
                                <div className="col-2 center">{product.initialQuantity}</div>
                                <div className="col-2 center">{product.addedQuantity}</div>
                                <div className="col-2 center">{product.selledQuantity}</div>
                                <div className="col-1 center">{product.finalQuantity}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Inventory;