import React, {useEffect} from 'react';
import './Start.css';
import Header from "../../containers/Header/Header";
import {useSetRecoilState} from "recoil";
import {pageState} from "../../recoil";
import Storage from "../../modules/Storage";

const Start = () => {
    const setPage = useSetRecoilState(pageState);

    useEffect(async () => {
        try {
            const encryptMnemonic = await Storage.get(Storage.encryptMnemonic, '');
            if(encryptMnemonic === '') throw '';
            setPage('LoginWallet');
        }catch (e){
            console.log(e);
        }
    }, [])

    return (
        <div className="Start">
            <Header></Header>
            <div className="title"><span className="title-main">Para-wallet</span> 방문을 환영합니다</div>

            <div className="sub-title">Polkadot 생태계의 분산형 웹에 연결합니다.</div>
            <div className="sub-title sub-title1">반갑습니다.</div>

            <button className="start-btn" onClick={() => {
                setPage('Select');
            }}>START</button>
        </div>
    );
};

export default Start;
