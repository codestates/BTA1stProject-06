import React, { useEffect } from 'react';
import './Popup.css';
import {useRecoilValue} from "recoil";
import {pageState} from "./recoil";
import Loading from "./containers/Loading/Loading";
import {render} from "./router";
import { initWasm } from '@polkadot/wasm-crypto/initOnlyAsm';
import { waitReady } from '@polkadot/wasm-crypto';
import { cryptoWaitReady } from '@polkadot/util-crypto';

const Popup = () => {
    const page = useRecoilValue(pageState);
    useEffect(async ()=> {
        await initWasm();
        await waitReady();
        await cryptoWaitReady();
    }, [])

    return (
            <div className="App">
                {render(page)}
                <Loading></Loading>
            </div>
    );
};

export default Popup;
