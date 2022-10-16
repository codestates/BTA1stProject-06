import React from 'react';
import './ChainItem.css';

const ChainItem = ({chainName, selectChain}) => {
    return (
        <div className="ChainItem" onClick={() => {
            selectChain(chainName);
        }}>
            {chainName}
        </div>
    );
};

export default ChainItem;
