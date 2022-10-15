import React from 'react';
import './Send.css';
import {loadingState, pageState} from "../../recoil";
import {useRecoilValue, useSetRecoilState} from "recoil";
import Header from "../../containers/Header/Header";

const Send = () => {
    const setPage = useSetRecoilState(pageState);

    return (
        <div className="Send">
            <Header align="left"></Header>
            
            <div className="send-box">
                <div className="send-box-title">보내기</div>

                <div className="send-input-box">
                    <input className="send-input" placeholder="주소" />
                </div>     
                
                <div className="send-input-box">
                    <input className="send-input" placeholder="금액" />
                </div>

                <div className="send-btn-box">
                    <button className="send-cancel-btn" onClick={() => {
                        setPage('MyWallet');
                    }}>취소</button>
                    <button className="send-btn">보내기</button>
                </div>
            </div>
        </div>
    );
};

export default Send;
