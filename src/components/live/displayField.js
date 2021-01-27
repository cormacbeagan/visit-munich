import React, { useState, useEffect, useRef } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import Button from '../universal/button';

function DisplayField({ data, handleVenue, bands }) {
    const [displayData, setDisplayData ] = useState()
    const link = useRef()
    useEffect(() => {
        setDisplayData(data)
    }, [data])

    if(displayData) {
        return (
            <div style={boxText}>
                <h3 style={boxHeading}>{displayData.name}</h3>
                {bands && 
                  <div>
                    <p style={label}>Bands: </p>
                    <div style={bandFlex}>
                        {bands.map(band => {
                            return <p style={bandStyle} key={band}>{band},</p>
                        })}

                    </div>
                  </div>
                }

                <div style={boxDiv}>
                    <br/>
                    <a href={displayData.uri}
                        target='_blank'
                        rel="noreferrer" >
                        <img 
                        src="/images/sk-badge-pink.png" 
                        alt="Sonkick Logo" 
                        style={logoStyle}/>
                    </a>
                    <div style={divBottom}>
                    <Button children={'concerts'} onClick={() => handleVenue(displayData.coords)}/>
                    <Button children={<div>directions <FiExternalLink /></div>} onClick={() => link.current.click()}/>
                    <a ref={link}href={`https://www.google.com/maps/search/?api=1&query=${displayData.lat},${displayData.lng}`} 
                        target='_blank'
                        rel="noreferrer" 
                        style={{display: 'none'}}
                        ></a>
                    </div>
                </div>
            </div>
        )
    } else {
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
    color: '#cecbcb', 
    maxWidth: '220px',
}

const boxDiv = {
    marginLeft: '-5px'
}

const logoStyle = {
    height: '25px', 
    width: '25px', 
    position: 'absolute', 
    top: '80px', 
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
