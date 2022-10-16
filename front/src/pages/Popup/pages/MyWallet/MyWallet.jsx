import React, {useEffect} from 'react';
import './MyWallet.css';
import {chainState, loadingState, pageState, selectedNickNameState, selectedPairState} from "../../recoil";
import {useRecoilValue, useSetRecoilState} from "recoil";
import Header from "../../containers/Header/Header";
import { getFreeBalance, RpcEndpoint, SS58Format } from '../../modules/usePolkadotAPI';
import { useState } from 'react';
import { encodeAddress } from '@polkadot/util-crypto';

const MyWallet = () => {
    const setPage = useSetRecoilState(pageState);
    const chain = useRecoilValue(chainState);
    const selectedNickName = useRecoilValue(selectedNickNameState);
    const selectedPair = useRecoilValue(selectedPairState);

    const [balance, setBalance] = useState('');

    useEffect(() => {
        getBalance();
    }, [selectedNickName, selectedPair, chain])

    const getBalance = async () => {
        setBalance('............');
        const endpoint = RpcEndpoint[chain];
        const balance = await getFreeBalance(endpoint, selectedPair.address);
        setBalance(balance.toString());
    }

    return (
        <div className="MyWallet">
            <Header align="left"></Header>


            <div className="wallet-info-box1">
                <div className='wall-info-nickname'>{selectedNickName}</div>
                <div className='wall-info-address'>{selectedPair.address}</div>
                <div>{selectedNickName}</div>
                <div>{selectedPair.address}</div>
                {chain === "POLKADOT" &&
                    <div>{`POLKADOT:  ${encodeAddress(selectedPair.publicKey, SS58Format.POLKADOT)}`}</div>
                }
                {chain === "KUSAMA" &&
                    <div>{`KUSAMA:  ${encodeAddress(selectedPair.publicKey, SS58Format.KUSAMA)}`}</div>
                }
                {chain === "ASTAR" &&
                    <div>{`ASTAR:  ${encodeAddress(selectedPair.publicKey, SS58Format.ASTAR)}`}</div>
                }
                {chain === "ACALA" &&
                    <div>{`ACALA:  ${encodeAddress(selectedPair.publicKey, SS58Format.ACALA)}`}</div>
                }
            </div>

            <div className="wallet-info-box2">
                {balance === '' ? '............' : balance}
            </div>

            <div className="btn-box">
                {/* <button className="purchase-btn">구매</button> */}
                <button className="mywallet-send-btn" onClick={() => {
                    setPage("Send");
                }}>보내기</button>
                {(chain === "ROCOCO" || chain === "ROCOCO_CONTRACTS" )&&
                    <button className="mywallet-send-btn" onClick={() => {
                        setPage("XCMSend");
                    }}>XCM 보내기</button>
                }
            </div>
            
            {/* <div className="history-box">
                <div className="history-title">활동</div>
                <div className="history-list">

                </div>
            </div> */}
        </div>
    );
};

export default MyWallet;
