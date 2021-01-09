import React, { useState, useEffect, Fragment } from 'react';
import Map from '../universal/map';
import Input from '../universal/input';
import DisplayBox from '../universal/displayBox';
import { location } from '../universal/mapData';
import Search from './background';
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
    console.log(concerts)
    const [ displayData, setDisplayData ] = useState(initialState);
    const [ slideIn, setSlideIn ] = useState('-350px')
    const [ mapData, setMapData ] = useState([{id:'',name:'',lat:'',lng:''}]);
    const [ concertArray, setConcertArray ] = useState([]);

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
                <Input handleSubmit={handleSearch}/>
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
        </div>
)
}
const container = {
//margin: '50px',
maxHeight: '1000px',
width: '320px',
contain: 'items',
display: 'contain',
};

const mapStateToProps = (state) => {
    console.log(state)
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

// dates - use inputs
// concerts listing
// map
// map with venues - in boxes use display