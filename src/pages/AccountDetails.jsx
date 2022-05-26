import React, { useState, useEffect, useRef } from 'react';
import Title from '@components/Title';
import { useGet, usePost } from '../hooks/useAPI';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { formatMoney } from '@helpers/formatHelper'

const AccountDetails = () => {
    const [account, setAccount] = useState({ paymethods: [] });
    const [paymethodId, setPaymethodId] = useState(0);
    const [lastHistory, setLastHistory] = useState({ newBalance: 0 });
    const [accountHistories, setAccountHistories] = useState([]);
    const [entryForm, setEntryForm] = useState(false);
    const [costForm, setCostForm] = useState(false);
    const { accountId } = useParams();
    const amount = useRef(0);
    const description = useRef(0);
    const reducer = (accumalator, currentValue) => currentValue.debit ?
        accumalator - currentValue.amount :
        accumalator + currentValue.amount;

    const loadAccount = async () => {
        const response = await useGet(`accounts/${accountId}`);
        let tempAccountHistories = [];
        response.data.paymethods.map(paymethod => {
            tempAccountHistories = tempAccountHistories.concat(paymethod.histories)
        })
        setAccountHistories(tempAccountHistories.sort((a, b) => b.id - a.id));
        setLastHistory(tempAccountHistories[0]);
        setAccount(response.data);
    };

    const sendEntry = async () => {
        const response = await usePost('entries', {
            accountHistory: {
                paymethodId: paymethodId,
                amount: parseInt(amount.current.value),
                debit: false
            }
        });

        if(response.status === 201){
            resetForm();
            await loadAccount();
        }
    }

    const sendCost = async () => {
        const response = await usePost('costs', {
            description: description.current.value,
            accountHistory: {
                paymethodId: paymethodId,
                amount: parseInt(amount.current.value),
                debit: true
            }
        });

        if(response.status === 201){
            resetForm();
            await loadAccount();
        }
    }

    const resetForm = () => {
        setCostForm(false);
        setEntryForm(false);
    }

    const handleCost = () => {
        setCostForm(true);
        setEntryForm(false);
    }

    const handleEntry = () => {
        setCostForm(false);
        setEntryForm(true);
    }

    useEffect(async () => {
        await loadAccount();
    }, []);

    return (
        <div className="col-10 flex-wrap">
            <Title title="Detalle de  cuenta"></Title>
            <h2 className='col-10 center generic-title p-0'>{account.name}</h2>
            <div className="col-10 justify-around p-2 d-flex">
                <button className='btn col-4 black-outline' onClick={() => handleCost()}>Retiro</button>
                <button className='btn col-4 success-outline' onClick={() => handleEntry()}>Ingreso</button>
            </div>
            <div className="col-10 center d-flex">
                {(entryForm || costForm) &&
                    <>
                        <div className='col-10 p-1 center'>
                            <select className='input col-8 p-2' onChange={(event) => setPaymethodId(event.target.value)}>
                                <option value="0">Seleccione una forma de pago</option>
                                {
                                    account.paymethods.map(paymethod => (
                                        <option key={paymethod.id} value={paymethod.id}>{paymethod.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-10 p-1 center">
                            <input ref={amount} className='input col-8' type='number' placeholder='Monto' />
                        </div>
                    </>
                }
                {entryForm &&
                    <div className="col-10 justify-around p-2 d-flex">
                        <button className='btn col-8 success' onClick={() => sendEntry()}>Enviar</button>
                    </div>
                }
                {costForm &&
                    <div className="col-10 p-1 center">
                        <input ref={description} className='input col-8' type='text' placeholder='Descripcion' />
                        <div className="col-10 justify-around p-2 d-flex">
                            <button className='btn col-4 success' onClick={() => sendCost()}>Enviar</button>
                        </div>
                    </div>
                }



            </div>
            <div className="col-10 d-flex secondary p-2">
                {
                    account.paymethods.map(paymethod => (
                        <div className='col-10 justify-end d-flex' key={paymethod.id}>
                            <small className='mx-2'>{paymethod.name}</small>
                            {formatMoney(paymethod.histories.reduce(reducer, 0))}
                        </div>
                    ))
                }
                <strong style={{fontSize: '20px'}} className='col-10 d-flex justify-end my-2'>Saldo {formatMoney(lastHistory.newBalance)}</strong>
            </div>

            {accountHistories.map(history => (
                <div className='col-10 flex-wrap center p-2' style={{ borderBottom: '1px solid rgba(0,0,0,.1)' }} key={history.id}>
                    <span className='col-10 d-flex justify-end '>{history.debit ? 'Retiro de' : 'ingreso de'} {formatMoney(history.amount)}</span>
                    <div className="col-sm-5 flex-wrap py-2">
                        <div className="col-10 justify-between d-flex">
                            <small className='px-2 col-7 d-flex justify-end'>
                                Saldo actual
                            </small>
                            {formatMoney(history.newBalance)}
                        </div>
                        <div className="col-10 justify-between d-flex">
                            <small className='px-2 col-7 d-flex justify-end'>
                                Saldo anterior
                            </small>
                            {formatMoney(history.previousBalance)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AccountDetails;