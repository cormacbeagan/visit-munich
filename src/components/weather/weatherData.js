import React, { useState, useEffect } from 'react';
import Button from '../universal/button';

function WeatherData({ data }) {
console.log(data)
    if(data) {
        return (
            <div style={boxText}>
                <h3 style={boxHeading}>{data.datetime}</h3>
                <div>
                    <p style={label}>Typical conditions: <span style={highlight}>{data.conditions}</span></p>
                    <p>Icon field... {data.icon}</p>
                    {data.hours ? (<p>Hourly forcast coming ...</p>
                        ) : (
                        <div>
                            <p style={label}>Max Temp: <span style={highlight}>{data.normal.tempmax.toString()}</span></p>
                            <p style={label}>Min Temp: <span style={highlight}>{data.normal.tempmin.toString()}</span></p>
                        </div>
                    )}
                    <p style={label}>Rainfall: <span style={highlight}>{data.precip}</span></p>
                    <p style={label}>Avg Wind Speed: <span style={highlight}>{data.windspeed}km/h</span></p>
                    <p style={label}>Sunrise: <span style={highlight}>{data.sunrise}</span></p>
                    <p style={label}>Sunset: <span style={highlight}>{data.sunset}</span></p>
                    <p style={label}>Data source type: <span style={highlight}>{data.source}</span></p>

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
    maxWidth: '220px',
}

const highlight = {
    color: '#cecbcb', 

}

const boxDiv = {
    marginLeft: '-5px'
}

const logoStyle = {
    height: '25px', 
    width: '25px', 
    position: 'absolute', 
    top: '30px', 
    right: '30px', 
    cursor: 'pointer'
}

const divBottom = {
    position: 'absolute', 
    bottom: '-5px', 
    left: '20px'
}

const label = {
    margin: '0',
    color: '#51748b',
}

const bandFlex = {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'left', 
    flexWrap: 'wrap'
}

const bandStyle = {
    marginTop: '0', 
    marginRight: '12px', 
    marginBottom: '5px', 
    color: '#cecbcb',
}
