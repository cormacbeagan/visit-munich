import React from 'react';
import DisplayText from './displayText';
import DisplayImage from './displayImage';

function Display({ type, data }) {

    if(type === 'image') {
        return (
            <div style={displayDiv}>
                <DisplayImage 
                    data={data}
                />
            </div>
        )
    } else {
        return (
            <div style={displayDiv} >
                <DisplayText
                    project={data}
                />
            </div>
    )
    }
}

export default Display;

const displayDiv = {
    height: '300px',
    width: '300px',
    margin: '10px',
    backgroundColor: '#333333',
    borderRadius: '20px',
    border: '3px solid #395f78',
    boxShadow: '0 100px 80px rgba(0, 0, 0, 0.3)',
}
