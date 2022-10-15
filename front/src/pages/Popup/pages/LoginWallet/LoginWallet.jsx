import React from 'react';
import './LoginWallet.css';
import {loadingState} from "../../recoil";
import {useRecoilValue} from "recoil";
import Header from "../../containers/Header/Header";

const LoginWallet = () => {
    const isLoading = useRecoilValue(loadingState)

    return (
        <div className="LoginWallet">
            <Header></Header>

            <div className="login-wallet-title">재방문을 환영합니다!!</div>

            <div className="login-wallet-sub-title">분산된 웹이 다음을 대기중</div>

            <div className="login-password-input-box">
                <input className="login-password-input" placeholder="비밀번호" />
            </div>

            <div className="login-btn-box">
                <button className="login-btn">잠금해제</button>
            </div>

            <div className="password-help">비밀번호를 잊으셨나요?</div>
        </div>
    );
};

export default LoginWallet;
