import React, {useEffect, useState} from 'react';
import './Header.css';
import {useRecoilState, useSetRecoilState} from "recoil";
import {chainState, pageState, selectedNickNameState, selectedPairState} from "../../recoil/index";
import {ExplorerLink, getPairFromSeed} from "../../modules/usePolkadotAPI";
import ChainItem from "../../component/ChainItem/ChainItem";
import PairItem from '../../component/pairItem/pairItem';
import Storage from '../../modules/Storage';

const Header = ({ backPageName, align, goHome = true }) => {
    const setPage = useSetRecoilState(pageState);
    const [chain, setChain] = useRecoilState(chainState);
    const [selectedPair, setSelectedPair] = useRecoilState(selectedPairState);
    const setSelectedNickName = useSetRecoilState(selectedNickNameState);

    const [chainDropbox, setChainDropBox] = useState(false);
    const [profileDropbox, setProfileDropbox] = useState(false);
    const [chainList, setChainList] = useState([]);
    const [pairList, setPairList] = useState([]);

    const selectChain = (chainName) => {
        setChain(chainName);
        setChainDropBox(false);
        setPage('MyWallet');
    }

    const selectPair = (data) => {
        setSelectedNickName(data[0]);
        setSelectedPair(data[1]);
        setProfileDropbox(false);
        setPage('MyWallet');
    }

    const getPairList = async () => {
        const pairs = Object.entries(await Storage.getMnemonicList());
        let arr = [];

        for(let i = 0; i < pairs.length; i++){
            if(pairs[i][0] !== ''){
                const pair = getPairFromSeed(pairs[i][1]);
                arr.push([pairs[i][0], pair])
            }
        }
        setPairList(arr);
    }

    useEffect(async () => {
        setChainList(Object.keys(ExplorerLink));

        await getPairList();
    }, [])

    return (
        <div className="Header">
            {
                align === 'left' ?
                    <div className="left-head-box">
                        <div className="top-left" onClick={() => {
                            setPage('MyWallet');
                        }}>
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
                            <div className="profile-inner-box">
                                {selectedPair.address.slice(0, 2)}
                            </div>
                        </div>



                        <div className={`chain-drop-box ${chainDropbox ? 'display-block' : ''}`}>
                            {
                                chainList.map((name, index) => <ChainItem key={index} chainName={name} selectChain={selectChain} />)
                            }
                        </div>

                        <div className={`profile-drop-box ${profileDropbox ? 'display-flex' : ''}`}>
                            <div className="pair-list-box">
                            {
                                pairList.map((data, index) => <PairItem key={index} data={data} selectPair={selectPair} />)
                            }
                            </div>
                            <div className="profile-setting-box">
                                <div className="profile-settin-item" style={{"borderBottom": '1px solid black'}} onClick={() => {
                                    setPage('ImportPair');
                                }}>계정 가져오기</div>
                                <div className="profile-settin-item" onClick={() => {
                                    setPage('AddPair');
                                }}>계정 생성</div>
                            </div>
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
                            <div className="main-title">PARA-WALLET</div>
                        </div>

                        <div className="empty">{'>'}</div>
                    </>
            }

        </div>
    );
};

export default Header;
