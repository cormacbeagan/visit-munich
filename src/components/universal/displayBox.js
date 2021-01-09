import React, { useState, useEffect, Fragment } from 'react';
import DisplayField from './displayField';
//import DisplayText from './displayText';
//import DisplayImage from './displayImage';
import '../../styles/display.css';

function DisplayBox({ data }) {

        return (
            <div className='display' >
                <DisplayField
                    data={data[0]}
                />
            </div>
    )
}

export default DisplayBox;