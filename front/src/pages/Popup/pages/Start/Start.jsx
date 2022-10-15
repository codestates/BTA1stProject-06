import React, {useEffect} from 'react';
import './Start.css';
import Header from "../../containers/Header/Header";
import {useSetRecoilState} from "recoil";
import {loadingState, pageState} from "../../recoil";
import Storage from "../../modules/Storage";

const Start = () => {
    const setPage = useSetRecoilState(pageState);
    const setLoading = useSetRecoilState(loadingState);

    useEffect(async () => {
        setLoading(true);
        try {
            await Storage.get(Storage.keyPair);
            setPage('LoginWallet');
        }catch (e){

        }
        setLoading(false);
    }, [])

    return (
        <div className="Start">
            <Header></Header>
            <div className="title"><span className="title-main">Para-wallet</span> 방문을 환영합니다</div>

            <div className="sub-title">Polkadot 생태계의 분산형 웹에 연결합니다.</div>
            <div className="sub-title sub-title1">반갑습니다.</div>

            <button className="start-btn" onClick={() => {
                setPage('Select');
            }}>시작하기</button>
        </div>
    );
};

export default Start;
