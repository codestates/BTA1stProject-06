import React from 'react';
import './ProtectWallet.css';
import {useSetRecoilState} from "recoil";
import {pageState} from "../../recoil/index";
import Header from "../../containers/Header/Header";

const ProtectWallet = () => {
    const setPage = useSetRecoilState(pageState);

    return (
        <div className="ProtectWallet">
            <Header goHome={false}></Header>

            <div className="help-box">
                <div className="help-sub-box">
                    <div className="help-title">'비밀 복구 구문'이란 무엇인가요?</div>
                    <div>복구 구문은 지갑과 자금의 '마스터 키'입니다.</div>
                </div>

                <div className="help-sub-box">
                    <div className="help-title">비밀 복구 구문은 어떻게 저장하나요?</div>
                    <div>- 비밀번호 관리자에 저장</div>
                    <div>- 은행 금고에 보관.</div>
                    <div>- 대여 금고에 보관.</div>
                    <div>- 적어서 여러 비밀 장소에 보관하세요.</div>
                </div>

                <div className="help-sub-box">
                    <div className="help-title">비밀 복구 구문을 공유해야 하나요?</div>
                    <div>절대로, 누구와도, 심지어 MetaMask와도 비밀 구문을 공유하면 안 됩니다!</div>
                    <div>복구 구문을 요청하는 사람은 사기를 치려는 것입니다.</div>
                </div>
            </div>

            <div className="next-btn-box">
                <button className="next-btn" onClick={() => {
                    setPage("SecretRecoverySyntax");
                }}>다음</button>
            </div>
        </div>
    );
};

export default ProtectWallet;
