import React, { useState, useEffect, useRef } from 'react';
import Title from '@components/Title';
import { useGetList, usePost, usePatch } from '../hooks/useAPI';
import { useHistory } from "react-router-dom"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../firebase'
import img from '../assets/icons/img.png'
import loadingGif from '../assets/icons/loading.gif'
import '@styles/CreateProduct.scss';

const CreateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [brandId, setBrandId] = useState(0);
    const [brands, setBrands] = useState([]);
    const [primaryColorId, setPrimaryColorId] = useState(0);
    const [secondaryColorId, setSecondaryColorId] = useState(0);
    const [subcategoryId, setSubcategoryId] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [colors, setColors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
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
        setLoading(true);
        if (e.target.files[0]) {
            loadImage(e.target.files[0]);
        }
    }

    const loadImage = (image) => {
        const storageRef = ref(storage, `/files/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on("state_changed", snapshot => { },
            (err) => console.log('error'),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        setImageUrl(url);
                        setLoading(false);
                    }
                    );
            });
    }

    const submit = async () => {
        const product = getProduct();
        console.log(product);
        const response = await usePost('products', product);
        if (response.status = '201') {
            history.push("/products");
        }
    }

    return (
        <>
            <Title title="Agregar producto" />
            <div className='col-sm-8 center'>
                <div className="col-sm-5 center">
                    <span className='col-10 p-2 d-flex center'>
                        <label htmlFor='categoryId' className='col-10'>Categoria</label>
                        <select id='categoryId' onChange={handleCategoryChange} defaultValue={categoryId}>
                            <option value="0">Seleccione una categoria</option>
                            {
                                categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </span>
                    <span className='col-10 p-2 d-flex center'>
                        <label htmlFor='subcategoryId' className='col-10'>Subcategoria</label>
                        <select id='subcategoryId' onChange={(event) => setSubcategoryId(event.target.value)} defaultValue={subcategoryId}>
                            <option value="0">Seleccione una subcategoria</option>
                            {
                                subcategories.map(subctegory => (
                                    <option key={subctegory.id} value={subctegory.id}>{subctegory.name}</option>
                                ))
                            }
                        </select>
                    </span>
                    <span className='col-10 p-2 d-flex center'>
                        <label htmlFor='brandId' className='col-10'>Marca</label>
                        <select id='brandId' onChange={(event) => setBrandId(event.target.value)} defaultValue={brandId}>
                            <option value="0">Seleccione una marca</option>
                            {
                                brands.map(brand => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))
                            }
                        </select>
                    </span>
                    <span className='col-10 p-2 center'>
                        <label htmlFor='primaryColorId' className='col-10'>Color primario</label>
                        <select id='primaryColorId' onChange={(event) => setPrimaryColorId(event.target.value)} defaultValue={primaryColorId}>
                            <option value="0">Seleccione un color</option>
                            {
                                colors.map(color => (
                                    <option key={color.id} value={color.id}>{color.name}</option>
                                ))
                            }
                        </select>
                    </span>
                    <span className='col-10 p-2 center'>
                        <label htmlFor='secondaryColorId' className='col-10'>Color secundario</label>
                        <select id='secondaryColorId' onChange={(event) => setSecondaryColorId(event.target.value)} defaultValue={secondaryColorId}>
                            <option value="0">Seleccione un color</option>
                            {
                                colors.map(color => (
                                    <option key={color.id} value={color.id}>{color.name}</option>
                                ))
                            }
                        </select>
                    </span>
                </div>

                <div className="col-sm-5 d-flex center">
                    <div className='col-10 p-2 center flex-wrap'>
                        <label htmlFor='name' className='col-8'>Nombre</label>
                        <input type='text' id='name' ref={name} placeholder='Nike x345' className='input col-8' />
                    </div>
                    <div className='col-10 p-2 center flex-wrap'>
                        <label htmlFor='description' className='col-8'>Descripcion</label>
                        <input type='text' id='description' ref={description} placeholder='...' className='input col-8' />
                    </div>
                    <div className='col-10 p-2 center flex-wrap'>
                        <label htmlFor='price' className='col-8'>Precio</label>
                        <input type='number' id='price' ref={price} placeholder='40000' className='input col-8' />
                    </div>
                </div>

                <div className="col-10 items-center fit-content center">
                    <input id='imgLoad' type='file' className='d-none' onChange={getImage} />

                    {
                        loading &&
                        <img height={200} src={loadingGif} />
                        ||
                        <>
                            <label htmlFor='imgLoad' className='p-3 img-load-container col-sm-4 center'>
                                <img height={100} src={img} />
                                <label className='col-10 center' >Seleccionar archivo</label>
                            </label>
                            {imageUrl &&
                                <div className="center col-sm-4 p-2">
                                    <img className='col-10' src={imageUrl} />
                                </div>
                            }
                        </>

                    }
                </div>
                <div className='col-10 center m-1'>
                    {
                        imageUrl && !loading &&
                        <input type='button' className='btn success col-md-5' onClick={submit} value='Enviar' />
                        // || !imageUrl && !loading &&
                        // <button type='button' className='btn' onClick={loadImage}>guardar</button>
                    }
                </div>
            </div>
        </>

    );
}

export default CreateProduct;