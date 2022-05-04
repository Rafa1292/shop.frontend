import Title from '@components/Title';
import '@styles/Brands.scss';
import { useGetList, usePost, useDelete, usePatch } from '../hooks/useAPI';
import React, { useRef, useState, useEffect } from "react";


const Brands = () => {
    let [brands, setBrands] = useState([]);
    const [editId, setEditId] = useState(0);

    let nameInput = useRef();
    let nameEditInput = useRef();

    useEffect(async () => {
        await loadBrands();
    }, []);

    const handleClickPost = async () => {
        const response = await usePost('brands', { name: nameInput.current.value });
        if (response.status == "201") {
            loadBrands();
            nameInput.current.value = null;
        }
    };

    const handleClickDelete = async (id) => {
        const response = await useDelete(`brands/${id}`);
        if (response.status == "201") {
            loadBrands();
        }
    };

    const loadBrands = async () => {
        const response = await useGetList('brands');
        setBrands(response.data);
    };

    const handleClickPatch = async (id) => {
        const response = await usePatch(`brands/${id}`, { name: nameEditInput.current.value });

        if (response.status == "200") {
            loadBrands();
            nameInput.current.value = null;
            setEditId(0);
        }
    };

    return (
        <div className="brand-index">
            <Title title="Lista de marcas"></Title>
            <div className='add-brand-container my-2 col-sm-10 center'>
                <span className='col-sm-10 center'>
                    <input type="text" placeholder="Nueva marca" className="input" ref={nameInput} />
                </span>
                <span className='my-2 center'>
                    <input type='button' className='btn mx-2' value='Agregar' onClick={handleClickPost} />
                </span>
            </div>
            <div className="brand-index-container">
                {brands.map(brand => (
                    <div className="brand-index-item col-sm-6 center" key={brand.id}>
                        {
                            editId == brand.id
                            &&
                            <>
                                <span className='col-3 center'>
                                    <input type="text" className="input col-10" defaultValue={brand.name} ref={nameEditInput} />
                                </span>
                                <span className='col-3 mx-2 center'>
                                    <input className='btn success col-10' type="button" value='Cambiar' onClick={() => handleClickPatch(brand.id)} />
                                </span>
                                <span className='col-3 center'>
                                    <input className='btn danger col-10' type="button" value='X' onClick={() => setEditId(0)} />
                                </span>
                            </>
                            ||
                            <>
                                <span className='col-3 center'>{brand.name}</span>
                                <span className='center'>
                                    <input className='btn mx-2' type="button" value='Editar' onClick={() => setEditId(brand.id)} />
                                </span>
                                <span className=' center'>
                                    <input className='btn danger' type="button" value='Eliminar' onClick={() => handleClickDelete(brand.id)} />
                                </span>
                            </>
                        }


                    </div>
                ))}
            </div>
        </div>
    );
}

export default Brands;