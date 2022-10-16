import React, {useState} from 'react';
import './LoginWallet.css';
import {pageState, selectedPairState} from "../../recoil";
import {useSetRecoilState} from "recoil";
import Header from "../../containers/Header/Header";
import Storage from "../../modules/Storage";

const LoginWallet = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const setPage = useSetRecoilState(pageState);
    const setSelectedPair = useSetRecoilState(selectedPairState);

    const checkPassword = async () => {
        try {
            const pair = await Storage.getKeyPair(password);
            setSelectedPair(pair);
            setError(false);
            setPage('MyWallet');
        }catch (e) {
            setError(true);
        }
    }

    return (
        <div className="LoginWallet">
            <Header></Header>

            <div className="login-wallet-title">재방문을 환영합니다!!</div>

            <div className="login-wallet-sub-title">분산된 웹이 다음을 대기중</div>

            <div className="login-password-input-box">
                <input className="login-password-input" type="password" placeholder="비밀번호" onChange={(e) => {
                    setPassword(e.target.value)
                }} />
                <div className="error-box">
                    <span className={`login-error-message ${error ? 'login-error-visibility-visible': ''}`}>비밀번호가 틀렸습니다.</span>
                    {'\u00A0'}
                </div>
            </div>



            <div className="login-btn-box">
                <button className="login-btn" onClick={checkPassword}>잠금해제</button>
            </div>

            <div className="password-help">비밀번호를 잊으셨나요?</div>
        </div>
    );
};

export default LoginWallet;
