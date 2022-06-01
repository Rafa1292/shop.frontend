import React from 'react';
import Title from '@components/Title';
import InvestmentItem from '@components/InvestmentItem';
import { useState, useEffect } from 'react/cjs/react.development';
import { useGetList, usePost } from '../hooks/useAPI';
import Loader from '@components/Loader';
import trash from '../assets/icons/trash.png'
import { formatMoney } from '@helpers/formatHelper'
import { useHistory } from "react-router-dom"

const CreateInvestment = () => {
    const [products, setProducts] = useState([]);
    const [productMoves, setProductMoves] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [loader, setLoader] = useState(true);
    const [viewOrder, setViewOrder] = useState(false);
    const history = useHistory();
    const reducer = (accumalator, currentValue) => accumalator + (currentValue.cost * currentValue.quantity);

    const loadProducts = async () => {
        const response = await useGetList('products');
        setProducts(response.data);
    }

    const loadSizes = async () => {
        const response = await useGetList('sizes');
        setSizes(response.data);
    }

    const addProductMove = (productMove) => {
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

    const sendInvestment = async () => {
        let details = productMoves.map(pm => {
            return {
                productMove: pm
            }
        });
        const newInvestment = {
            investBy: 1,
            details: details
        }

        const response = await usePost('investments', newInvestment);
        if(response.status == 201){
            console.log(response.data)
            history.push(`/investments/${response.data.id}`)
            //redireccionar a detalle
        }
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
        <div className="col-10 center" style={{ paddingBottom: '100px' }}>

            <Title title="Agregar inversion" />
            <div className="col-10 center fit-content">
                <button className='btn' onClick={() => setViewOrder(!viewOrder)}>{viewOrder ? 'Productos' : 'Carrito'}</button>
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
                <>
                    {productMoves.map(productMove => (
                        <div className="col-10 m-0 center" key={`${productMove.productId}${Math.random(1, 1000)}`}>
                            <span className='col-2 center'>
                                <img src={getProductImage(productMove.productId)} width="60" height="80" />
                            </span>
                            <span className='col-1 content-center center'>{productMove.quantity}</span>
                            <span className='col-1 content-center center'>{getSizeName(productMove.sizeId)}</span>
                            <span className='col-2 content-center center'>{formatMoney(productMove.cost)}</span>
                            <span className='col-3 content-center center'>{formatMoney(productMove.cost * productMove.quantity)}</span>
                            <span className='col-1 content-center center' onClick={() => removeProductMove(productMove)}>
                                <img src={trash} height="25" style={{ opacity: '0.5' }} />
                            </span>
                        </div>
                    ))}

                    <div className='col-10 center py-2' style={{ boxShadow: '0 0 10px 1px rgb(0,0,0,.2)', background: 'white', position: 'absolute', bottom: '0px' }}>
                        <span className='col-10 my-2 center'>Total: {formatMoney(productMoves.reduce(reducer, 0))}</span>
                        <button onClick={() => sendInvestment()} className='btn success'>Enviar</button>
                    </div>
                </>
            }

            {
            }
        </div>
    );
}

export default CreateInvestment;