import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../universal/button';
import Concert from './concert'
import { useParams } from 'react-router-dom';


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
        <div className="container" style={{margin: '70px auto', padding: '50px', backgroundColor: '#333333', color: '#f3f3f3', boxShadow: '0 100px 80px rgba(0, 0, 0, 0.3)'}}>
            <div style={{textAlign: 'right'}}>
                <Button onClick={() => history.push('/live')}children={'Back to Map'}/> 
            </div>
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