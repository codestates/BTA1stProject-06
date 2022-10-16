import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import Header from '../../containers/Header/Header';
import Storage from '../../modules/Storage';
import { createMnemonic, createPairFromSeed } from '../../modules/usePolkadotAPI';
import Validation from '../../modules/Validation';
import { pageState } from '../../recoil';
import './AddPair.css';

const AddPair = () => {
    const setPage = useSetRecoilState(pageState);

    const [isVisible, setVisible] = useState(false);
    const [nickname, setNickName] = useState('');
    const [error, setError] = useState('');
    const [mnemonic, setMnemonic] = useState('');

    const [next, setNext] = useState('GENERATE');

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
            if(nickname === '' && isVisible === false){setError('닉네임을 입력해주세요'); return;}

            if(isVisible) {
                setPage('MyWallet');
            }

            if(error !== '') return;

            const mnemonic = createMnemonic();
            setMnemonic(mnemonic);

            await Storage.addMnemonicList(mnemonic, nickname);
            setNickName('')
            setVisible(true);
            setNext('WALLET');
        }catch(e){
            console.log(e);
            setError(e)
        }
    }

    useEffect(() => {
        checkNickName();
    }, [nickname])

    return (
        <div className="AddPair">
            <Header align="left"></Header>

            <div className="add-pair-box">
                <div className="add-pair-title">Generate Pair</div>

                <div className='add-pair-title-nickname-input-box'>
                    <input className="add-pair-title-nickname-input" value={nickname} placeholder="닉네임" onChange={(e)=>{
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
        
                <div className={`${isVisible ? 'visibility-visible' : ''}`} style={{'visibility': 'hidden', "fontWeight": '600'}}>
                    기억하세요!!!
                </div>

                <div className='generate-btn-box'>
                    <button className='generate-btn' onClick={generateAccount}>{next}</button>
                </div>

            </div>
        </div>
    );
};

export default AddPair;
