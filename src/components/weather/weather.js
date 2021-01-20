import React, { useState, useEffect, useRef } from 'react';
import DateForm from '../universal/dateForm';
import DisplayWeather from './displayWeather';
import BoxSlider from '../universal/boxSlider';
import { useDimensionSetter } from '../../hooks/useDimensionSetter';
import { connect } from 'react-redux';
import { weatherSearch } from '../../store/actions/weatherActions';
import {dummyData} from './dummy';



function Weather(props) {
    const { weatherSearch, weather } = props;
    const [ width, height ] = useDimensionSetter();
    const [ data, setData ] = useState(dummyData);
    const boxes = useRef()

    useEffect(() => {
        if(weather.weather){
            setData(weather.weather)
            boxes.current.style.top = '200px'
        }
    }, [weather])

    const handleClose = () => {
        boxes.current.style.top = '-350px';
    }


    const handleDates = (dates) => {
        weatherSearch(dates)
    }

    const container = {
        height: height,
        width: width,
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundImage: 'url(/images/munich-hills.jpg)',
    } 
    return (
            <div style={container}>
                <div onClick={handleClose}>
                    <DateForm handleDates={handleDates} name={'tell me its sunny'}/>
                </div>
                <div style={boxDiv} ref={boxes}>
                    <BoxSlider>
                            {data.map(item => {
                                return (
                                    <div key={item.datetimeEpoch}>
                                        <DisplayWeather
                                            key={item.datetimeEpoch}
                                            data={item}
                                        />
                                    </div>
                                )
                            })}
                    </BoxSlider>
                </div>
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        weather: state.weather
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        weatherSearch: (dates) => dispatch(weatherSearch(dates))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);

const boxDiv = {
    position: 'relative',
    width: '100%',
    top: '-350px',
    display: 'flex',
    flexDirection: 'row',
    transition: 'top 1.2s ease',
}
