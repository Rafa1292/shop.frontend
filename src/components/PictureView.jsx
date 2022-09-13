import React, {useContext} from 'react';
import '@styles/PictureView.scss';
import close from '@icons/close.png';
import AppContext from '../context/AppContext';

const PictureView = () => {
    const { state, setPictureToSee } = useContext(AppContext);

    return (
        <div className="pictureview-container">
            <span className="pictureview-close">
                <img style={{width: '60px'}} onClick={()=>setPictureToSee('')} src={close}/>
            </span>
            <img src={state.pictureToSee}/>
        </div>
    );
}

export default PictureView;