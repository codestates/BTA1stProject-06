import React from 'react';
import './Start.css';
import {useDispatch} from "react-redux";
import {pageMove} from "../../redux/modules/page";
import Header from "../../containers/Header/Header";

const Start = () => {
    const dispatch = useDispatch();

    return (
        <div className="Start">
            <Header></Header>
            <div className="title"><span className="title-main">A-MAN</span> 방문을 환영합니다</div>

            <div className="sub-title">아스타 및 분산형 웹에 연결합니다.</div>
            <div className="sub-title sub-title1">반갑습니다.</div>

            <button className="start-btn" onClick={() => {
                dispatch(pageMove('select'));
            }}>시작하기</button>
        </div>
    );
};

export default Start;
