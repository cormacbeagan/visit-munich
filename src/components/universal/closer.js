import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const CloserButton = styled.button`
  cursor: pointer;
  position: absolute;
  width: 50px;
  height: 50px;
  top: 5px;
  left: 5px;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px 8px rgba(0, 0, 0, 0.2);
  transform: scale(0.65);
  z-index: 1;
  &:focus,
  &:hover {
    box-shadow: var(--hgBs);
  }
`;

const XCloser = styled.div`
  position: absolute;
  top: -18.5px;
  left: 18.5px;
  width: 50px;
  height: 50px;
  border-bottom: 4px solid #eadcdc;
  transform: rotate(45deg);
`;
const YCloser = styled.div`
  position: absolute;
  top: -18.5px;
  left: -18.5px;
  width: 50px;
  height: 50px;
  border-bottom: 4px solid #eadcdc;
  transform: rotate(-45deg);
`;

const Closer = React.forwardRef(({ onClick }, ref) => {
  // const handleKeyDown = e => {
  //   if (e.keyCode === 13) onClick();
  // };

  return (
    <CloserButton
      ref={ref}
      onClick={onClick}
      aria-label="closer"
      tabIndex="0"
      // onKeyDown={handleKeyDown}
    >
      <XCloser></XCloser>
      <YCloser></YCloser>
    </CloserButton>
  );
});

Closer.propTypes = {
  onClick: PropTypes.func,
};

export default Closer;
