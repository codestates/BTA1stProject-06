import React, { useEffect } from 'react';
import './Popup.css';
import Start from "./pages/Start/Start";
import Select from "./pages/Select/Select";
import {useSelector} from "react-redux";
import CreateWallet from "./pages/CreateWallet/CreateWallet";
import { test } from './modules/usePolkadotAPI';

const Popup = () => {
    const { page } = useSelector(state => state.page);
    useEffect(()=>{
        test();
    }, [])

    const render = () => {
        const qwer = 'select';
        switch(page){
            case 'start':
                return <Start />
            case 'select':
                return <Select />
            case 'createwallet':
                return <CreateWallet />
            default:
                return null;
        }
    }

    return (
            <div className="App">
                {render()}
            </div>
    );
};

export default Popup;
