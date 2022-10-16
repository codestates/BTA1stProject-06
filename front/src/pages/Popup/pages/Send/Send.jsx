import React, { useState } from 'react';
import './Send.css';
import {loadingState, pageState} from "../../recoil";
import {useRecoilValue, useSetRecoilState} from "recoil";
import Header from "../../containers/Header/Header";
import { chainState, selectedPairState } from '../../recoil';
import { DecimalPlaceFromPlanck, Chain, transferNativeToken, RpcEndpoint, getPairFromSeed, getFreeBalance } from '../../modules/usePolkadotAPI';
import bigDecimal from 'js-big-decimal';
import { useEffect } from 'react';

const Send = () => {
    const setPage = useSetRecoilState(pageState);
    const [toAddr, setToAddr] = useState("");
    const [amount, setAmount] = useState(0n);
    const [balance, setBalance] = useState("0");
    const chain = useRecoilValue(chainState);
    const pair = useRecoilValue(selectedPairState);

    useEffect(async ()=>{
        const balance = await loadBalance();
        setBalance(balance);
    }, [])

    const loadBalance = async () => {
        const value = await getFreeBalance(RpcEndpoint[chain], pair.address);
        const units = new bigDecimal(value.toString());
        const divider = new bigDecimal("1e12");
        console.log(divider.getValue());
        const balance = units.divide(divider, 4);
        return balance.getValue();
    }

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
            const balance = await loadBalance();
            setBalance(balance);
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
                <div className="send-balance-box">{`Balance: ${balance}`}</div>

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
