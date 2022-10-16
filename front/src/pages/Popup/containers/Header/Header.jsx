import React, {useEffect, useState} from 'react';
import './Header.css';
import {useSetRecoilState} from "recoil";
import {pageState} from "../../recoil/index";
import {ExplorerLink} from "../../modules/usePolkadotAPI";
import ChainItem from "../../component/ChainItem/ChainItem";

const Header = ({ backPageName, align, goHome = true }) => {
    const setPage = useSetRecoilState(pageState);

    const [dropbox, setDropBox] = useState(false);
    const [chainList, setChainList] = useState([]);

    useEffect(() => {
        setChainList(Object.keys(ExplorerLink));
    }, [])

    return (
        <div className="Header">
            {
                align === 'left' ?
                    <div className="left-head-box">
                        <div className="top-left">
                            <img src="./parawallet32x32.png" />
                        </div>

                        <div className="network-box" onClick={() => {
                            setDropBox(!dropbox);
                        }}>
                            {chainList[0]}
                        </div>

                        <div className={`drop-box ${dropbox ? 'display-block' : ''}`}>
                            {
                                chainList.map((name, index) => <ChainItem key={index} chainName={name} />)
                            }
                        </div>
                    </div>
                    :
                    <>
                        <div className={`back-btn ${backPageName === undefined ? '' : 'visible'}`} onClick={() => {
                            setPage(backPageName)
                        }}>{'<'}</div>

                        <div className="top" onClick={() => {
                            if(goHome){
                                setPage('Start');
                            }
                        }}>
                            <img src="./parawallet32x32.png" />
                            <div className="main-title">A-MAN</div>
                        </div>

                        <div className="empty">{'>'}</div>
                    </>
            }

        </div>
    );
};

export default Header;
