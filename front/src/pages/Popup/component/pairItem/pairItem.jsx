import React from 'react';
import './pairItem.css';

const PairItem = ({data, selectPair}) => {
     return (
        <div className="PairItem" onClick={() => {
            selectPair(data);
        }}>
            <div>{data[0]}</div>
            <div>{data[1].address.slice(0, 10)}...{data[1].address.slice(-10, data[1].address.length)}</div>
        </div>
    );
};

export default PairItem;
