import { useGetList, usePost, useDelete, usePatch } from '../hooks/useAPI';
import React, { useRef, useState, useEffect } from "react";
import Title from '@components/Title';
import '@styles/subcategories.scss';

const SubCategories = () => {
    let [subcategories, setSubcategories] = useState([]);
    let [categories, setCategories] = useState([]);
    let [categoryId, setCategoryId] = useState(0);
    const [editId, setEditId] = useState(0);
    let nameInput = useRef();
    let nameEditInput = useRef();

    const loadSubcategories = async () => {
        const response = await useGetList('subcategories');
        if (!response.error) {
            setSubcategories(response.content);            
        }
    };

    const loadCategories = async () => {
        const response = await useGetList('categories');

        if (!response.error) {
            setCategories(response.content);
            
        }
    };

    useEffect(async () => {
        await loadSubcategories();
        await loadCategories();
    }, []);

    const handleClickPost = async () => {
        const response = await usePost('subcategories', { name: nameInput.current.value, categoryId: categoryId.value, });
        if (!response.error) {
            setCategoryId(0);
            loadSubcategories();
            nameInput.current.value = null;
        }
    };

    const handleClickDelete = async (id) => {
        const response = await useDelete(`subcategories/${id}`);
        if (!response.error) {
            loadSubcategories();
        }
    };

    const handleClickPatch = async (id) => {
        let options = { 
            name: nameEditInput.current.value, 
            categoryId: categoryId.value,
        };
        options = categoryId > 0 ? {...options, categoryId : categoryId} : options;
        const response = await usePatch(`subcategories/${id}`, options);

        if (!response.error) {
            loadSubcategories();
            nameInput.current.value = null;
            setCategoryId(0);
            setEditId(0);
        }
    };
    
    const handleChange = (event) => {
        setCategoryId({ value: event.target.value });
    };
    return (
        <div className="subcategory-index col-md-4">
            <Title title="Lista de subcategorias"></Title>
            <div className='add-subcategory-container my-2 col-sm-10 center'>
                <span className='col-10 center'>
                    <input type="text" placeholder="Nueva subcategoria" className="col-8 input" ref={nameInput} />
                </span>
                <span className='col-8 my-1 center'>
                    <select onChange={handleChange}>
                        <option value="0">Seleccione una categoria</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </span>
                <span className='my-2 col-md-10 center'>
                    <input type='button' className='btn mx-2' value='Agregar' onClick={handleClickPost} />
                </span>
            </div>
            <div className="subcategory-index-container">
                {subcategories?.map(subcategory => (
                    <div className="subcategory-index-item col-sm-6 center" key={subcategory.id}>
                        {
                            editId == subcategory.id
                            &&
                            <>
                                <span className='col-3 center'>
                                    <input type="text" className="input col-10" defaultValue={subcategory.name} ref={nameEditInput} />
                                </span>
                                <span className='col-sm-3 my-1 center'>
                                    <select onChange={handleChange} defaultValue={subcategory.categoryId}>
                                        <option value="0">Seleccione una categoria</option>
                                        {
                                            categories.map(category => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))
                                        }
                                    </select>
                                </span>
                                <span className='col-3 mx-2 center'>
                                    <input className='btn success col-10' type="button" value='Cambiar' onClick={() => handleClickPatch(subcategory.id)} />
                                </span>
                                <span className='col-3 center'>
                                    <input className='btn danger col-10' type="button" value='X' onClick={() => setEditId(0)} />
                                </span>
                            </>
                            ||
                            <>
                                <h3 className='col-sm-3 center m-0'>{subcategory.category.name}</h3>
                                <h4 className='col-sm-3 m-0 center'>{subcategory.name}</h4>
                                <span className='center'>
                                    <input className='btn mx-2' type="button" value='Editar' onClick={() => setEditId(subcategory.id)} />
                                </span>
                                <span className=' center'>
                                    <input className='btn danger' type="button" value='Eliminar' onClick={() => handleClickDelete(subcategory.id)} />
                                </span>
                            </>
                        }


                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubCategories;