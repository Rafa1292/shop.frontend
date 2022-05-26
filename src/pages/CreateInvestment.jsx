import React from 'react';
import Title from '@components/Title';
import InvestmentItem from '@components/InvestmentItem';
import { useState, useEffect } from 'react/cjs/react.development';
import { useGetList } from '../hooks/useAPI';
import Loader from '@components/Loader';
import trash from '../assets/icons/trash.png'
import { formatMoney } from '@helpers/formatHelper'

const CreateInvestment = () => {
    const [products, setProducts] = useState([]);
    const [productMoves, setProductMoves] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [loader, setLoader] = useState(true);
    const [viewOrder, setViewOrder] = useState(false);

    const loadProducts = async () => {
        const response = await useGetList('products');
        setProducts(response.data);
    }

    const loadSizes = async () => {
        const response = await useGetList('sizes');
        setSizes(response.data);
    }

    const addProductMove = (productMove) => {
        console.log(productMove)
        setProductMoves([
            ...productMoves,
            productMove
        ]);
    }

    const removeProductMove = (productMove) => {
        const tmpProductMoves = productMoves.filter(
            x => !(x.productId == productMove.productId && x.sizeId == productMove.sizeId))
        setProductMoves(tmpProductMoves)

    }

    const getProductImage = (id) => {
        const product = products.filter(x => x.id == id)
        return product[0].image;
    }

    const getProductMovesFromProduct = (productId) => {
        let tmpProductMoves = [];
        if (productMoves.length > 0) {
            for (const productMove of productMoves) {
                if (productMove.productId == productId) {
                    tmpProductMoves = [
                        ...tmpProductMoves,
                        productMove
                    ]
                }
            }
        }
        return tmpProductMoves;
    }

    const getSizeName = (id) => {
        let name = '';
        sizes.forEach(size => {
            if (size.id == id) {
                name = size.name;
            }
        })
        return name;
    }

    useEffect(async () => {
        await loadProducts();
        await loadSizes();
        setLoader(false);
    }, []);
    return (
        <div className="col-10 center">

            <Title title="Agregar inversion" />
            <div className="col-10 center fit-content">
                <button className='btn' onClick={() => setViewOrder(!viewOrder)}>Carrito</button>
            </div>
            {loader &&
                <Loader />
                ||
                !viewOrder &&
                products.map(product => (
                    <InvestmentItem key={product.id} addProductMove={addProductMove}
                        productMoves={getProductMovesFromProduct(product.id)}
                        allSizes={sizes} product={product} removeProductMove={removeProductMove} />
                ))
                ||
                productMoves.map(productMove => (
                    <div className="col-10 m-0 center" key={`${productMove.productId}${Math.random(1, 1000)}`}>
                        <span className='col-2 center'>
                            <img src={getProductImage(productMove.productId)} height="80" />
                        </span>
                        <span className='col-1 content-center center'>{productMove.quantity}</span>
                        <span className='col-2 content-center center'>{getSizeName(productMove.sizeId)}</span>
                        <span className='col-2 content-center center'>{formatMoney(productMove.cost)}</span>
                        <span className='col-2 content-center center'>{formatMoney(productMove.cost * productMove.quantity)}</span>
                        <span className='col-1 content-center center' onClick={() => removeProductMove(productMove)}>
                            <img src={trash} height="25" style={{ opacity: '0.5' }} />
                        </span>
                    </div>
                ))
            }

            {
            }
        </div>
    );
}

export default CreateInvestment;