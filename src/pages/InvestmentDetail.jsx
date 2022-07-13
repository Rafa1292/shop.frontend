import React, { useEffect, useState, useRef } from 'react'
import Title from '@components/Title';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useGet, useGetList, usePost } from '../hooks/useAPI';
import { formatMoney } from '@helpers/formatHelper'
import '@styles/InvestmentDetail.scss';
import upArrow from '@icons/upArrow.png'

const InvestmentDetail = () => {
    const [showDetails, setShowDetails] = useState(false)
    const [showResume, setShowResume] = useState(false)
    const [showPaymethods, setShowPaymethods] = useState(false)
    const { investmentId } = useParams();
    const [investment, setInvestment] = useState({ details: [], histories: [] });
    const [sizes, setSizes] = useState([]);
    const [paymethods, setPaymethods] = useState([]);
    const [products, setProducts] = useState([]);
    const [paymethodId, setPaymethodId] = useState(0);
    const amount = useRef(0);

    const reducer = (accumalator, currentValue) => accumalator + (currentValue.productMove.cost * currentValue.productMove.quantity);
    const historyReducer = (accumalator, currentValue) => accumalator + (currentValue.accountHistory.amount);
    const quantityReducer = (accumalator, currentValue) => accumalator + currentValue.productMove.quantity;

    const getInvestment = async () => {
        const response = await useGet(`investments/${investmentId}`);
        console.log(response);
        setInvestment(response.data)
    }

    const loadPaymethods = async (id) => {
        const response = await useGetList(`paymethods`);
        setPaymethods(response.data);
    };

    const loadProducts = async () => {
        const response = await useGetList('products');
        setProducts(response.data);
    }

    const loadSizes = async () => {
        const response = await useGetList('sizes');
        setSizes(response.data);
    }

    const getPaymethodName = (id) => {
        let name = '';
        paymethods.forEach(pm => {
            if (pm.id == id) {
                name = pm.name;
            }
        })
        return name;
    }

    const sendPay = async () => {
        if ((getDue() - amount.current.value) < 0) {
            console.log('monto invalido')
        }
        else {
            const investmentAccountHistory = {
                amount: amount.current.value,
                investmentId: investmentId,
                accountHistory: {
                    amount: amount.current.value,
                    paymethodId: paymethodId,
                    debit: true
                }
            };
            const response = await usePost('investmentAccountHistories', investmentAccountHistory);

            if (response.status == 201) {
                amount.current.value = 0;
                setPaymethodId(0);
                await getInvestment();
            }
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

    const getDue = () => {
        const investmentDue = investment.details.reduce(reducer, 0);
        const investmentPayDue = investment.histories.reduce(historyReducer, 0);
        return investmentDue - investmentPayDue;
    }

    const getProductImage = (id) => {
        const product = products.filter(x => x.id == id)
        return product[0].image;
    }

    useEffect(async () => {
        await loadSizes();
        await loadProducts();
        await loadPaymethods();
        await getInvestment();
    }, [])

    return (
        <div className="col-10 center">
            <Title title="Inversion" />
            <div className="col-10 justify-between border-bottom p-2 d-flex content-center secondary" onClick={() => setShowDetails(!showDetails)}>
                Detalles
                <img src={upArrow} height="20" style={{ transition: 'all ease 500ms', transform: showDetails ? '' : 'rotate(180deg)', opacity: '0.3' }} />
            </div>
            <div style={{ alignContent: 'baseline' }} className={`col-10  flex-wrap showOption py-2 ${showDetails ? '' : 'hideOption'}`}>

                {investment.details.map(detail => (
                    <div style={{ borderBottom: '1px solid rgba(0,0,0,.1)' }} className="col-10 m-0 p-0 center" key={`${detail.productMove.productId}${Math.random(1, 1000)}`}>
                        <span className='col-2 center'>
                            <img src={getProductImage(detail.productMove.productId)} height="80" />
                        </span>
                        <span className='col-2 content-center center'>{detail.productMove.quantity}</span>
                        <span className='col-1 content-center center'>{getSizeName(detail.productMove.sizeId)}</span>
                        <span className='col-2 content-center center'>{formatMoney(detail.productMove.cost)}</span>
                        <span className='col-3 content-center center'>{formatMoney(detail.productMove.cost * detail.productMove.quantity)}</span>
                    </div>
                ))}
            </div>
            <div className=" justify-between col-10 border-bottom p-2 secondary content-center d-flex" onClick={() => setShowResume(!showResume)}>
                Resumen
                <img src={upArrow} height="20" style={{ transition: 'all ease 500ms', transform: showResume ? '' : 'rotate(180deg)', opacity: '0.3' }} />
            </div>
            <div className={`col-10 content-center flex-wrap showOption py-2 ${showResume ? '' : 'hideOption'}`}>
                <div className="col-7 px-1 justify-end d-flex">Monto cancelado:</div>
                <div className="col-3 px-1 justify-start d-flex">{formatMoney(investment.histories.reduce(historyReducer, 0))}</div>
                <div className="col-7 p-1 justify-end d-flex">Monto total:</div>
                <div className="col-3 p-1  justify-start d-flex">{formatMoney(investment.details.reduce(reducer, 0))}</div>
                <div className="col-7 px-1 justify-end d-flex">Cantidad articulos:</div>
                <div className="col-3 px-1 justify-start d-flex">{investment.details.reduce(quantityReducer, 0)}</div>
            </div>
            <div className=" justify-between col-10 border-bottom p-2 secondary content-center d-flex" onClick={() => setShowPaymethods(!showPaymethods)}>
                Formas de pago
                <img src={upArrow} height="20" style={{ transition: 'all ease 500ms', transform: showPaymethods ? '' : 'rotate(180deg)', opacity: '0.3' }} />
            </div>
            <div style={{ alignContent: 'baseline' }} className={`col-10 content-center flex-wrap showOption py-2 ${showPaymethods ? '' : 'hideOption'}`}>

                {investment.histories.map(history => (
                    <div key={history.id} className="col-10 flex-wrap center">

                        <small className="col-3 py-2 center ">{new Date(history.createdAt).toLocaleDateString()}</small>
                        <small className="col-3 py-2 center ">{formatMoney(history.amount)}</small>
                        <small className="col-3 py-2 center ">
                            {getPaymethodName(history.accountHistory.paymethodId)}
                        </small>
                    </div>
                ))}

                {getDue() > 0 &&
                    <>
                        <span className='col-10 p-1 center'>
                            <input type='number' ref={amount} id='amount' placeholder='Monto' className='input col-10' />
                        </span>
                        <span className='col-10 p-1 center'>
                            <select className='input p-2' onChange={(event) => setPaymethodId(event.target.value)}>
                                <option value="0">Seleccione una forma de pago</option>
                                {
                                    paymethods.map(paymethod => (
                                        <option key={paymethod.id} value={paymethod.id}>{paymethod.name}</option>
                                    ))
                                }
                            </select>
                        </span>
                        <div className="col-10 center my-2">
                            <button onClick={() => sendPay()} className='btn success'>Agregar</button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default InvestmentDetail;