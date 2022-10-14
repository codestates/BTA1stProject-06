import React from 'react';
import './Select.css';
import Header from "../../containers/Header/Header";
import {useSetRecoilState} from "recoil";
import {pageState} from "../../recoil";

const Select = () => {
    const setPage= useSetRecoilState(pageState);

    return (
        <div className="Select">
            <Header></Header>

            <div className="select-title">A-MAN이 처음이신가요?</div>

            <div className="box-wrap">
                <div className="box">
                    <div className="box-title">아니요. 이미 비밀 복구 구문이 있습니다.</div>
                    <div className="box-sub-title">비밀 복구 구문을 사용하여 기존 지갑 가져오기</div>
                    <button className="select-btn">지갑 가져오기</button>
                </div>
                <div className="box">
                    <div className="box-title">설정을 시작하죠!</div>
                    <div className="box-sub-title">이렇게 하면 새 지갑과 비밀 복구 구문이 만들어집니다.</div>
                    <button className="select-btn" onClick={() => {
                        setPage('CreateWallet');
                    }}>지갑 생성</button>
                </div>
            </div>
        </div>
    );

};

export default Select;
