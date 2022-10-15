import Start from "../pages/Start/Start";
import Select from "../pages/Select/Select";
import CreateWallet from "../pages/CreateWallet/CreateWallet";
import ProtectWallet from "../pages/ProtectWallet/ProtectWallet";
import SecretRecoverySyntax from "../pages/SecretRecoverySyntax/SecretRecoverySyntax";
import LoginWallet from "../pages/LoginWallet/LoginWallet";
import MyWallet from "../pages/MyWallet/MyWallet";
import Send from "../pages/Send/Send";
import React from "react";

export const render = (page) => {
    const qwer = 'CreateWallet';

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
        case 'LoginWallet':
            return <LoginWallet />
        case 'MyWallet':
            return <MyWallet />
        case 'Send':
            return <Send />
        default:
            return <div>not page</div>;
    }
}