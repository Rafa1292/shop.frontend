import Title from '@components/Title';
import '@styles/Colors.scss';
import { useGetList, usePost, useDelete, usePatch } from '../hooks/useAPI';
import React, { useRef, useState, useEffect } from "react";


const Colors = () => {
    let [colors, setColors] = useState([]);
    const [editId, setEditId] = useState(0);

    let nameInput = useRef();
    let nameEditInput = useRef();

    useEffect(async () => {
        await loadColors();
    }, []);

    const handleClickPost = async () => {
        const response = await usePost('colors', { name: nameInput.current.value});
        if (!response.error) {
            loadColors();
            nameInput.current.value = null;
        }
    };

    const handleClickDelete = async (id) => {
        const response = await useDelete(`colors/${id}`);
        if (!response.error) {
            loadColors();
        }
    };

    const loadColors = async () => {
        const response = await useGetList('colors');

        if (!response.error) {
            setColors(response.content);            
        }
    };

    const handleClickPatch = async (id) => {
        const response = await usePatch(`colors/${id}`, { name: nameEditInput.current.value });

        if (!response.error) {
            loadColors();
            nameInput.current.value = null;
            setEditId(0);
        }
    };

    return (
        <div className="color-index col-md-4">
            <Title title="Lista de colores"></Title>
            <div className='add-color-container my-2 col-sm-10 center'>
                <span className='col-10 center'>
                    <input type="text" placeholder="Nuevo color" className="input" ref={nameInput} />
                </span>
                <span className='my-2 center'>
                    <input type='button' className='btn mx-2' value='Agregar' onClick={handleClickPost} />
                </span>
            </div>
            <div className="color-index-container flex-wrap">
                {colors.map(color => (
                    <div className="color-index-item col-sm-6 center" key={color.id}>
                        {
                            editId == color.id
                            &&
                            <>
                                <span className='col-3 center'>
                                    <input type="text" className="input col-10" defaultValue={color.name} ref={nameEditInput} />
                                </span>
                                <span className='col-3 mx-2 center'>
                                    <input className='btn success col-10' type="button" value='Cambiar' onClick={() => handleClickPatch(color.id)} />
                                </span>
                                <span className='col-3 center'>
                                    <input className='btn danger col-10' type="button" value='X' onClick={() => setEditId(0)} />
                                </span>
                            </>
                            ||
                            <>
                                <span className='col-3 center'>{color.name}</span>
                                <span className='center col-3 m-1'>
                                    <input className='btn mx-2' type="button" value='Editar' onClick={() => setEditId(color.id)} />
                                </span>
                                <span className='col-3 center'>
                                    <input className='btn danger' type="button" value='Eliminar' onClick={() => handleClickDelete(color.id)} />
                                </span>
                            </>
                        }


                    </div>
                ))}
            </div>
        </div>
    );
}

export default Colors;