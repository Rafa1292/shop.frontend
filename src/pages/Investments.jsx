import React from 'react';
import { useGetList } from '../hooks/useAPI';
import { useState, useEffect } from 'react/cjs/react.development';
import Title from '@components/Title';
import { formatMoney } from '@helpers/formatHelper'
import { Link } from "react-router-dom";

const Investments = () => {
    const [investments, setInvestments] = useState([]);
    const detailReducer = (accumulator, currentValue) => accumulator + currentValue.productMove.cost;
    const historyReducer = (accumulator, currentValue) => accumulator + currentValue.amount;
    const loadInvestments = async () => {
        const response = await useGetList('investments');
        setInvestments(response.data)
    }

    useEffect(async () => {
        await loadInvestments();
    }, []);

    return (
        <div className="col-10 center">
            <Title title="Inversiones" />
            <div className="col-10 justify-around p-2 d-flex">
                <Link  className='btn col-8 success-outline center' to='investments/create' >Agregar</Link>
            </div>
            {investments.map(investment => (
                <div style={{ borderBottom: '1px solid rgba(0,0,0,.1)' }}
                    className="col-10 py-2 center" key={investment.id}>
                    <div className="col-3">
                        {new Date(investment.createdAt).toLocaleDateString()}
                    </div>
                    <div className="col-3">
                        {formatMoney(investment.details.reduce(detailReducer, 0))}
                    </div>
                    <div className="col-3">
                        {(investment.histories.reduce(historyReducer, 0) -
                            formatMoney(investment.details.reduce(detailReducer, 0))) != 0 &&
                            <button className='btn col-8 black-outline'>Detalles</button>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Investments;