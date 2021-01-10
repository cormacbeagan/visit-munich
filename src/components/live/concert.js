import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment'
import Button from '../universal/button';

function Concert({ data }) {
    const history = useHistory()

    console.log(data)
    return (  
            <div className=""style={{backgroundColor: '#a7a7a733', minHeight: '80px', width: '90%', margin: '20px auto', padding: '20px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'}}>
                <h5>Name: <span style={{color: '#f24847db'}}>{data.displayName.replace(/ *\([^)]*\) */g, "")}</span></h5> 
                <p style={{color: '#f24847db', margin: '0'}}>{moment(data.start.dateTime || data.start.date).format('DD MMMM YYYY')}</p>
                <p stlye={{margin: '0'}}>Venue: <span style={{color: '#f24847db'}}>{data.venue.displayName}</span></p>
                {data.status != 'ok' && <p>Status: <span style={{color: '#f24847db'}}>{data.status}</span></p>}
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    <p style={{fontSize: '18px', margin: '0'}}>Bands: </p>
                    {data.performance.map(band => {
                        return (
                            <div style={{marginLeft: '10px'}}key={band.id}>
                                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                                <p style={{color: '#f24847db', fontSize: '18px', margin: '0'}}>{band.displayName}</p>
                                <a href={band.artist.uri}    
                                    target='_blank'
                                    rel="noreferrer" >
                                    <img src="/images/sk-badge-pink.png" 
                                    alt="Sonkick Logo" 
                                    height="20px" 
                                    width="20px" 
                                    style={{ margin: '0 8px', cursor: 'pointer'}}/>
                                </a>
                                <a href={`https://open.spotify.com/search/${band.displayName}`}     
                                    target='_blank'
                                    rel="noreferrer" >
                                    <img src="/images/Spotify_Icon_RGB_Green.png" 
                                    alt="Sonkick Logo" 
                                    height="20px" 
                                    width="20px" 
                                    style={{ margin: '0 8px', cursor: 'pointer'}}/>
                                </a>
                                
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Button children={<a href={data.uri} 
                    target='_blank'
                    rel="noreferrer" 
                    style={{color:'white'}}
                    >
                <img src="/images/by-songkick-pink.svg" 
                    alt="Sonkick Logo"
                    height="25px" 
                    width="125px"     
                    style={{position: 'aboslute', marginTop: '7px', cursor: 'pointer'}}/></a>}/>
            </div>
    )
}
export default Concert;
