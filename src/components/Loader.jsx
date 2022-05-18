import React from 'react';
import loadingGif from '../assets/icons/loading.gif'

const Loader = () => {
    return (
        <div style={{height: 'calc(100vh - 100px)'}} className="flex-wrap center items-center">
        <img height={200} src={loadingGif} />
    </div>
    );
}

export default Loader;