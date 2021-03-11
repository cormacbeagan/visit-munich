import PropTypes from 'prop-types';
import { WiCelsius } from 'react-icons/wi';
import styled from 'styled-components';

const TempDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  .temp-inner {
    margin: 10px;
  }
`;

const TempP = styled.p`
  margin: 2px;
  color: ${props => props.color};
  font-size: 18px;
`;

export default function TempInput({ avg, min, max }) {
  const pColor = '#bebdc0';
  const tempColor = temp => {
    if (temp < 0) {
      return '#78c1ff';
    } else if (temp < 8) {
      return '#4ca8f7';
    } else if (temp < 14) {
      return '#dfbaaa';
    } else if (temp < 22) {
      return '#f5b72d';
    } else if (temp < 28) {
      return '#f16940';
    } else {
      return 'red';
    }
  };

  return (
    <TempDiv>
      <div className="temp-inner">
        <TempP color={pColor}>Min </TempP>
        <TempP color={tempColor(min)}>
          {min}
          <WiCelsius style={symbolStyle} />
        </TempP>
      </div>
      <div className="temp-inner">
        <TempP color={pColor}>Ø </TempP>
        <TempP color={tempColor(avg)}>
          {avg}
          <WiCelsius style={symbolStyle} />
        </TempP>
      </div>
      <div className="temp-inner">
        <TempP color={pColor}>Max </TempP>
        <TempP color={tempColor(max)}>
          {max}
          <WiCelsius style={symbolStyle} />
        </TempP>
      </div>
    </TempDiv>
  );
}

TempInput.propTypes = {
  avg: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
};

const symbolStyle = {
  width: '22px',
  height: '22px',
  transform: 'scale(1.4)',
};
