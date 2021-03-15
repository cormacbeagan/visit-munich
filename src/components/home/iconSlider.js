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
import LogoLink from '../universal/LogoLink';
dayjs.extend(advancedFormat);

const ColumnUl = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const EntryRow = styled.div`
  max-width: 250px;
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
  margin: 0px 0;
  padding: 5px 0;
  border-bottom: 2px solid var(--darkBlue);
  p {
    color: var(--white);
    font-weight: 600;
  }
  &:focus {
    box-shadow: var(--hgBs);
  }
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
          <WeatherEntry tabIndex="0">
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
            <LogoLink href={item.uri}>
              <img src="/images/sk-badge-pink.png" alt="" />
              <p className="accessibly-hidden">
                Songkick website concert entry
              </p>
            </LogoLink>
          </EntryRow>
        );
      });
      setDataArray(bandArray);
    }
  }, [data]);

  return (
    <ColumnUl>
      {dataArray.map(icon => {
        return <li key={uniqid()}>{icon}</li>;
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
