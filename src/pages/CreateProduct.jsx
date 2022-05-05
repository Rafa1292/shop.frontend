import React, { useState, useEffect, useRef } from 'react';
import Title from '@components/Title';
import { useGetList, usePost, usePatch } from '../hooks/useAPI';
import { useHistory } from "react-router-dom"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../firebase'
const CreateProduct = () => {
    const [brandId, setBrandId] = useState(0);
    const [brands, setBrands] = useState([]);
    const [primaryColorId, setPrimaryColorId] = useState(0);
    const [secondaryColorId, setSecondaryColorId] = useState(0);
    const [subcategoryId, setSubcategoryId] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [colors, setColors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const name = useRef(null);
    const description = useRef(null);
    const price = useRef(0);
    const history = useHistory();

    useEffect(async () => {
        await loadBrands();
        await loadColors();
        await loadCategories();
    }, []);

    const loadBrands = async () => {
        const response = await useGetList('brands');
        setBrands(response.data);
    }
    const loadColors = async () => {
        const response = await useGetList('colors');
        setColors(response.data);
    }
    const loadCategories = async () => {
        const response = await useGetList('categories');
        setCategories(response.data);
    }

    const handleCategoryChange = async (event) => {
        await setCategoryId({ value: event.target.value });
        const temCategoryId = event.target.value;
        categories.forEach(category => {
            if (category.id == temCategoryId) {
                setSubcategories(category.subcategories);
            }
        });
    };

    const getProduct = () => {
        return {
            "name": name.current.value,
            "description": description.current.value,
            "price": price.current.value,
            "subcategoryId": subcategoryId,
            "brandId": brandId,
            "primaryColorId": primaryColorId,
            "secondaryColorId": secondaryColorId,
            "image": imageUrl
        }
    }

    const getImage = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const loadImage = () => {
        const storageRef = ref(storage, `/files/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on("state_changed", snapshot => { },
            (err) => console.log('error'),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        setImageUrl(url);
                    }
                    );
            });
    }

    const submit = async () => {
        const product = getProduct();
        const response = await usePost('products', product);
        console.log(response)
        if (response.status = '201') {
            history.push("/products");
        }
    }

    return (
        <>
            <Title title="Agregar producto" />
            <form className='col-md-10 center'>
                <div className='col-md-2 m-1'>
                    <label htmlFor='name' className='col-10'>Nombre</label>
                    <input type='text' id='name' ref={name} placeholder='Nike x345' className='input' />
                </div>
                <div className='col-md-2 m-1'>
                    <label htmlFor='description' className='col-10'>Descripcion</label>
                    <input type='text' id='description' ref={description} placeholder='...' className='input' />
                </div>
                <div className='col-md-2 m-1'>
                    <label htmlFor='price' className='col-10'>Precio</label>
                    <input type='number' id='price' ref={price} placeholder='40000' className='input' />
                </div>
                <div className="col-md-10"></div>
                <span className='col-sm-3 m-1 d-flex center'>
                    <label htmlFor='categoryId' className='col-10 center'>Categoria</label>
                    <select id='categoryId' onChange={handleCategoryChange} defaultValue={categoryId}>
                        <option value="0">Seleccione una categoria</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </span>
                <span className='col-sm-3 m-1 d-flex center'>
                    <label htmlFor='subcategoryId' className='col-10 center'>Subcategoria</label>
                    <select id='subcategoryId' onChange={(event) => setSubcategoryId(event.target.value)} defaultValue={subcategoryId}>
                        <option value="0">Seleccione una subcategoria</option>
                        {
                            subcategories.map(subctegory => (
                                <option key={subctegory.id} value={subctegory.id}>{subctegory.name}</option>
                            ))
                        }
                    </select>
                </span>
                <span className='col-sm-3 m-1 d-flex center'>
                    <label htmlFor='brandId' className='col-10 center'>Marca</label>
                    <select id='brandId' onChange={(event) => setBrandId(event.target.value)} defaultValue={brandId}>
                        <option value="0">Seleccione una marca</option>
                        {
                            brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))
                        }
                    </select>
                </span>
                <span className='col-sm-3 center m-1'>
                    <label htmlFor='primaryColorId' className='col-10 center'>Color primario</label>
                    <select id='primaryColorId' onChange={(event) => setPrimaryColorId(event.target.value)} defaultValue={primaryColorId}>
                        <option value="0">Seleccione un color</option>
                        {
                            colors.map(color => (
                                <option key={color.id} value={color.id}>{color.name}</option>
                            ))
                        }
                    </select>
                </span>
                <span className='col-sm-3 center m-1'>
                    <label htmlFor='secondaryColorId' className='col-10 center'>Color secundario</label>
                    <select id='secondaryColorId' onChange={(event) => setSecondaryColorId(event.target.value)} defaultValue={secondaryColorId}>
                        <option value="0">Seleccione un color</option>
                        {
                            colors.map(color => (
                                <option key={color.id} value={color.id}>{color.name}</option>
                            ))
                        }
                    </select>
                </span>
                <div className="col-10">
                    <input type='file' onChange={getImage} />
                    <button type='button' onClick={loadImage}>Guardar</button>

                </div>
                <div className='col-10 center m-1'>
                    <input type='button' className='btn success col-10' onClick={submit} value='Enviar' />
                </div>
            </form>
        </>

    );
}

export default CreateProduct;