import React, {useEffect, useState} from 'react';
import './CreateWallet.css';
import Header from "../../containers/Header/Header";
import {useSetRecoilState} from "recoil";
import {pageState, encryptMnemonicState, mnemonicState} from "../../recoil/index";
import {createMnemonic} from "../../modules/usePolkadotAPI";
import Validation from "../../modules/Validation";
import CryptoJS from "crypto-js";

const CreateWallet = () => {
    const setPage = useSetRecoilState(pageState);
    const setMnemonic= useSetRecoilState(mnemonicState);
    const setEncryptMnemonic = useSetRecoilState(encryptMnemonicState);

    const [password, setPassWord] = useState('');
    const [rePassword, setRePassWord] = useState('');
    const [checkBox, setCheckBox] = useState(false);

    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');

    const [allCheck, setAllCheck] = useState(false);

    const checkPassWord = () => {
        if(password === ''){setError1(''); return;}
        if(!Validation.check(password, Validation.all_basic8)){setError1('비밀번호가 짧아요'); return;}

        setError1('');
    }

    const checkRePassWord = () => {
        if(rePassword === ''){setError2(''); return;}
        if(rePassword !== password){setError2('비밀번호가 달라요'); return;}

        setError2('');
    }

    const checkAllValue = () => {
        if(password === '' || rePassword === '' || checkBox === false){
            setAllCheck(false);
            return;
        }

        setAllCheck(true);
    }


    const createWallet = async () => {
        try {
            const mnemonic = createMnemonic();
            const encryptMnemonic = CryptoJS.AES.encrypt(mnemonic, password).toString();
            console.log(encryptMnemonic)
            setEncryptMnemonic(encryptMnemonic);
            setMnemonic(mnemonic);
            setPage("ProtectWallet");
        }catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        checkPassWord();
        checkRePassWord();
        checkAllValue();
    }, [password, rePassword, checkBox])

    return (
        <div className="CreateWallet">
            <Header backPageName="Select"></Header>

            <div className="create-wallet-wrap">

                <div className="create-wallet-title">비밀번호 만들기</div>
                <div className="create-wallet-input-box">
                    <div className="create-wallet-password-title">새 비밀번호(8자리 이상)</div>
                    <input className="password-input" type="password" onChange={(e) => {
                        setPassWord(e.target.value);
                    }} />
                    <div>
                        {'\u00A0'}
                        <span className={`error-message ${error1 === ''? '': 'visibility-visible'}`}>{error1}</span>
                    </div>
                </div>
                <div className="create-wallet-input-box">
                    <div className="create-wallet-password-title">비밀번호 확인</div>
                    <input className="password-input" type="password" onChange={(e) => {
                        setRePassWord(e.target.value);
                    }} />
                    <div>
                        {'\u00A0'}
                        <span className={`error-message ${error2 === ''? '': 'visibility-visible'}`}>{error2}</span>
                    </div>
                </div>

                <div className="agree-box">
                    <input className="agree-check-box" type="checkbox" checked={checkBox} onChange={(e) => {
                        setCheckBox(e.target.checked)
                    }} />
                    <div className="agree-box-title">
                        <span className="agree-box-main-title">이용 약관</span>의 내용을 읽고 이에 동의합니다.
                    </div>
                </div>

                <button className={`create-btn ${allCheck === true ? 'check-all' : ''}`} onClick={createWallet}>다음</button>
            </div>
        </div>
    );

};

export default CreateWallet;
