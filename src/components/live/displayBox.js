import React from 'react';
import DisplayField from './displayField';

function DisplayBox({ data, handleVenue, bands }) {

    return (
        <div style={displayDiv} >
            <DisplayField
                bands={bands}
                data={data[0]}
                handleVenue={handleVenue}
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
    borderRadius: '20px',
    border: '3px solid #395f78',
    boxShadow: '0 100px 80px rgba(0, 0, 0, 0.3)',
}
