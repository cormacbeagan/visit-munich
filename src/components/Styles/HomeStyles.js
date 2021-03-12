import styled, { keyframes } from 'styled-components';

const headingIn = keyframes`
  from {
    opacity: 0.3;
  }

  to {
    opacity: 1;
  }
`;

const Container = styled.section`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-image: url(/images/munich-hills.jpg);
  background-repeat: no-repeat;
  background-position: 20% 80%;
  background-size: cover;
`;

const BoxCont = styled.div`
  position: absolute;
  width: 100%;
  left: ${props => props.slideIn}px;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  transition: left 2s ease;
`;

const ScrollBoxStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => props.scrollWidth}px;
  transition: all 500ms cubic-bezier(0.77, 2.05, 0.72, 0.75);
`;

const BoxDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

const LogoDiv = styled.div`
  margin: 200px 25px;
  font-size: 36px;
  color: white;
  h1 {
    opacity: 0.3;
    animation: ${headingIn} 2s forwards;
    @media only screen and (max-width: 420px) {
      font-size: 56px;
    }
    @media only screen and (max-width: 380px) {
      font-size: 45px;
    }
    @media only screen and (max-height: 600px) {
      display: none;
    }
  }
`;

export { Container, BoxCont, ScrollBoxStyle, LogoDiv, BoxDiv };
