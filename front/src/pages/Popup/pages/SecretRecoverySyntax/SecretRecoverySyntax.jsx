import React from 'react';
import './SecretRecoverySyntax.css';
import {useSetRecoilState} from "recoil";
import {pageState} from "../../recoil/index";
import Header from "../../containers/Header/Header";

const SecretRecoverySyntax = () => {
    const setPage = useSetRecoilState(pageState);

    return (
        <div className="ProtectWallet">
            <Header backPageName="ProtectWallet"></Header>

            비밀 복구 구문
            비밀 백업 구문을 이용하면 계정을 쉽게 백업하고 복구할 수 있습니다.
            경고: 비밀 복구 구문은 절대로 공개하지 마세요. 이 구문이 있는 사람은 귀하의 Ether를 영원히 소유할 수 있습니다.

            팁:
            이 구문을 1Password 같은 비밀번호 관리자에 저장하세요.
            메모지에 이 구문을 적어 안전한 곳에 보관하세요. 보안을 더욱 강화하고 싶다면 여러 메모지에 적은 다음 2~3곳에 보관하세요.
            이 구문을 기억하세요.
            이 비밀 복구 구문을 다운로드하여 암호화된 외장 하드 드라이브나 저장 매체에 안전하게 보관하세요.
            <button>다음</button>
        </div>
    );
};

export default SecretRecoverySyntax;
