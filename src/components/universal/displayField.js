import React, { useState, useEffect } from 'react';
import moment from 'moment'
import Button from '../universal/button';

function DisplayField({ data, handleVenue }) {
    const [displayData, setDisplayData ] = useState()
    useEffect(() => {
        setDisplayData(data)
    }, [data])


    if(displayData){
        return (
            <div style={boxText}>
                <h5 style={boxHeading}>{displayData.name}</h5>
                <div style={boxDiv}>
                    <br/>
                    <Button children={'venue concerts'} onClick={() => handleVenue(displayData.coords)}/>
                    <a href={displayData.uri}
                    target='_blank'
                    rel="noreferrer" >
                        <img 
                        src="/images/sk-badge-pink.png" 
                        alt="Sonkick Logo" 
                        style={logoStyle}/>
                    </a>
                    <div style={divBottom}>
                    <Button children={<a href={`https://www.google.com/maps/search/?api=1&query=${displayData.lat},${displayData.lng},${displayData.name}`} 
                    target='_blank'
                    rel="noreferrer" 
                    style={{color:'white'}}
                    >Directions</a>} />
                    </div>
                </div>
            </div>
        )
    }else{
        return null;
    }
}


export default DisplayField;

const boxText = {
    margin: '10px',
    color: 'white',
    contain: 'items',
}

const boxHeading = {
    color: '#f24847db', 
    maxWidth: '220px',
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
    bottom: '30px', 
    left: '20px'
}
