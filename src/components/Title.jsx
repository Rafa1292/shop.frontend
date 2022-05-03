import React from 'react';
import '@styles/Title.scss';

const Title = ({ title, addRef }) => {
    const btn = addRef ? <a className='btn' href={addRef} >Agregar</a> : '';
    return (
        <div className='title-container'>
            <div className='col-10 center'>
                <h2 className='generic-title'>{title}</h2>
            </div>
            {btn}
        </div>
    );
}

export default Title;