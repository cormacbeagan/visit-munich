import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import DateForm from '../universal/dateForm';
import DisplayWeather from './displayWeather';
import BoxSlider from '../universal/boxSlider';
import { useDimensionSetter } from '../../hooks/useDimensionSetter';
import { useDispatch, useSelector } from 'react-redux';
import { weatherSearch } from '../../store/actions/weatherActions';
import Loading from '../universal/loading';
import styled from 'styled-components';

const WeatherSection = styled.section`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(/images/thunderstorm.jpg);
  background-repeat: no-repeat;
  background-position: 55% 50%;
  background-size: cover;
`;

const BoxDiv = styled.div`
  position: relative;
  width: 100%;
  top: ${props => (props.slideIn ? '200px' : '-350px')};
  display: flex;
  flex-direction: row;
  transition: top 500ms cubic-bezier(0.22, 1.68, 0.52, 0.73);
`;

export default function Weather() {
  const weather = useSelector(state =>
    state.weather.type ? false : state.weather.weather
  );
  const dates = useSelector(state => state.dates);
  const dispatch = useDispatch();
  const [width, height] = useDimensionSetter();
  const [data, setData] = useState([]);
  const [slideIn, setSlideIn] = useState(false);
  const [loader, setLoader] = useState(false);
  const boxes = useRef();

  useEffect(() => {
    if (dates.dates) {
      dispatch(weatherSearch(dates.dates));
    }
  }, []);

  useEffect(() => {
    if (weather) {
      setLoader(false);
      setData(weather);
      setSlideIn(true);
    }
  }, [weather]);

  const handleDates = dates => {
    const date = new Date(dates.arrival);
    const tenDays = date.setDate(date.getDate() + 10);
    if (dates.departure > tenDays) {
      alert('Max 10 days search');
    } else {
      setLoader(true);
      dispatch(weatherSearch(dates));
    }
    return;
  };

  return (
    <WeatherSection height={height} width={width}>
      <div>
        <DateForm handleDates={handleDates} name={'forecast'} />
      </div>
      <BoxDiv ref={boxes} slideIn={slideIn}>
        <BoxSlider>
          {data.map(item => {
            return (
              <div key={item.datetimeEpoch}>
                <DisplayWeather key={item.datetimeEpoch} data={item} />
              </div>
            );
          })}
        </BoxSlider>
      </BoxDiv>
      {loader && <Loading />}
    </WeatherSection>
  );
}

Weather.propTypes = {
  dates: PropTypes.object,
  weather: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  weatherSearch: PropTypes.func,
};
