import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Header from '../../containers/Header/Header';
import Storage from '../../modules/Storage';
import { createMnemonic, createPairFromSeed } from '../../modules/usePolkadotAPI';
import Validation from '../../modules/Validation';
import './AddPair.css';

const AddPair = () => {

    const [isVisible, setVisible] = useState(false);
    const [nickname, setNickName] = useState('');
    const [error, setError] = useState('');
    const [mnemonic, setMnemonic] = useState('');

    const checkNickName = () => {
        if(nickname === ''){setError(''); return;}
        if(!Validation.check(nickname, Validation.nickname)){
            setError('특수문자 제외 2자~ 20자');
            return;
        }

        setError('');
    }

    const generateAccount = async () => {
        try{
            if(error !== '') return;

            const mnemonic = createMnemonic();
            const pair = createPairFromSeed(mnemonic);
            console.log(pair)
            setMnemonic(mnemonic);
            // const pairs = await Storage.getPairList();
            // console.log(pairs)
            // await Storage.addPairList(pair, nickname);
            setNickName('')
            setVisible(true)
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        checkNickName();
    }, [nickname])

    return (
        <div className="AddPair">
            <Header align="left"></Header>

            <div className="add-pair-box">
                <div className="add-pair-title">계정 생성</div>

                <div className='add-pair-title-nickname-input-box'>
                    <input className="add-pair-title-nickname-input" placeholder="닉네임" onChange={(e)=>{
                        setNickName(e.target.value);
                    }}/>
                </div>
                <div>
                    {'\u00A0'}
                    <span className={`${error === ''? '': 'visibility-visible'} add-pair-error-message`}>{error}</span>
                </div>


                <div className={`add-pair-syntax-box ${isVisible ? 'visibility-visible' : ''}`}>
                    {mnemonic}
                </div>

                <div className='generate-btn-box'>
                    <button className='generate-btn' onClick={generateAccount}>생성</button>
                </div>

            </div>
        </div>
    );
};

export default AddPair;
