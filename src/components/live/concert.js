import React, { useState, useEffect } from 'react';
import moment from 'moment'
import Button from '../universal/button';
import { useDimensionSetter } from '../../hooks/useDimensionSetter'; 

function Concert({ data, handleBackToMap }) {
    const [ hover, setHover ] = useState(false)
    const [ width, height ] = useDimensionSetter();
    const [ padding, setPadding ] = useState('40px'); 

    useEffect(() => {
        console.log(width)
        if(width > 800) {
            setPadding('40px')
        } else {
            setPadding('20px')
        }
        console.log(padding)
    }, [width])

    const handleBack = () => {
       handleBackToMap(data.id)
    }
    const containerStyle = {
        backgroundColor: '#a7a7a733', 
        minHeight: '80px',
        width: '76%', 
        margin: '20px auto', 
        padding: padding, 
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
        color: '#e2e2e2',
    }

    return (  
            <div style={containerStyle}>
                <h2 style={lowlight}>Name: <span style={highlight}>{data.displayName.replace(/ *\([^)]*\) */g, "")}</span></h2> 
                <p style={{...highlight, ...noMargin}}>{moment(data.start.dateTime || data.start.date).format('DD MMMM YYYY')}</p>
                <p style={{...noMargin, ...lowlight}}>Venue: <span style={highlight}>{data.venue.displayName}</span></p>
                {data.status !== 'ok' && <p>Status: <span style={highlight}>{data.status}</span></p>}
                <div style={flexDiv}>
                    <p style={{...bigP, ...noMargin, ...lowlight}}>Bands: </p>
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

const highlight = {
    color: '#cecbcb'
}

const lowlight = {
    color: '#51748b',
    fontWeight: '600',
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