import styled from 'styled-components';

const InfoBoxStyles = styled.div`
  left: ${props => (props.slideIn ? '0' : '-350px')};
  top: 80px;
  position: absolute;
  z-index: 80;
  width: 320px;
  display: block;
  transition: left 400ms cubic-bezier(0.5, 1.71, 0.54, 0.89);
  &:focus {
    box-shadow: none;
  }
  @media only screen and (max-width: 480px) {
    transform: scale(0.95);
  }
  @media only screen and (max-width: 380px) {
    top: 0px;
    transform: scale(0.7);
    left: ${props => (props.slideIn ? '-50px' : '-350px')};
  }
`;

export default InfoBoxStyles;
