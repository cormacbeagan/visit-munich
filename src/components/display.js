import React, { useState, useEffect, Fragment } from 'react';
import DisplayText from './displayText';
import DisplayImage from './displayImage';
import './../styles/display.css';

function Display({ type, data }) {

    if(type === 'image') {
        return (
            <div className='display-image'>
                <DisplayImage 
                    data={data}
                />
            </div>
        )
    } else {
        return (
            <div className='display' >
                <DisplayText
                    type={type} 
                    data={data}
                />
            </div>
    )
    }
}


export default Display;