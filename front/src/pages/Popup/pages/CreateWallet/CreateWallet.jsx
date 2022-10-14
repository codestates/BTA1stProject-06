import React, {useEffect, useState} from 'react';
import './CreateWallet.css';
import Header from "../../containers/Header/Header";
import {useSetRecoilState} from "recoil";
import {pageState} from "../../recoil/index";

const CreateWallet = () => {
    const setPage = useSetRecoilState(pageState);

    const [password, setPassWord] = useState('');
    const [rePassword, setRePassWord] = useState('');
    const [checkBox, setCheckBox] = useState(false);

    const [allCheck, setAllCheck] = useState(false);

    const checkValue = () => {
        if(password === '' || rePassword === '' || checkBox === false){
            setAllCheck(false);
            return;
        }

        setAllCheck(true);
    }

    useEffect(() => {
        checkValue();
    }, [password, rePassword, checkBox, allCheck])

    return (
        <div className="CreateWallet">
            <Header backPageName="Select"></Header>

            <div className="create-wallet-wrap">

                <div className="create-wallet-title">비밀번호 만들기</div>
                <div className="create-wallet-input-box">
                    <div className="create-wallet-password-title">새 비밀번호(8자리 이상)</div>
                    <input className="password-input" onChange={(e) => {
                        setPassWord(e.target.value)
                        checkValue();
                    }} />
                    <div className="error-message">비밀번호가 짧아요</div>
                </div>
                <div className="create-wallet-input-box">
                    <div className="create-wallet-password-title">비밀번호 확인</div>
                    <input className="password-input" onChange={(e) => {
                        setRePassWord(e.target.value);
                        checkValue();
                    }} />
                    <div className="error-message">비밀번호가 짧아요</div>
                </div>

                <div className="agree-box">
                    <input className="agree-check-box" type="checkbox" checked={checkBox} onChange={(e) => {
                        setCheckBox(e.target.checked)
                        checkValue();
                    }} />
                    <div className="agree-box-title">
                        <span className="agree-box-main-title">이용 약관</span>의 내용을 읽고 이에 동의합니다.
                    </div>
                </div>

                <button className={`create-btn ${allCheck === true ? 'check-all' : ''}`} onClick={() => {
                    setPage('ProtectWallet');
                }}>생성</button>
            </div>
        </div>
    );

};

export default CreateWallet;
