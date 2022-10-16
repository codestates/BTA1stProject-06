import React from 'react';
import './SecretRecoverySyntax.css';
import {useRecoilState, useSetRecoilState} from "recoil";
import {encryptMnemonicState, mnemonicState, pageState} from "../../recoil/index";
import Header from "../../containers/Header/Header";
import Storage from "../../modules/Storage";

const SecretRecoverySyntax = () => {
    const setPage = useSetRecoilState(pageState);
    const [encryptMnemonic, setEncryptMnemonicState] = useRecoilState(encryptMnemonicState);
    const [mnemonic, setMnemonic] = useRecoilState(mnemonicState);

    const savePair = async () => {
        await Storage.setDefaultEncryptMnemonic(encryptMnemonic);
        setEncryptMnemonicState('');
        setMnemonic('');
        setPage("LoginWallet");
    }

    return (
        <div className="ProtectWallet">
            <Header backPageName="ProtectWallet" goHome={false}></Header>

            <div>
                <div className="protect-wallet-title">비밀 복구 구문</div>

                <div className="protect-wallet-sub-title">비밀 백업 구문을 이용하면 계정을 쉽게 백업하고 복구할 수 있습니다.</div>
                <div className="protect-wallet-sub-title">경고: 비밀 복구 구문은 절대로 공개하지 마세요.</div>

                <div className="syntax-box">{mnemonic}</div>

            </div>

            <div className="protect-wallet-next-btn-box">
                <button className="protect-wallet-next-btn" onClick={savePair}>완료</button>
            </div>

            <div className="tip-box">
                <div>팁: 이 구문을 기억하세요. 이 비밀 복구 구문을 다운로드하여 암호화된 외장 하드 드라이브나 저장 매체에 안전하게 보관하세요.</div>
            </div>
        </div>
    );
};

export default SecretRecoverySyntax;
