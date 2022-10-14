import React from 'react';
import './Popup.css';
import Start from "./pages/Start/Start";
import {useStore} from "react-redux";

const Popup = () => {
    console.log(useStore().getState().page.page)

    return (
            <div className="App">
                <Start />
            </div>
    );
};

export default Popup;
