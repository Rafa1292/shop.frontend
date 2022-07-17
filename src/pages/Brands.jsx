import Title from '@components/Title';
import '@styles/Brands.scss';
import { useGetList, usePost, useDelete, usePatch } from '../hooks/useAPI';
import React, { useRef, useState, useEffect } from "react";
import loadingGif from '../assets/icons/loading.gif'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../firebase'
import img from '../assets/icons/img.png'

const Brands = () => {
    let [brands, setBrands] = useState([]);
    const [editId, setEditId] = useState(0);
    const [loadingPicture, setLoadingPicture] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    let nameInput = useRef();
    let nameEditInput = useRef();

    useEffect(async () => {
        await loadBrands();
    }, []);

    const handleClickPost = async () => {
        const response = await usePost('brands', { name: nameInput.current.value, image: imageUrl });
        console.log(response)
        if (response?.status == "201") {
            loadBrands();
            nameInput.current.value = null;
            setImageUrl("");
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

    const getImage = e => {
        setLoadingPicture(true);
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
                        setLoadingPicture(false);
                    }
                    );
            });
    }

    return (
        <div className="brand-index">
            <Title title="Lista de marcas"></Title>
            <div className='add-brand-container my-2 col-sm-10 center'>
                <span className='col-sm-10 center'>
                    <input type="text" placeholder="Nueva marca" className="input" ref={nameInput} />
                </span>
                <div className="col-10 items-center fit-content center">
                    <input id='imgLoad' type='file' className='d-none' onChange={getImage} />

                    {
                        loadingPicture &&
                        <img height={200} src={loadingGif} />
                        ||
                        <>
                            <label htmlFor='imgLoad' className='p-3 img-load-container col-5 center'>
                                <img height={100} src={img} />
                                <label className='col-10 center' style={{ textAlign: 'center' }} >Seleccionar archivo</label>
                            </label>
                            {imageUrl &&
                                <div className="center col-10 p-2">
                                    <img className='col-5' src={imageUrl} />
                                </div>
                            }
                        </>

                    }
                </div>
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
                                <div className="col-3 center items-center">
                                    <span className='col-10 center'>
                                        <input className='btn success col-10 m-1' type="button" value='Cambiar' onClick={() => handleClickPatch(brand.id)} />
                                    </span>
                                    <span className='col-10 center'>
                                        <input className='btn danger col-10 m-1' type="button" value='X' onClick={() => setEditId(0)} />
                                    </span>
                                </div>
                            </>
                            ||
                            <>
                            <div className="col-3 center">
                                <img height={50} src={brand.image}/>
                            </div>
                                <span className='col-3 center'>{brand.name}</span>
                                <div className="col-3 center items-center">
                                    <span className='center col-10'>
                                        <input className='btn col-10 m-1' type="button" value='Editar' onClick={() => setEditId(brand.id)} />
                                    </span>
                                    <span className=' center col-10'>
                                        <input className='btn col-10 danger m-1' type="button" value='Eliminar' onClick={() => handleClickDelete(brand.id)} />
                                    </span>
                                </div>
                            </>
                        }


                    </div>
                ))}
            </div>
        </div>
    );
}

export default Brands;