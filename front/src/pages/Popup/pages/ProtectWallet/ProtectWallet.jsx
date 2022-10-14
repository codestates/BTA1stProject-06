import React from 'react';
import './ProtectWallet.css';
import {useSetRecoilState} from "recoil";
import {pageState} from "../../recoil/index";
import Header from "../../containers/Header/Header";

const ProtectWallet = () => {
    const setPage = useSetRecoilState(pageState);

    return (
        <div className="ProtectWallet">
            <Header></Header>

            <div>'비밀 복구 구문'이란 무엇인가요?
                복구 구문은 지갑과 자금의 '마스터 키'입니다.
                비밀 복구 구문은 어떻게 저장하나요?
                비밀번호 관리자에 저장
                은행 금고에 보관.
                대여 금고에 보관.
                적어서 여러 비밀 장소에 보관하세요.
                비밀 복구 구문을 공유해야 하나요?
                절대로, 누구와도, 심지어 MetaMask와도 비밀 구문을 공유하면 안 됩니다!
                복구 구문을 요청하는 사람은 사기를 치려는 것입니다.</div>
            
            <button onClick={() => {
                setPage("SecretRecoverySyntax");
            }}>다음</button>
        </div>
    );
};

export default ProtectWallet;
