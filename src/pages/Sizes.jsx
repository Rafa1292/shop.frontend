import Title from '@components/Title';
import '@styles/Sizes.scss';
import { useGetList, usePost, useDelete, usePatch } from '../hooks/useAPI';
import React, { useRef, useState, useEffect } from "react";


const Sizes = () => {
    let [sizes, setSizes] = useState([]);
    const [editId, setEditId] = useState(0);

    let nameInput = useRef();
    let nameEditInput = useRef();

    useEffect(async () => {
        await loadSizes();
    }, []);

    const handleClickPost = async () => {
        const response = await usePost('sizes', { name: nameInput.current.value});
        if (!response.error) {
            loadSizes();
            nameInput.current.value = null;
        }
    };

    const handleClickDelete = async (id) => {
        const response = await useDelete(`sizes/${id}`);
        if (!response.error) {
            loadSizes();
        }
    };

    const loadSizes = async () => {
        const response = await useGetList('sizes');

        if (!response.error) {
            setSizes(response.content);            
        }
    };

    const handleClickPatch = async (id) => {
        const response = await usePatch(`sizes/${id}`, { name: nameEditInput.current.value });

        if (!response.error) {
            loadSizes();
            nameInput.current.value = null;
            setEditId(0);
        }
    };

    return (
        <div className="size-index col-md-4">
            <Title title="Lista de tamaños"></Title>
            <div className='add-size-container my-2 col-sm-10 center'>
                <span className='col-10 center'>
                    <input type="text" placeholder="Nuevo tamaño" className="input" ref={nameInput} />
                </span>
                <span className='my-2 center'>
                    <input type='button' className='btn mx-2' value='Agregar' onClick={handleClickPost} />
                </span>
            </div>
            <div className="size-index-container">
                {sizes.map(size => (
                    <div className="size-index-item col-sm-6 flex-wrap center" key={size.id}>
                        {
                            editId == size.id
                            &&
                            <>
                                <span className='col-3 center'>
                                    <input type="text" className="input col-10" defaultValue={size.name} ref={nameEditInput} />
                                </span>
                                <span className='col-3 mx-2 center'>
                                    <input className='btn success col-10' type="button" value='Cambiar' onClick={() => handleClickPatch(size.id)} />
                                </span>
                                <span className='col-3 center'>
                                    <input className='btn danger col-10' type="button" value='X' onClick={() => setEditId(0)} />
                                </span>
                            </>
                            ||
                            <>
                                <span className='col-3 center'>{size.name}</span>
                                <span className=' col-3 m-1 center'>
                                    <input className='btn text-center center' type="button" value='Editar' onClick={() => setEditId(size.id)} />
                                </span>
                                <span className='col-3 center'>
                                    <input className='btn danger' type="button" value='Eliminar' onClick={() => handleClickDelete(size.id)} />
                                </span>
                            </>
                        }


                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sizes;