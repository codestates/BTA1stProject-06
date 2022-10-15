import React from 'react';
import './ChainItem.css';

const ChainItem = ({chainName}) => {

    return (
        <div className="ChainItem" >
            {chainName}
        </div>
    );
};

export default ChainItem;
