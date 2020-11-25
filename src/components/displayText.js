import React, { useState, useEffect, Fragment } from 'react';

function DisplayText({ data }) {

    return (
        <Fragment>
            <div style={boxText}>
                <h2>{data.name}</h2>
                <p>Political sarcastic and poignant.</p>
                <p>Gmunder Str. 35-27, 81379 München</p>
                <a href='https://goo.gl/maps/3b4r6Y7sP2iJQiRV8' target='_blank'>Directions</a>
            </div>
        </Fragment>
        )
}

const boxText = {
    margin: '10px',
    color: '#333',
}

export default DisplayText;

