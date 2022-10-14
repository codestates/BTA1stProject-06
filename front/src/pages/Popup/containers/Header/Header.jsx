import React from 'react';
import './Header.css';
import {useSetRecoilState} from "recoil";
import {pageState} from "../../recoil/index";

const Header = ({ backPageName }) => {
    const setPage = useSetRecoilState(pageState);

    return (
        <div className="Header">
            <div className={`back-btn ${backPageName === undefined ? '' : 'visible'}`} onClick={() => {
                setPage(backPageName)
            }}>{'<'}</div>

            <div className="top" onClick={() => {
                setPage('Start');
            }}>
                <img src="./parawallet32x32.png" />
                <div className="main-title">A-MAN</div>
            </div>

            <div className="empty">{'>'}</div>
        </div>
    );
};

export default Header;
