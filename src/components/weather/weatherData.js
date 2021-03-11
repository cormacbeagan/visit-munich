import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import StatsWeather from './statsWeather';
import Loading from '../universal/loading';
import styled from 'styled-components';
dayjs.extend(advancedFormat);

const BoxText = styled.div`
  margin: 10px;
  color: white;
  contain: items;
  h3 {
    color: #cecbcb;
    text-align: center;
  }
  &.weather-blur {
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.4);
    border-radius: 20px;
  }
`;

function WeatherData({ data }) {
  if (data) {
    return (
      <BoxText>
        <h3>{dayjs(data.datetime).format('ddd Do MMM YYYY')}</h3>
        <div className="weather-blur">
          <StatsWeather data={data} />
        </div>
      </BoxText>
    );
  } else {
    return <Loading />;
  }
}

WeatherData.propTypes = {
  data: PropTypes.object,
};

export default WeatherData;
