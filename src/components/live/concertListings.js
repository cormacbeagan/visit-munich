import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../universal/button';
import Concert from './concert'
import Input from '../universal/input';



function ConcertListings({ data, concerts }) {
    const history = useHistory()
    let { id } = useParams();
    let concertArray;
    if(id) {
        concertArray = concerts.events.filter(concert => `${concert.venue.lat}${concert.venue.lng}` === id)
    } else {
        concertArray = concerts.events
    }

    return (
        <div className="container" style={containerStyle}>
           
            <div>
                {concertArray.map(event => {
                    if(!event) return
                    return (
                        <div key={event.id}>
                            <Concert
                                data={event}
                            />
                        </div>
                    )
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
    width: '80%', 
    margin: '50px auto', 
    padding: '30px', 
    backgroundColor: '#333333', 
    color: '#f3f3f3', 
    boxShadow: '0 100px 80px rgba(0, 0, 0, 0.3)'
}

