import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import DateForm from '../universal/dateForm';
import DisplayWeather from './displayWeather';
import BoxSlider from '../universal/boxSlider';
import { useDimensionSetter } from '../../hooks/useDimensionSetter';
import { connect } from 'react-redux';
import { weatherSearch } from '../../store/actions/weatherActions';
import Loading from '../universal/loading';

function Weather(props) {
  const { weatherSearch, weather, dates } = props;
  const [width, height] = useDimensionSetter();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const boxes = useRef();

  useEffect(() => {
    if (dates.dates) {
      weatherSearch(dates.dates);
    }
  }, []);

  useEffect(() => {
    if (weather) {
      setLoader(false);
      setData(weather);
      boxes.current.style.top = '200px';
    }
  }, [weather]);

  const handleClose = pix => {
    boxes.current.style.top = pix;
  };

  const handleDates = dates => {
    const date = new Date(dates.arrival);
    const tenDays = date.setDate(date.getDate() + 10);
    if (dates.departure > tenDays) {
      alert('Max 10 days search');
    } else {
      setLoader(true);
      weatherSearch(dates);
    }
    return;
  };

  const container = {
    height: height,
    width: width,
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundImage: 'url(/images/thunderstorm.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '55% 50%',
    backgroundSize: 'cover',
  };
  return (
    <section style={container}>
      <div onClick={() => handleClose('-350px')}>
        <DateForm handleDates={handleDates} name={'forecast'} />
      </div>
      <div style={boxDiv} ref={boxes}>
        <BoxSlider>
          {data.map(item => {
            return (
              <div key={item.datetimeEpoch}>
                <DisplayWeather key={item.datetimeEpoch} data={item} />
              </div>
            );
          })}
        </BoxSlider>
      </div>
      {loader && <Loading />}
    </section>
  );
}

Weather.propTypes = {
  dates: PropTypes.object,
  weather: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  weatherSearch: PropTypes.func,
};

const mapStateToProps = state => {
  console.log(state);
  return {
    weather: state.weather.type ? false : state.weather.weather,
    dates: state.dates,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    weatherSearch: dates => dispatch(weatherSearch(dates)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);

const boxDiv = {
  position: 'relative',
  width: '100%',
  top: '-350px',
  display: 'flex',
  flexDirection: 'row',
  transition: 'top 500ms cubic-bezier(0.22, 1.68, 0.52, 0.73)',
};
