import React from 'react';
import './CreateWallet.css';
import Header from "../../containers/Header/Header";

const CreateWallet = () => {
    return (
        <div className="CreateWallet">
            <Header></Header>
            
            <div>비밀번호 만들기</div>
            <div>
                <div>새 비밀번호(8자리 이상)</div>
                <input />
            </div>
            <div>
                <div>비밀번호 확인</div>
                <input />
            </div>

            <div>
                <input type="checkbox" />
                <div><span>이용 약관</span>의 내용을 읽고 이에 동의합니다.</div>
            </div>
            
            <button>생성</button>
        </div>
    );

};

export default CreateWallet;
