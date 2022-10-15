import React, {useEffect, useState} from 'react';
import './CreateWallet.css';
import Header from "../../containers/Header/Header";
import {useSetRecoilState} from "recoil";
import {pageState} from "../../recoil/index";
import {createMnemonic, createPairFromSeed, crea} from "../../modules/usePolkadotAPI";
import {cryptoWaitReady} from "@polkadot/util-crypto";

const CreateWallet = () => {
    const setPage = useSetRecoilState(pageState);

    const [password, setPassWord] = useState('');
    const [rePassword, setRePassWord] = useState('');
    const [checkBox, setCheckBox] = useState(false);

    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');

    const [allCheck, setAllCheck] = useState(false);

    const checkAllValue = () => {
        if(password === '' || rePassword === '' || checkBox === false){
            setAllCheck(false);
            return;
        }

        setAllCheck(true);
    }

    const checkPassWord = (e) => {
        setPassWord(e.target.value);

        if(e.target.value === ''){
            setError1('');
            return;
        }

        setError1('er');
    }

    const checkRePassWord = (e) => {
        setRePassWord(e.target.value);

        if(e.target.value === ''){
            setError2('');
            return;
        }

        setError2('er');
    }

    const createWallet = async () => {
        // await cryptoWaitReady();
        // const mnemonic = createMnemonic();
        // const pair = createPairFromSeed(mnemonic);
        //
        // console.log(pair);

        setPage('ProtectWallet');
    }

    useEffect(() => {
        checkAllValue();
    }, [password, rePassword, checkBox])

    return (
        <div className="CreateWallet">
            <Header backPageName="Select"></Header>

            <div className="create-wallet-wrap">

                <div className="create-wallet-title">비밀번호 만들기</div>
                <div className="create-wallet-input-box">
                    <div className="create-wallet-password-title">새 비밀번호(8자리 이상)</div>
                    <input className="password-input" onChange={checkPassWord} />
                    <div className={`error-message ${error1 === ''? '': 'visibility-visible'}`}>{error1}</div>
                </div>
                <div className="create-wallet-input-box">
                    <div className="create-wallet-password-title">비밀번호 확인</div>
                    <input className="password-input" onChange={checkRePassWord} />
                    <div className={`error-message ${error2 === ''? '': 'visibility-visible'}`}>{error2}</div>
                </div>

                <div className="agree-box">
                    <input className="agree-check-box" type="checkbox" checked={checkBox} onChange={(e) => {
                        setCheckBox(e.target.checked)
                    }} />
                    <div className="agree-box-title">
                        <span className="agree-box-main-title">이용 약관</span>의 내용을 읽고 이에 동의합니다.
                    </div>
                </div>

                <button className={`create-btn ${allCheck === true ? 'check-all' : ''}`} onClick={createWallet}>생성</button>
            </div>
        </div>
    );

};

export default CreateWallet;
