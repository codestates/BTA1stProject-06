import React from 'react';
import './Popup.css';
import {useRecoilValue} from "recoil";
import {pageState} from "./recoil";
import Loading from "./containers/Loading/Loading";
import {render} from "./router";

const Popup = () => {
    const page = useRecoilValue(pageState);

    return (
            <div className="App">
                {render(page)}
                <Loading></Loading>
            </div>
    );
};

export default Popup;
