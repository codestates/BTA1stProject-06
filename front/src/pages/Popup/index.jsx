import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./redux/index";

// 스토어 생성
const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <Popup />
    </Provider>
    , window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
