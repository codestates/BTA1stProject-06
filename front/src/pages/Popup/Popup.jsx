import React from 'react';
import './Popup.css';
import Start from "./pages/Start/Start";
import Select from "./pages/Select/Select";
import CreateWallet from "./pages/CreateWallet/CreateWallet";
import {useRecoilValue} from "recoil";
import {pageState} from "./recoil";
import ProtectWallet from "./pages/ProtectWallet/ProtectWallet";
import SecretRecoverySyntax from "./pages/SecretRecoverySyntax/SecretRecoverySyntax";
import Loading from "./containers/Loading/Loading";

const Popup = () => {
    const page = useRecoilValue(pageState);

    const render = () => {
        const qwer = 'ProtectWallet';
        console.log(page);
        switch(page){
            case 'Start':
                return <Start />
            case 'Select':
                return <Select />
            case 'CreateWallet':
                return <CreateWallet />
            case 'ProtectWallet':
                return <ProtectWallet />
            case 'SecretRecoverySyntax':
                return <SecretRecoverySyntax />
            default:
                return <div>not page</div>;
        }
    }

    return (
            <div className="App">
                {render()}
                <Loading></Loading>
            </div>
    );
};

export default Popup;
