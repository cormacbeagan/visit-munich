import React, { useState, useEffect } from 'react';
import moment from 'moment';
import StatsWeather from './statsWeather';

function WeatherData({ data }) {

    if(data) {
        return (
            <div style={boxText}>
                <h3 style={boxHeading}>{moment(data.datetime).format('ddd Do MMM YYYY')}</h3>
                <div style={blur}>
                    <StatsWeather data={data}/>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default WeatherData;

const boxText = {
    margin: '10px',
    color: 'white',
    contain: 'items',
}

const boxHeading = {
    color: '#cecbcb', 
    textAlign: 'center',
}

const blur = {
    background: 'rgba(0,0,0, 0.4)', 
    boxShadow: '0px 0px 20px 20px rgba(0,0,0, 0.4)',
    borderRadius: '20px',
}