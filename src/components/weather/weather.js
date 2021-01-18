import React, { useState, useEffect, Fragment } from 'react';
import DateForm from '../universal/dateForm';

function Weather(props) {

    const handleDates = (dates) => {
        console.log(dates)
    }

    return (
            <div>
                <DateForm handleDates={handleDates} name={'tell me its sunny'}/>
                <h2 style={{marginTop: '200px', padding: '50px'}}>The weather during your time in Munich</h2>
            </div>
    )
}

export default Weather;

