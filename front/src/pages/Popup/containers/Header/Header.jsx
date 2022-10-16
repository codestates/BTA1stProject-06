import React, {useEffect, useState} from 'react';
import './Header.css';
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {chainState, pageState, pairsState} from "../../recoil/index";
import {ExplorerLink} from "../../modules/usePolkadotAPI";
import ChainItem from "../../component/ChainItem/ChainItem";
import PairItem from '../../component/pairItem/pairItem';

const Header = ({ backPageName, align, goHome = true }) => {
    const setPage = useSetRecoilState(pageState);
    const [chain, setChain] = useRecoilState(chainState);
    const pairs = useRecoilValue(pairsState);

    const [chainDropbox, setChainDropBox] = useState(false);
    const [profileDropbox, setProfileDropbox] = useState(false);
    const [chainList, setChainList] = useState([]);

    useEffect(async () => {
        setChainList(Object.keys(ExplorerLink));
    }, [])

    const selectChain = (chainName) => {
        setChain(chainName);
        setChainDropBox(false);
    }


    return (
        <div className="Header">
            {
                align === 'left' ?
                    <div className="left-head-box">
                        <div className="top-left">
                            <img src="./parawallet32x32.png" />
                        </div>

                        <div className="network-box" onClick={() => {
                            setProfileDropbox(false);
                            setChainDropBox(!chainDropbox);
                        }}>
                            {chain}
                        </div>

                        <div className="profile-box" onClick={() => {
                            setChainDropBox(false);
                            setProfileDropbox(!profileDropbox);
                        }}>
                            <div className="profile-inner-box"></div>
                        </div>



                        <div className={`chain-drop-box ${chainDropbox ? 'display-block' : ''}`}>
                            {
                                chainList.map((name, index) => <ChainItem key={index} chainName={name} selectChain={selectChain} />)
                            }
                        </div>

                        <div className={`profile-drop-box ${profileDropbox ? 'display-block' : ''}`}>
                            {
                                pairs.map(( index) => <PairItem key={index} />)
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
