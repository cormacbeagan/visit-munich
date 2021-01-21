import React from 'react';
import TempInput from './tempInput';
import WeatherIcon from './weatherIcon';
import SunTime from './sunTime';
import MoonPhase from './moonPhase';

function StatsWeather({data}) {

    let max;
    let min;
    const checkColor = () => {
        if(data.normal) {
            max = data.normal.tempmax[2]
            min = data.normal.tempmin[0]
        } else {
            max = data.tempmax;
            min = data.tempmin;
        }
    }
    checkColor()

    return (
        <div style={{margin: '8px'}}>
            <WeatherIcon icon={data.icon}/>
            <p style={conditionsP}>{data.conditions}</p>
            <TempInput avg={data.temp} max={max} min={min} />
            <div style={sunMoon}>
                <SunTime up={data.sunrise.slice(0, 5)} down={data.sunset.slice(0, 5)} />
                <MoonPhase phase={data.moonphase}/>
            </div>
        </div>
    )
}
export default StatsWeather;


const conditionsP = {
    margin: '0',
    marginBottom: '0',
    paddingBottom: '10px',
    fontSize: '18px', 
    textAlign: 'center', 
    color: 'white', 
    borderBottom: '2px solid #45657c',
}

const sunMoon = {
    marginTop: '0px',
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    borderTop: '2px solid #45657c',
}
