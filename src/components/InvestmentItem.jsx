import React from 'react';
import { useState, useEffect, useRef } from 'react/cjs/react.development';
import trash from '../assets/icons/trash.png'
import { formatMoney } from '@helpers/formatHelper'

const InvestmentItem = ({ product, allSizes, removeProductMove, addProductMove, productMoves = [] }) => {
    const quantity = useRef(0);
    const cost = useRef(0);
    const [sizeId, setSizeId] = useState();
    const [sizes, setSizes] = useState([]);

    const sendProductMove = () => {
        if (sizeId > 0 && quantity.current.value > 0 && cost.current.value > 0) {

            const productMove = {
                quantity: quantity.current.value,
                unitPrice: 0,
                productId: product.id,
                sizeId: sizeId,
                exit: false,
                cost: cost.current.value
            };
            addProductMove(productMove)
            setSizes(sizes.filter(size => size.id != sizeId))
            setSizeId(0);
            quantity.current.value = 0;
            cost.current.value = 0;
        }
    }

    const handleRemoveProductMove = (productMove) => {
        let newSize = {};
        allSizes.forEach(tmpSize => {
            if(tmpSize.id == productMove.sizeId){
                newSize = tmpSize
            }
        });
        let tmpSizes = [
            ...sizes,
            newSize
        ];
        setSizes(tmpSizes.sort((a, b) => parseInt(a.name) - parseInt(b.name)))
        removeProductMove(productMove);
    }

    const getSizeName = (id) => {
        let name = '';
        allSizes.forEach(size => {
            if(size.id == id){
                name = size.name;
            }
        })
        return name;
    }
    useEffect(async () => {
        let tmpSizes = JSON.parse(JSON.stringify(allSizes));
        const sizesId = productMoves.map(x => parseInt(x.sizeId));
        tmpSizes = tmpSizes.filter(size => sizesId.indexOf(size.id) < 0)
        setSizes(tmpSizes);

    }, []);

    return (
        <div style={{ borderBottom: '1px solid rgba(0,0,0,.1)' }} className="col-10 p-1 center my-1">
            <div className="col-10 center p-2">
                <img src={product.image} height='90' />
            </div>
            <div className="col-2 items-center center d-flex p-1">
                <small style={{ textAlign: 'center', fontSize: '12px' }}>
                    {product.name}
                </small>
            </div>
            <div className="col-2 items-center center d-flex p-0">
                <input ref={quantity} className='input col-8' placeholder='Cant' type="number" />
            </div>
            <div className="col-2 items-center center d-flex p-0">
                <input ref={cost} className='input col-10' placeholder='Costo' />
            </div>
            <div className="col-2 items-center center d-flex p-0">
                <select style={{ height: '40px' }} className='input col-8 p-2' onChange={(event) => setSizeId(event.target.value)}>
                    <option key={0} value="0">Tallas</option>
                    {
                        sizes.map(size => (
                            <option key={size.id} value={size.id}>{size.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="col-1 items-center center d-flex p-1">
                <button className='btn success' onClick={sendProductMove}>+</button>
            </div>
            {
                productMoves.map(productMove => (
                    <div className="col-10 my-2 center" key={`${productMove.productId}${Math.random(1, 1000)}`}>
                        <span className='col-1 content-center center'>{productMove.quantity}</span>
                        <span className='col-2 content-center center'>{getSizeName(productMove.sizeId)}</span>
                        <span className='col-3 content-center center'>{formatMoney(productMove.cost)}</span>
                        <span className='col-3 content-center center'>{formatMoney(productMove.cost * productMove.quantity)}</span>
                        <span className='col-1 center' onClick={() => handleRemoveProductMove(productMove)}>
                            <img src={trash} height="25" style={{ opacity: '0.5' }} />
                        </span>
                    </div>
                ))}
        </div>
    );
}

export default InvestmentItem;