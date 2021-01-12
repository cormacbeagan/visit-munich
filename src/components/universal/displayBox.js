import React, { useState, useEffect, Fragment } from 'react';
import DisplayField from './displayField';

function DisplayBox({ data }) {

        return (
            <div style={displayDiv} >
                <DisplayField
                    data={data[0]}
                />
            </div>
    )
}

export default DisplayBox;

const displayDiv = {
    height: '300px',
    width: '300px',
    margin: '10px',
    backgroundColor: '#333333',
    border: '3px solid #395f78',
    boxShadow: '0 100px 80px rgba(0, 0, 0, 0.3)',
}
