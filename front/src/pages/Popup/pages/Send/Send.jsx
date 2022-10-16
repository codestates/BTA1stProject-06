import React, { useState } from 'react';
import './Send.css';
import {loadingState, pageState} from "../../recoil";
import {useRecoilValue, useSetRecoilState} from "recoil";
import Header from "../../containers/Header/Header";
import { chainState, selectedPairState } from '../../recoil';
import { DecimalPlaceFromPlanck, Chain, transferNativeToken, RpcEndpoint, getPairFromSeed } from '../../modules/usePolkadotAPI';
import bigDecimal from 'js-big-decimal';

const Send = () => {
    const setPage = useSetRecoilState(pageState);
    const [toAddr, setToAddr] = useState("");
    const [amount, setAmount] = useState(0n);
    const chain = useRecoilValue(chainState);
    const pair = useRecoilValue(selectedPairState);

    const onAddressChange = (e) => {
        setToAddr(e.target.value);
    }

    const onAmountChange = (e) => {
        let value;
        if (e.target.value === "" || e.target.value === undefined) {
            value = "0";
        } else {
            value = String(e.target.value);
        }
        if (chain === "POLKADOT") {
            value = value + "e10";
            // console.log("Polkadot amount: ", value);
        } else if (chain === "ASTAR") {
            value = value + "e18";
            // console.log("Astar amount: ", value);
        } else {
            value = value + "e12";
            // console.log("Default amount: ", value);
        }
        const toBigDecimal = new bigDecimal(value);
        const amount = toBigDecimal.round(0, bigDecimal.RoundingModes.DOWN).getValue();
        // console.log(amount);
        setAmount(BigInt(amount));
    }

    const handleSendBtnClick = async () => {
        try {
            // console.log(RpcEndpoint[chain]);
            // console.log(pair);
            // console.log(toAddr);
            // console.log(amount);
            const txHash = await transferNativeToken(RpcEndpoint[chain], pair, toAddr, amount);
            alert(`Tx Success!!! tx hash: ${txHash}`);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="Send">
            <Header align="left"></Header>
            
            <div className="send-box">
                <div className="send-box-title">보내기</div>

                <div className="send-input-box">
                    <input className="send-input" placeholder="주소" onChange={onAddressChange} />
                </div>     
                
                <div className="send-input-box">
                    <input className="send-input" placeholder="금액" onChange={onAmountChange}/>
                </div>

                <div className="send-btn-box">
                    <button className="send-cancel-btn" onClick={() => {
                        setPage('MyWallet');
                    }}>취소</button>
                    <button className="send-btn" onClick={handleSendBtnClick}>보내기</button>
                </div>
            </div>
        </div>
    );
};

export default Send;
