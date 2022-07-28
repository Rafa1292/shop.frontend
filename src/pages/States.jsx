import Title from '@components/Title';
import '@styles/States.scss';
import { useGetList, usePost, useDelete, usePatch } from '../hooks/useAPI';
import React, { useRef, useState, useEffect } from "react";


const States = () => {
    let [states, setStates] = useState([]);
    const [editId, setEditId] = useState(0);

    let nameInput = useRef();
    let nameEditInput = useRef();

    useEffect(async () => {
        await loadStates();
    }, []);

    const handleClickPost = async () => {
        const response = await usePost('states', { name: nameInput.current.value });
        if (!response.error) {
            loadStates();
            nameInput.current.value = null;
        }
    };

    const loadStates = async () => {
        const response = await useGetList('states');

        if (!response.error) {
            setStates(response.content);            
        }
    };

    const handleClickPatch = async (id) => {
        const response = await usePatch(`states/${id}`, { name: nameEditInput.current.value });

        if (!response.error) {
            loadStates();
            nameInput.current.value = null;
            setEditId(0);
        }
    };

    return (
        <div className="state-index">
            <Title title="Lista de estados"></Title>
            <div className='add-state-container my-2 col-sm-10 center'>
                <span className='col-sm-10 center'>
                    <input type="text" placeholder="Nuevo estado" className="input" ref={nameInput} />
                </span>
                <span className='my-2 center'>
                    <input type='button' className='btn mx-2' value='Agregar' onClick={handleClickPost} />
                </span>
            </div>
            <div className="state-index-container">
                {states.map(state => (
                    <div className="state-index-item col-sm-6 center" key={state.id}>
                        {
                            editId == state.id
                            &&
                            <>
                                <span className='col-3 center'>
                                    <input type="text" className="input col-10" defaultValue={state.name} ref={nameEditInput} />
                                </span>
                                <span className='col-3 mx-2 center'>
                                    <input className='btn success col-10' type="button" value='Cambiar' onClick={() => handleClickPatch(state.id)} />
                                </span>
                                <span className='col-3 center'>
                                    <input className='btn danger col-10' type="button" value='X' onClick={() => setEditId(0)} />
                                </span>
                            </>
                            ||
                            <>
                                <span className='col-3 center'>{state.name}</span>
                                <span className='center'>
                                    <input className='btn mx-2' type="button" value='Editar' onClick={() => setEditId(state.id)} />
                                </span>
                            </>
                        }


                    </div>
                ))}
            </div>
        </div>
    );
}

export default States;