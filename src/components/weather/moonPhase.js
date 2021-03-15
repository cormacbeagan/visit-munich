import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  overflow: hidden;
  border-radius: 100%;
  height: 50px;
  width: 50px;
  transform: rotate(10deg) scale(0.7);
  background: black;
`;

const ContDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const MoonFront = styled.div`
  left: 0;
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.color};
  overflow: hidden;
`;

const MoonBack = styled.div`
  top: -25px;
  left: ${props => props.left}px;
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: ${props => props.color};
  overflow: hidden;
`;

function MoonPhase({ phase }) {
  const [leftBack, setLeftBack] = useState('0');
  const [backColor, setBackColor] = useState('black');
  const [frontColor, setFrontColor] = useState('white');

  useEffect(() => {
    if (phase <= 0.25) {
      setLeftBack(phase * 100);
    } else if (phase <= 0.5) {
      setBackColor('white');
      setFrontColor('black');
      const move = phase * 100 - 50;
      setLeftBack(move - 50);
    } else if (phase <= 0.75) {
      setBackColor('white');
      setFrontColor('black');
      const move = (phase - 0.5) * 100;
      setLeftBack(move);
    } else {
      const move = phase * 100 - 150;
      setLeftBack(move);
    }
  }, [phase]);

  return (
    <ContDiv>
      <Container>
        <MoonFront color={frontColor}></MoonFront>
        <MoonBack color={backColor} left={leftBack}></MoonBack>
      </Container>
    </ContDiv>
  );
}

MoonPhase.propTypes = {
  phase: PropTypes.number,
};

export default MoonPhase;
