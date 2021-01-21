import React from 'react'
import { TiWeatherPartlySunny, TiWeatherCloudy, TiWeatherSunny, TiWeatherShower, TiWeatherSnow } from 'react-icons/ti';



function WeatherIcon({icon}) {
    let symbol;
    switch (icon) {
        case 'partly-cloudy-day':
            symbol = <TiWeatherPartlySunny style={iconStyle}/>;
            break;
        case 'clear-day':
            symbol = <TiWeatherSunny style={iconStyle}/>;
            break;
        case 'cloudy':
            symbol = <TiWeatherCloudy style={iconStyle}/>;
            break;
        case 'rain':
            symbol = <TiWeatherShower style={iconStyle}/>;
            break;
        case 'snow':
            symbol = <TiWeatherSnow style={iconStyle} />
            break;
        default: 
            symbol = <p>Cloudy with a chance of ERRORS</p>
    }



    return (
        <div style={divStyle}>
            {symbol}
        </div>
    )
}

export default WeatherIcon;

const divStyle = {
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
}

const iconStyle = {
    height: '50px',
    width: '50px',
    color: '#e2e2e2'
}