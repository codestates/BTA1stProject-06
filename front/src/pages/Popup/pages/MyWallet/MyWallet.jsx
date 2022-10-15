import React, {useEffect} from 'react';
import './MyWallet.css';
import {pageState, pairState} from "../../recoil";
import {useRecoilValue, useSetRecoilState} from "recoil";
import Header from "../../containers/Header/Header";

const MyWallet = () => {
    const setPage = useSetRecoilState(pageState);
    const pair = useRecoilValue(pairState);

    useEffect( () => {
        console.log(pair)
    }, [])

    return (
        <div className="MyWallet">
            <Header align="left"></Header>

            <div className="wallet-info-box1">
                <div>Account</div>
                <div>{pair.address}</div>
            </div>

            <div className="wallet-info-box2">

            </div>

            <div className="btn-box">
                <button className="purchase-btn">구매</button>
                <button className="mywallet-send-btn" onClick={() => {
                    setPage("Send");
                }}>보내기</button>
            </div>
            
            <div className="history-box">
                <div className="history-title">활동</div>
                <div className="history-list">

                </div>
            </div>
        </div>
    );
};

export default MyWallet;
