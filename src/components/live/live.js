import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Map from '../universal/map';
import Input from '../universal/input';
import DisplayBox from '../universal/displayBox';
import Button from '../universal/button';
import { location } from '../universal/mapData';
import { connect } from 'react-redux';
import { concertSearch } from '../../store/actions/concertActions';


const initialState = {
    name: '',
    lat: '',
    lng: '',
    description: '',
}


function Live(props) {
    const {concerts, concertSearch} = props;
    const history = useHistory();
    const [ displayData, setDisplayData ] = useState(initialState);
    const [ slideIn, setSlideIn ] = useState('-350px')
    const [ searching, setSearching ] = useState(true);

    useEffect(() => {
        if(concerts.events[0]){
            setSearching(false)
        }
    }, [concerts])
    const handleInfo = (concertId) => {
        if(concertId) {
            const concert = concerts.venues.filter(item => item.id === concertId)
            setDisplayData(concert)
            setTimeout(setSlideIn('0px'), 300)
        }
    }

    const handleSearch = async (dates) => {
        concertSearch(dates)
    }

    const infoBoxes = {
        marginLeft: slideIn,
        position: 'absolute',
        zIndex: '99',
        width: '320px',
        display: 'block',
        transitionProperty: 'margin-left',
        transitionDuration: '800ms',
        transitionTimingFunction: 'cubic-bezier(0.5, 1.71, 0.54, 0.89)',
    };

    return (
        <div>
            <div style={{backgroundColor: '#395f78', height: '100px',  paddingBottom: '40px'}}>
            {concerts.events && !searching ? (
                <div style={{textAlign: 'center', padding: '25px'}}>
                <Button children={'all concerts'} onClick={() => history.push(`/concerts`)}/>
                <Button  children={'new dates'} onClick={() => setSearching(true)}/>
                </div>
            ) : (
                <Input handleSubmit={handleSearch}/>
            )
            }
            </div>
            <div style={container}> 
                <div>
                    <Map
                    onClick={() => setSlideIn('-350px')}
                    handleInfo={handleInfo}
                    location={location}
                    zoomLevel={12}
                    projects={concerts.venues}
                    />
                </div>
                <div style={infoBoxes}>
                    <DisplayBox
                        type={'text'}
                        data={displayData}
                        />
                </div>
            </div>
            <div style={{position: 'absolute', bottom: '0px', right: '50px', zIndex: '99'}}>
                <h5 style={{color: '#f24847', margin: '0', fontWeight: 'bold'}}>Concerts</h5>
                <img src="/images/by-songkick-pink.svg" 
                    alt="Sonkick Logo"
                    height="75px" 
                    width="250px"     
                    />
            </div>
        </div>
)
}
const container = {
maxHeight: '1000px',
width: '320px',
contain: 'items',
display: 'contain',
};

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
