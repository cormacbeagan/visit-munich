import React from 'react';
import { connect } from 'react-redux';
import Concert from './concert'


function ConcertListings({ handleBackToMap, concerts, coords }) {

    let concertArray;
        if(coords) {
            concertArray = concerts.events.filter(concert => `${concert.venue.lat}${concert.venue.lng}` === coords)
        } else {
            concertArray = concerts.events
        }

    const handleBack = (id) => {
        const event = concerts.events.filter(item => item.id === id)
        handleBackToMap(event[0])
    }

    return (
        <div className="container" style={containerStyle}>
            <div>
                {concertArray.map(event => {
                    if(!event) {
                        return null
                    } else {
                        return (
                            <div key={event.id}>
                                <Concert
                                    handleBackToMap={handleBack}
                                    data={event}
                                />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        concerts: state.concerts
    }
}


export default connect(mapStateToProps)(ConcertListings);

const containerStyle = {
    width: '90%', 
    maxWidth: '800px',
    margin: '50px auto', 
    marginTop: '200px',
    padding: '20px 0px', 
    backgroundColor: '#333333', 
    color: '#f3f3f3', 
    boxShadow: '0 100px 80px rgba(0, 0, 0, 0.3)'
}

