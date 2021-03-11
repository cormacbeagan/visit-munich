import PropTypes from 'prop-types';
import { WiHorizon, WiHorizonAlt } from 'react-icons/wi';
import styled from 'styled-components';

const SunStyle = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  p {
    margin: 5px 0 0 5px;
  }
`;

export default function SunTime({ up, down }) {
  return (
    <SunStyle>
      <SunStyle>
        <WiHorizonAlt style={sunStyle} />
        <p>{up}</p>
      </SunStyle>
      <SunStyle>
        <WiHorizon style={sunStyle} />
        <p>{down}</p>
      </SunStyle>
    </SunStyle>
  );
}

SunTime.propTypes = {
  down: PropTypes.string,
  up: PropTypes.string,
};

const sunStyle = {
  width: '30px',
  height: '30px',
  color: 'gold',
};
