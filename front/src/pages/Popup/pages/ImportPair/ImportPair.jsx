import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import Header from '../../containers/Header/Header';
import Storage from '../../modules/Storage';
import { createPairFromSeed } from '../../modules/usePolkadotAPI';
import Validation from '../../modules/Validation';
import { pageState } from '../../recoil';
import './ImportPair.css';

const ImportPair = () => {
    const setPage = useSetRecoilState(pageState);

    const [nickname, setNickName] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');

    const checkNickName = () => {
        if(nickname === ''){setError1(''); return;}
        if(!Validation.check(nickname, Validation.nickname)){
            setError1('특수문자 제외 2자~ 20자');
            return;
        }

        setError1('');
    }


    const importAccount = async () => {
        try{          
            if(nickname === ''){setError1('닉네임을 입력해주세요'); return;}

            if(error1 !== '') return;
            
            if(mnemonic === '') {
                setError2('입력해주세요');
                return;
            }

            await Storage.addMnemonicList(mnemonic, nickname);

            setPage('MyWallet');
        }catch(e){
            console.log(e);
            if(e === '닉네임 중복 입니다'){
                setError1('닉네임 중복 입니다');
                return;
            }
            setError2('잘못된 니모닉 입니다');
        }
    }

    useEffect(() => {
        checkNickName();
    }, [nickname, mnemonic])

    return (
        <div className="ImportPair">
            <Header align="left"></Header>

            <div className="import-pair-box">
                <div className="import-pair-title">Import Pair</div>

                <div className='import-pair-nickname-input-box'>
                    <input className="import-pair-nickname-input" placeholder="닉네임" onChange={(e)=>{
                        setNickName(e.target.value);
                    }}/>
                </div>
                <div style={{'marginBottom': "10px"}}>
                    {'\u00A0'}
                    <span className={`${error1 === ''? '': 'visibility-visible'} import-pair-error-message`}>{error1}</span>
                </div>

                <div className='import-pair-syntax-input-box'>
                    <textarea className="import-pair-syntax-input" placeholder="니모닉" onChange={(e)=>{
                        setMnemonic(e.target.value);
                    }}/>
                </div>
                <div>
                    {'\u00A0'}
                    <span className={`${error2 === ''? '': 'visibility-visible'} import-pair-error-message`}>{error2}</span>
                </div>

                <div className='import-btn-box'>
                    <button className='import-btn' onClick={importAccount}>IMPORT</button>
                </div>

            </div>
        </div>
    );
};

export default ImportPair;
