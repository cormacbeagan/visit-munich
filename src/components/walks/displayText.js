import React, { useState, useEffect, Fragment } from 'react';

function DisplayText({ data }) {

    return (
            <div style={boxText}>
                <h5>{data.name}</h5>
                <p>{data.description}</p>
                {data.name && 
                <a href={`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`} 
                target='_blank'
                rel="noreferrer" 
                >Directions</a>}
            </div>
        )
}

const boxText = {
    margin: '10px',
    color: '#333',
}

export default DisplayText;

