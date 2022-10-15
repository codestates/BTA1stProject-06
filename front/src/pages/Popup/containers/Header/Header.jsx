import React from 'react';
import './Header.css';
import {useDispatch} from "react-redux";
import {pageMove} from "../../redux/modules/page";

const Header = () => {
    const dispatch = useDispatch();

    return (
        <div className="Header">
            <div className="top" onClick={() => {
                dispatch(pageMove('start'));
            }}>
                <img src="./parawallet32x32.png" />
                <div>PARA-WALLET</div>
            </div>
        </div>
    );
};

export default Header;
