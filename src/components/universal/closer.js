import PropTypes from 'prop-types';
import styled from 'styled-components';

const CloserDiv = styled.div`
  cursor: pointer;
  position: absolute;
  width: 50px;
  height: 50px;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px 8px rgba(0, 0, 0, 0.2);
  transform: scale(0.65);
  z-index: 1;
`;

const XCloser = styled.div`
  position: absolute;
  top: -18.5px;
  left: -18.5px;
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

function Closer({ onClick }) {
  const handleKeyDown = e => {
    if (e.keyCode === 13) onClick();
  };

  return (
    <CloserDiv
      onClick={onClick}
      aria-label="closer"
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <XCloser></XCloser>
      <YCloser></YCloser>
    </CloserDiv>
  );
}

Closer.propTypes = {
  onClick: PropTypes.func,
};

export default Closer;
