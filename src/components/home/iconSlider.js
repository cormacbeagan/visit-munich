import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import {
  TiWeatherPartlySunny,
  TiWeatherCloudy,
  TiWeatherSunny,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherWindy,
} from 'react-icons/ti';
import TempInput from '../weather/tempInput';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import styled from 'styled-components';
dayjs.extend(advancedFormat);

const ColumnUl = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const EntryRow = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 2px solid var(--darkBlue);
  position: relative;
`;

const ConcertEntry = styled.div`
  margin: 0 25px 5px 0;
  p {
    color: var(--white);
    font-weight: 600;
  }
  .venue-p {
    color: #bebdc0;
  }
`;

const WeatherEntry = styled.div`
  margin: 5px 0;
  border-bottom: 2px solid var(--darkBlue);
  p {
    color: var(--white);
    font-weight: 600;
  }
`;

const LogoImg = styled.img`
  height: 25px;
  width: 25px;
  cursor: pointer;
  margin: 15px;
  position: absolute;
  right: 0;
  border-radius: 5px;
`;

function IconSlider({ data }) {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    if (data[0].cloudcover) {
      let icon;
      const iconArray = data.map(item => {
        switch (item.icon) {
          case 'partly-cloudy-day':
            icon = <TiWeatherPartlySunny style={iconStyle} />;
            break;
          case 'clear-day':
            icon = <TiWeatherSunny style={iconStyle} />;
            break;
          case 'cloudy':
            icon = <TiWeatherCloudy style={iconStyle} />;
            break;
          case 'rain':
            icon = <TiWeatherShower style={iconStyle} />;
            break;
          case 'snow':
            icon = <TiWeatherSnow style={iconStyle} />;
            break;
          case 'wind':
            icon = <TiWeatherWindy style={iconStyle} />;
            break;
          default:
            icon = <p>Cloudy with a chance of ERRORS</p>;
        }
        return (
          <WeatherEntry>
            <p>{dayjs(item.datetime).format('ddd Do MMM YYYY')}</p>
            {icon}
            <TempInput avg={item.temp} max={item.tempmax} min={item.tempmin} />
          </WeatherEntry>
        );
      });
      setDataArray(iconArray);
    } else {
      const bandArray = data.map(item => {
        return (
          <EntryRow>
            <ConcertEntry>
              <p>{item.performance[0].artist.displayName}</p>
              <p className="venue-p">{item.venue.displayName}</p>
            </ConcertEntry>
            {/* // todo needs focus state, a is not visible at the moment*/}
            <a href={item.uri} target="_blank" rel="noreferrer">
              <LogoImg src="/images/sk-badge-pink.png" alt="Sonkick Logo" />
            </a>
          </EntryRow>
        );
      });
      setDataArray(bandArray);
    }
  }, [data]);

  return (
    <ColumnUl>
      {dataArray.map(icon => {
        return (
          <li tabIndex="0" key={uniqid()}>
            {icon}
          </li>
        );
      })}
    </ColumnUl>
  );
}

IconSlider.propTypes = {
  data: PropTypes.array,
};

const iconStyle = {
  height: '50px',
  width: '50px',
  color: '#e2e2e2',
};

export default IconSlider;
