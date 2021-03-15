import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { GiMineralHeart } from 'react-icons/gi';
import styled from 'styled-components';

const PinDiv = styled.div`
  position: relative;
  height: ${props => props.pinSize}px;
  width: ${props => props.pinSize}px;
  cursor: pointer;
  color: ${props => props.color};
  transform: rotate(135deg);
  transition: all 400ms ease-in;
  &:hover,
  &:focus {
    transform: scale(1.3) rotate(0deg);
  }
`;

function LocationPin(props) {
  const { text, zoom, handleInfo, id, color } = props;
  const [pinSize, setPinSize] = useState(24);
  const pin = useRef();

  const handleClick = e => {
    e.preventDefault();
    handleInfo(id, pin.current);
  };

  // increase pin size on zoom
  useEffect(() => {
    setPinSize(zoom * 2.2);
  }, [zoom]);

  const handleKeyDown = e => {
    if (e.keyCode === 13) handleInfo(id, pin.current);
  };

  const pinIcon = {
    height: 'auto',
    width: pinSize + 'px',
  };

  return (
    <PinDiv
      pinSize={pinSize}
      color={color}
      aria-label={`location pin for ${text}`}
      tabIndex="0"
      id={`locationPin-${text}`}
      onKeyDown={handleKeyDown}
      ref={pin}
    >
      <GiMineralHeart
        onTouchEnd={handleClick}
        onClick={handleClick}
        onKeyPress={handleClick}
        style={pinIcon}
      />
    </PinDiv>
  );
}

LocationPin.propTypes = {
  color: PropTypes.string,
  handleInfo: PropTypes.func,
  id: PropTypes.any.isRequired,
  text: PropTypes.string,
  zoom: PropTypes.number,
};

export default LocationPin;
