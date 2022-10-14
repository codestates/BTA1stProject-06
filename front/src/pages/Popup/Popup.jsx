import React from 'react';
import './Popup.css';
import Start from "./pages/Start/Start";
import {BrowserRouter, Route, Router, Switch, Routes} from "react-router-dom";

const Popup = () => {
    console.log(window.location.href)

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" component={Start} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Popup;
