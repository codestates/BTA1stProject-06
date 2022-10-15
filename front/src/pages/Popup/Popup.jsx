import React, { useEffect } from 'react';
import './Popup.css';
import {render} from "./router";
import { initWasm } from '@polkadot/wasm-crypto/initOnlyAsm';
import { waitReady } from '@polkadot/wasm-crypto';
import { cryptoWaitReady} from '@polkadot/util-crypto';
import Loading from "./containers/Loading/Loading";

const Popup = () => {
    useEffect(async ()=> {
        await initWasm();
        await waitReady();
        await cryptoWaitReady();
    }, [])

    return (
        <div className="App">
            {render()}
            <Loading />
        </div>
    );
};

export default Popup;
