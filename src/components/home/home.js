import React, { useState, useEffect, Fragment } from 'react';
import { useDimensionSetter } from '../../hooks/useDimensionSetter';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import { setDates } from '../../store/actions/dateActions';
import { concertSearch } from '../../store/actions/concertActions';
import { weatherSearch } from '../../store/actions/weatherActions';

import DateForm from '../universal/dateForm';
import BoxSlider from '../universal/boxSlider';
import HomeBox from './homeBox';
import ScrollBox from './scrollBox';

function Home(props) {
    const {setDates, concertSearch, weatherSearch, blogs, concerts, weather} = props;
    const [ width, height ] = useDimensionSetter();
    const [ slideIn, setSlideIn ] = useState(width)
    const [ weatherScroll, setWeatherScroll ] = useState([]);
    const [ concertScroll, setConcertScroll ] = useState([]);


    useEffect(() => {
        setSlideIn('0')

    }, [])

    useEffect(() => {
        if(weather.weather) {
            setWeatherScroll(weather.weather)

        }
        if(concerts.events) {
            setConcertScroll(concerts.events)
        }
    }, [concerts, weather])

    const handleDates = (dates) => {
        setDates(dates)
        concertSearch(dates)
        weatherSearch(dates)
    }

    const container = {
        height: height,
        width: width,
        position: 'absolute',
        top: '0',
        left: '0',
        overflow: 'hidden',
        backgroundImage: 'url(/images/munich-hills.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '20% 80%',
        backgroundSize: 'cover',
    } 

    const boxContainer = {
        position: 'absolute',
        width: '100%',
        left: slideIn,
        bottom: '0px',
        display: 'flex',
        flexDirection: 'row',
        transition: 'left 3s ease'
    }

    return (
        <div style={container}>
            <DateForm name={'pick your dates'} handleDates={handleDates}/>
            <div style={logo}>
                <h1>Visit Munich</h1>
            </div>
            <div style={boxContainer}>
                <BoxSlider>
                    <div style={boxDiv}>
                        {weatherScroll[0] && <ScrollBox data={weatherScroll}/>}
                        {concertScroll[0] && <ScrollBox data={concertScroll}/>}
                        {blogs.map(blog => {
                            return (
                                <HomeBox key={blog.id} data={blog} />
                            )
                        })}
                    </div>
                </BoxSlider>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dates: state.dates,
        blogs: state.firestore.ordered.blogs || state.blogs.blogs,
        weather: state.weather,
        concerts: state.concerts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDates: (dates) => dispatch(setDates(dates)),
        concertSearch: (dates) => dispatch(concertSearch(dates)),
        weatherSearch: (dates) => dispatch(weatherSearch(dates)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'blogs'}
    ])
)(Home);

const logo = {
    margin: '200px 25px',
    fontSize: '36px',
    color: 'white',
}


const boxDiv = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
}