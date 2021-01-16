import React, { useState } from 'react';
import moment from 'moment'
import { FaExternalLinkAlt } from 'react-icons/fa';
import Button from '../universal/button';

function Concert({ data, handleBackToMap }) {
    const [ hover, setHover ] = useState(false)

    const handleBack = () => {
       handleBackToMap(data.id)
    }

    return (  
            <div style={containerStyle}>
                <h3>Name: <span style={highlight}>{data.displayName.replace(/ *\([^)]*\) */g, "")}</span></h3> 
                <p style={{...highlight, ...noMargin}}>{moment(data.start.dateTime || data.start.date).format('DD MMMM YYYY')}</p>
                <p stlye={noMargin}>Venue: <span style={highlight}>{data.venue.displayName}</span></p>
                {data.status !== 'ok' && <p>Status: <span style={highlight}>{data.status}</span></p>}
                <div style={flexDiv}>
                    <p style={{...bigP, ...noMargin}}>Bands: </p>
                    {data.performance.map(band => {
                        return (
                            <div style={bandDiv}key={band.id}>
                                <div style={flexDiv}>
                                <p style={{...highlight, ...bigP, ...noMargin}}>{band.displayName}</p>
                                <a href={band.artist.uri}    
                                    target='_blank'
                                    rel="noreferrer" >
                                    <img src="/images/sk-badge-pink.png" 
                                    alt="Sonkick Logo" 
                                    style={smallLogo}/>
                                </a>
                                <a href={`https://open.spotify.com/search/${band.displayName}`}     
                                    target='_blank'
                                    rel="noreferrer" >
                                    <img src="/images/Spotify_Icon_RGB_Green.png" 
                                    alt="Spotify Logo" 
                                    style={smallLogo}/>
                                </a>
                                
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div style={btnDiv}>
                    <Button 
                    children={
                        <a href={data.uri} 
                            target='_blank'
                            rel="noreferrer" 
                            style={linkStyle}
                            onMouseEnter={() => setHover(!hover)}
                            onMouseLeave={() => setHover(!hover)} >
                            <div style={linkStyle}>
                                {!hover ? (
                                    <p style={noMargin}>Details</p>
                                    ) : (
                                    <img src="/images/by-songkick-pink.svg" 
                                                alt="Sonkick Logo" 
                                                style={skButton}/>
                                )}
                            </div>
                        </a>
                    }/>
                    <Button onClick={handleBack}children={'Back to Map'}/>
                </div>
            </div>
    )
}

export default Concert;

const containerStyle = {
    backgroundColor: '#a7a7a733', 
    minHeight: '80px',
    width: '90%', 
    margin: '20px auto', 
    padding: '20px', 
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
    color: '#e2e2e2',
}

const highlight = {
    color: '#f24847db'
}

const noMargin = {
    margin: '0',
}

const bigP = {
    fontSize: '18px'
}

const flexDiv = {
    display: 'flex', 
    flexDirection: 'row', 
    flexWrap: 'wrap'
}

const smallLogo = { 
    margin: '0 8px', 
    cursor: 'pointer',
    height: '20px',
    width: '20px',
}

const skButton = {
    marginBottom: '-11px',
    left: '20px',
    height: '25px',
    width: '75px',
    cursor: 'pointer'
} 

const bandDiv = {
    marginLeft: '10px',
}

const btnDiv = {
    textAlign: 'right',
}

const linkStyle = {
    color: '#e2e2e2',
    width: '75px',
    maxHeight: '18px',
}