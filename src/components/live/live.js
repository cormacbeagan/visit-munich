import React, { useState, useEffect } from 'react';
import Map from '../universal/map';
import DisplayBox from '../universal/displayBox';
import Button from '../universal/button';
import DateForm from '../universal/dateForm';

import ConcertListings from './concertListings';
import { location } from '../universal/mapData';
import { connect } from 'react-redux';
import { concertSearch } from '../../store/actions/concertActions';



const initialState = {
    name: '',
    lat: '',
    lng: '',
    coords: '',
}

function Live(props) {
    const { concerts, concertSearch } = props;
    const [ displayData, setDisplayData ] = useState(initialState);
    const [ slideIn, setSlideIn ] = useState('-350')
    const [ searching, setSearching ] = useState(true);
    const [ mapLocation, setMapLocation ] = useState(location)
    const [ mapZoom, setMapZoom ] = useState(12);
    const [ displayMap, setDisplayMap ] = useState(false)
    const [ coords, setCoords ] = useState(null)
    const [ venueBands, setVenueBands ] = useState(null);

    useEffect(() => {
        if(concerts.events[0]){
            setSearching(false)
        }
    }, [concerts])


    const handleInfo = (venueId) => {
        if(venueId) {
            const venue = concerts.venues.filter(item => item.id === venueId)
            let bands = [];
            concerts.events.forEach(item => {
                if(item.venue.id === venueId){
                    bands.push(item.performance[0].displayName)
                }
            })
            setVenueBands(bands)
            setDisplayData(venue)
            setSlideIn('-10')
        }
    }

    const handleSearch = (dates) => {
        concertSearch(dates)
    }

    const handleNewSearch = () => {
        setMapLocation(location)
        setMapZoom(12)
        setCoords(null)
        setSlideIn('-350')
        setSearching(true)
        setVenueBands(null)
    }

    const handleBackToMap = (event) => {
        setDisplayMap(!displayMap)
        setSlideIn('-350')
        setCoords(null)
        setVenueBands(null)    
        if(event) {      
            setMapLocation({lat: event.venue.lat, lng: event.venue.lng})
            setMapZoom(17)
            setDisplayData([{
                name: event.displayName,
                lat: event.venue.lat,
                lng: event.venue.lng,
                coords: `${event.venue.lat}${event.venue.lng}`,
                uri: event.uri,
            }])
            setSlideIn('-10')
        } else {
            setMapLocation(location)
            setMapZoom(12)
        }
    }

    const handleVenue = (coords) => {
        setDisplayMap(!displayMap)
        setCoords(coords)
    }

    const closer = () => {
        setSlideIn('-350')
    }
    const infoBoxes = {
        marginLeft: slideIn + 'px',
        marginTop: '110px',
        position: 'absolute',
        zIndex: '97',
        height: '300px',
        width: '320px',
        display: 'block',
        transitionProperty: 'margin-left',
        transitionDuration: '400ms',
        transitionTimingFunction: 'cubic-bezier(0.5, 1.71, 0.54, 0.89)',
    };


    return (
        <div>
            <div style={liveStyle}>
            {concerts.events && !searching ? (
                <div style={buttonDiv}>
                    <Button children={displayMap ? 'back to map': 'all concerts'} onClick={() => handleBackToMap()}/>
                    <Button  children={'new dates'} onClick={handleNewSearch}/>
                </div>
            ) : (
                <DateForm handleDates={handleSearch} name={'search'}/>
            )
            }
            </div>
            {displayMap ? (
                <ConcertListings 
                    coords={coords}
                    handleBackToMap={handleBackToMap}
                />
            ) : (
                <div>
                    <div style={container}> 
                        <div>
                            <Map
                            onClick={closer}
                            handleInfo={handleInfo}
                            location={mapLocation}
                            zoomLevel={mapZoom}
                            projects={concerts.venues}
                            />
                        </div>
                        <div style={infoBoxes}>
                            <DisplayBox
                                bands={venueBands}
                                data={displayData}
                                handleVenue={handleVenue}
                                />
                        </div>
                    </div>
                    <div style={logoDiv}>
                        <h5 style={logoHeading}>Concerts</h5>
                        <img src="/images/by-songkick-pink.svg" 
                            alt="Sonkick Logo"
                            height="50px" 
                            width="140px"     
                            />
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        concerts: state.concerts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        concertSearch: (dates) => dispatch(concertSearch(dates))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Live);

const liveStyle = {
    position: 'fixed',
    top: '80px',
    left: '0',
    right: '0',
    zIndex: '98',
    backgroundColor: '#395f78', 
    height: '70px',  
}

const container = {
    maxHeight: '1000px',
    width: '320px',
    contain: 'items',
    display: 'contain',
    }

const buttonDiv = {
    textAlign: 'center', 
    padding: '10px',
    backgroundColor: '#395f78',
}

const logoDiv = {
    position: 'absolute', 
    bottom: '0px', 
    right: '70px', 
    zIndex: '98'
}

const logoHeading = {
    color: '#f24847', 
    margin: '0', 
    fontWeight: 'bold'
}