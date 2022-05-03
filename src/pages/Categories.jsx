import Title from '@components/Title';
import '@styles/Categories.scss';
import { useGetList, usePost, useDelete, usePatch } from '../hooks/useAPI';
import React, { useRef, useState, useEffect } from "react";


const Categories = () => {
    let [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(0);

    let nameInput = useRef();
    let nameEditInput = useRef();

    useEffect(async () => {
        await loadCategories();
    }, []);

    const handleClickPost = async () => {
        const response = await usePost('categories', { name: nameInput.current.value, image: "http://image.com" });
        if (response.status == "201") {
            loadCategories();
            nameInput.current.value = null;
        }
    };

    const handleClickDelete = async (id) => {
        const response = await useDelete(`categories/${id}`);
        if (response.status == "201") {
            loadCategories();
        }
    };

    const loadCategories = async () => {
        const response = await useGetList('categories');
        setCategories(response.data);
    };

    const handleClickPatch = async (id) => {
        const response = await usePatch(`categories/${id}`, { name: nameEditInput.current.value });

        if (response.status == "200") {
            loadCategories();
            nameInput.current.value = null;
            setEditId(0);
        }
    };

    return (
        <div className="category-index">
            <Title title="Lista de categorias"></Title>
            <div className='add-category-container my-2 col-sm-10 center'>
                <span className='col-sm-3 center'>
                    <input type="text" placeholder="Nueva categoria" className="input" ref={nameInput} />
                </span>
                <span className='my-2 center'>
                    <input type='button' className='btn mx-2' value='Agregar' onClick={handleClickPost} />
                </span>
            </div>
            <div className="category-index-container">
                {categories.map(category => (
                    <div className="category-index-item col-sm-6 center" key={category.id}>
                        {
                            editId == category.id
                            &&
                            <>
                                <span className='col-3 center'>
                                    <input type="text" className="input col-10" defaultValue={category.name} ref={nameEditInput} />
                                </span>
                                <span className='col-3 mx-2 center'>
                                    <input className='btn success col-10' type="button" value='Cambiar' onClick={() => handleClickPatch(category.id)} />
                                </span>
                                <span className='col-3 center'>
                                    <input className='btn danger col-10' type="button" value='X' onClick={() => setEditId(0)} />
                                </span>
                            </>
                            ||
                            <>
                                <span className='col-3 center'>{category.name}</span>
                                <span className='center'>
                                    <input className='btn mx-2' type="button" value='Editar' onClick={() => setEditId(category.id)} />
                                </span>
                                <span className=' center'>
                                    <input className='btn danger' type="button" value='Eliminar' onClick={() => handleClickDelete(category.id)} />
                                </span>
                            </>
                        }


                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categories;