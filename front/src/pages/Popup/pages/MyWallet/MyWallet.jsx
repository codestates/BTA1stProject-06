import React, {useEffect} from 'react';
import './MyWallet.css';
import {chainState, pageState, selectedNickNameState, selectedPairState} from "../../recoil";
import {useRecoilValue, useSetRecoilState} from "recoil";
import Header from "../../containers/Header/Header";
import { DecimalPlaceFromPlanck, getFreeBalance, RpcEndpoint, SS58Format } from '../../modules/usePolkadotAPI';
import { useState } from 'react';
import { encodeAddress } from '@polkadot/util-crypto';
import bigDecimal from 'js-big-decimal';

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
        setBalance('........');
        const endpoint = RpcEndpoint[chain];
        const balance = await getFreeBalance(endpoint, selectedPair.address);
        
        const shortBalance = await loadBalance(balance);
        console.log(shortBalance);
        setBalance(balance.toString());
    }

    const loadBalance = async (value) => {
        const units = new bigDecimal (value.toString());
        const divider = new bigDecimal("1e" + DecimalPlaceFromPlanck[chain]);
        const balance = units.divide(divider, 4);
        return balance.getValue();
    }

    return (
        <div className="MyWallet">
            <Header align="left"></Header>


            <div className="wallet-info-box1">
                <div className='wall-info-nickname'>{selectedNickName}</div>
                <div className='wall-info-address'>
                    <div className='address-type'>default address</div>
                    {selectedPair.address}

                    <div className='address-type'>encoding address</div>
                    {chain === "POLKADOT" &&
                        <div>{`${encodeAddress(selectedPair.publicKey, SS58Format.POLKADOT)}`}</div>
                    }
                    {chain === "KUSAMA" &&
                        <div>{`${encodeAddress(selectedPair.publicKey, SS58Format.KUSAMA)}`}</div>
                    }
                    {chain === "ASTAR" &&
                        <div>{`${encodeAddress(selectedPair.publicKey, SS58Format.ASTAR)}`}</div>
                    }
                    {chain === "ACALA" &&
                        <div>{`${encodeAddress(selectedPair.publicKey, SS58Format.ACALA)}`}</div>
                    }
                    {chain === "ROCOCO" &&
                        <div>{`${selectedPair.address}`}</div>
                    }
                    {chain === "ROCOCO_CONTRACTS" &&
                        <div>{`${selectedPair.address}`}</div>
                    }
                    
                </div>
            </div>

            <div className="wallet-info-box2">
                {balance === '' ? '............' : balance}<span className='symbol'>{chain}</span>
            </div>

            <div className="btn-box">
                {/* <button className="purchase-btn">구매</button> */}
                <button className="mywallet-send-btn" onClick={() => {
                    setPage("Send");
                }}>SEND</button>
                {(chain === "ROCOCO" || chain === "ROCOCO_CONTRACTS" )&&
                    <button className="mywallet-send-btn" onClick={() => {
                        setPage("XCMSend");
                    }}>XCM SEND</button>
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
