import PropTypes from 'prop-types';
import React from 'react';
import TempInput from './tempInput';
import WeatherIcon from './weatherIcon';
import SunTime from './sunTime';
import MoonPhase from './moonPhase';
import styled from 'styled-components';

const PStyles = styled.p`
  margin: 0;
  padding-bottom: 10px;
  font-size: 18px;
  text-align: center;
  color: white;
  border-bottom: 2px solid #45657c;
`;

const SunMoonDiv = styled.div`
  margin-top: 0px;
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  border-top: 2px solid #45657c;
`;

export default function StatsWeather({ data }) {
  let max;
  let min;
  const checkColor = () => {
    if (data.normal) {
      max = data.normal.tempmax[2];
      min = data.normal.tempmin[0];
    } else {
      max = data.tempmax;
      min = data.tempmin;
    }
  };
  checkColor();

  return (
    <div style={{ margin: '8px' }}>
      <WeatherIcon icon={data.icon} />
      <PStyles>{data.conditions}</PStyles>
      <TempInput avg={data.temp} max={max} min={min} />
      <SunMoonDiv>
        <SunTime up={data.sunrise.slice(0, 5)} down={data.sunset.slice(0, 5)} />
        <MoonPhase phase={data.moonphase} />
      </SunMoonDiv>
    </div>
  );
}

StatsWeather.propTypes = {
  data: PropTypes.object,
};
