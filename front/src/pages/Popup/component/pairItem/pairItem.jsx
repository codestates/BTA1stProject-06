import React from 'react';
import './PairItem.css';

const PairItem = ({index}) => {
    return (
        <div className="PairItem" >
            {index}
        </div>
    );
};

export default PairItem;
