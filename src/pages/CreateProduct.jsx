import React, {useState} from 'react';
import Title from '@components/Title';

const CreateProduct = () => {
    const [brandId, setBrandId] = useState(0);
    const [brands, setBrands] = useState([]);
    const [primaryColorId, setPrimaryColorId] = useState(0);
    const [secondaryColorId, setSecondaryColorId] = useState(0);
    const [colors, setColors] = useState([]);
    const handleBrandChange = (event) => {
        setCategoryId({ value: event.target.value });
    };

    return (
        <>
            <Title title="Agregar producto" />
            <form className='col-md-10 center'>
                <div className='col-2 '>
                    <label htmlFor='name' className='col-10'>Nombre</label>
                    <input type='text' id='name' placeholder='Nike x345' className='input' />
                </div>
                <div className='col-2 mx-2'>
                    <label htmlFor='description' className='col-10'>Descripcion</label>
                    <input type='text' id='description' placeholder='...' className='input' />
                </div>
                <div className='col-2'>
                    <label htmlFor='price' className='col-10'>Precio</label>
                    <input type='number' id='price' placeholder='40000' className='input' />
                </div>
                <div className="col-10 my-2"></div>
                <span className='col-3 d-flex center'>
                    <label htmlFor='brandId' className='col-10 center'>Marca</label>
                    <select id='brandId' onChange={handleBrandChange} defaultValue={brandId}>
                        <option value="0">Seleccione una marca</option>
                        {
                            brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))
                        }
                    </select>
                </span>
                <span className='col-3 center'>
                    <label htmlFor='primaryColorId' className='col-10 center'>Color primario</label>
                    <select id='primaryColorId' onChange={handleBrandChange} defaultValue={primaryColorId}>
                        <option value="0">Seleccione un color</option>
                        {
                            colors.map(color => (
                                <option key={color.id} value={color.id}>{color.name}</option>
                            ))
                        }
                    </select>
                </span>
                <span className='col-3 center'>
                    <label htmlFor='secondaryColorId' className='col-10 center'>Color secundario</label>
                    <select id='secondaryColorId' onChange={handleBrandChange} defaultValue={secondaryColorId}>
                        <option value="0">Seleccione un color</option>
                        {
                            colors.map(color => (
                                <option key={color.id} value={color.id}>{color.name}</option>
                            ))
                        }
                    </select>
                </span>
            </form>
        </>

    );
}

export default CreateProduct;