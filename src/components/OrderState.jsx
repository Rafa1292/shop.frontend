import React, { useState } from 'react'
import { formatMoney } from '@helpers/formatHelper'
import upArrow from '@icons/upArrow.png'
import { usePatch } from '../hooks/useAPI';

const OrderState = ({ order, states = [], refresh }) => {
    const itemReducer = (accumulator, curr) => accumulator + (curr.productMove.cost * curr.productMove.quantity);
    const [stateId, setStateId] = useState(0)
    const [showItems, setShowItems] = useState(false)

    const handleCategoryChange = async (event) => {
        await setStateId(event.target.value);
    };

    const changeState = async () => {
        let data = { stateId: stateId };
        const state = states.find(state => state.name.toLowerCase() === 'entregado');

        if (state.id == stateId) {
            data = {
                ...data,
                delivered: true
            }
        }
        const response = await usePatch(`orders/${order.id}`, data)
        if (response.status == 200) {
            refresh();
            setStateId(0)
        }
        console.log(response)
        if (response.status == 206) {
            alert(response.data)
            await refresh();
        }
    }

    return (
        <div className="col-md-6 center my-1 p-1" key={order.id}
            style={{ border: '1px solid lightgray', borderRadius: '10px' }}>
            <div className="col-6 flex-wrap">
                <strong className="col-10 py-1">
                    {order.customer.name}
                </strong>
                <span className=" col-10">
                    {formatMoney(order.items.reduce(itemReducer, 0))}
                </span>
                <small className=" py-1 col-10">
                    {new Date(order.createdAt).toLocaleDateString()}
                </small>
            </div>
            <div className="col-4 items-center flex-wrap">
                <div className="col-10 justify-end">
                    {stateId > 0 &&
                        <button
                            style={{
                                fontSize: '10px'
                            }}
                            className='btn col-10'
                            onClick={changeState}>
                            Actualizar
                        </button>
                    }
                </div>
                <strong className="justify-end col-10">
                    <select onChange={handleCategoryChange}>
                        {
                            states.map(state => (
                                state.id == order.stateId
                                &&
                                <option selected value={state.id} key={state.id}>
                                    {state.name}
                                </option>
                                ||
                                <option value={state.id} key={state.id}>
                                    {state.name}
                                </option>
                            ))
                        }
                    </select>
                </strong>
            </div>
            <div className=" justify-between col-10 border-bottom p-2 content-center d-flex" onClick={() => setShowItems(!showItems)}>
                Productos
                <img src={upArrow} height="20" style={{ transition: 'all ease 500ms', transform: showItems ? '' : 'rotate(180deg)', opacity: '0.3' }} />
            </div>
            <div style={{ alignContent: 'baseline' }} className={`d-flex col-10 content-center flex-wrap showOption py-2 ${showItems ? '' : 'hideOption'}`}>
                {order.items.map(item => (
                    <div style={{ borderBottom: '1px solid rgba(0,0,0,.1)' }} className="col-10 m-0 p-0 center" key={`${item.productMove.productId}${Math.random(1, 1000)}`}>
                        <span className='col-2 center'>
                            <img src={item.productMove.product.image} height="80" />
                        </span>
                        <span className='col-1 content-center center'>{item.productMove.quantity}</span>
                        <span className='col-2 content-center center'>{item.productMove.size.name}</span>
                        <span className='col-2 content-center center'>{formatMoney(item.productMove.cost)}</span>
                        <span className='col-3 content-center center'>{formatMoney(item.productMove.cost * item.productMove.quantity)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderState;