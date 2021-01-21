import React from 'react'
import { WiHorizon, WiHorizonAlt } from 'react-icons/wi';

function SunTime({up, down}) {
    return (
        <div style={sunDiv}>
            <div style={sunDiv}>
                <WiHorizonAlt style={sunStyle}/>
                <p style={sunP}>{up}</p>
            </div>
            <div style={sunDiv}>
                <WiHorizon style={sunStyle}/>
                <p style={sunP}>{down}</p>
            </div>
        </div>
    )
    }

export default SunTime;

const sunDiv = {
    margin: '5px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
}

const sunP = {
    margin: '5px 0 0 5px',
}

const sunStyle = {
    width: '30px',
    height: '30px',
    color: 'gold',
}