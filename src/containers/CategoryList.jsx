import { useDelete, usePatch } from '../hooks/useAPI';
import React, { useRef, useState } from "react";

const CategoryList = (categoriesParam) => {
    let categories = [];
    categories = categoriesParam;
    let nameEditInput = useRef();
    let [editId, setEditId] = useState(0);

    const handleClickDelete = async (id) => {
        const response = await useDelete(`categories/${id}`);
        if (!response.error) {
            loadCategories();
        }
    };

    const handleClickPatch = async (id) => {
        const response = await usePatch(`categories/${id}`, { name: nameEditInput.current.value });
        
        if (!response.error) {
            loadCategories();
            nameInput.current.value = null;
            setEditId(0);
        }
    };

    return (
        <>
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
        </>
    );
}

export default CategoryList;