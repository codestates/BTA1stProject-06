import React from 'react';
import './Loading.css';
import {loadingState} from "../../recoil";
import {useRecoilValue} from "recoil";

const Loading = () => {
    const isLoading = useRecoilValue(loadingState)

    return (
        <div className={`Loading ${isLoading ? 'visible' : ''}`} >
            <div className="loading-box">
                <img className="loading-img" src="./parawallet32x32.png" />
            </div>
        </div>
    );
};

export default Loading;
