import React from 'react';
import WeatherData from './weatherData';

function DisplayWeather({ data }) {

        return (
            <div style={displayDiv} >
                <WeatherData
                    data={data}
                />
            </div>
    )
}

export default DisplayWeather;

const displayDiv = {
    height: '300px',
    width: '300px',
    margin: '10px',
    backgroundColor: '#333333',
    borderRadius: '20px',
    border: '3px solid #395f78',

}
//boxShadow: '0 100px 80px rgba(0, 0, 0, 0.3)',
