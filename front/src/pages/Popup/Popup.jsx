import React, { useEffect } from 'react';
import './Popup.css';
import {render} from "./router";
import { initWasm } from '@polkadot/wasm-crypto/initOnlyAsm';
import { waitReady } from '@polkadot/wasm-crypto';
import Loading from "./containers/Loading/Loading";
import { cryptoWaitReady } from '@polkadot/util-crypto';
import Storage from './modules/Storage';

const Popup = () => {
    useEffect(async ()=> {
        await initWasm();
        await waitReady();
        await cryptoWaitReady();

        // await Storage.clear();
    }, [])

    return (
        <div className="App">
            {render()}
            <Loading />
        </div>
    );
};

export default Popup;
