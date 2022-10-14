import React from 'react';
import './Start.css';
import Header from "../../containers/Header/Header";
import {useSetRecoilState} from "recoil";
import {pageState} from "../../recoil";

const Start = () => {
    const setPage = useSetRecoilState(pageState);

    return (
        <div className="Start">
            <Header></Header>
            <div className="title"><span className="title-main">A-MAN</span> 방문을 환영합니다</div>

            <div className="sub-title">아스타 및 분산형 웹에 연결합니다.</div>
            <div className="sub-title sub-title1">반갑습니다.</div>

            <button className="start-btn" onClick={() => {
                setPage('Select');
            }}>시작하기</button>
        </div>
    );
};

export default Start;
