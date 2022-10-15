import { initWasm } from '@polkadot/wasm-crypto/initOnlyAsm';
import { waitReady } from '@polkadot/wasm-crypto';
import { cryptoWaitReady} from '@polkadot/util-crypto';
import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';
import {RecoilRoot} from "recoil";

render(
    <RecoilRoot>
        <Popup />
    </RecoilRoot>
    , window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
