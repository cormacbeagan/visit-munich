import styled from 'styled-components';

const InfoBoxStyles = styled.div`
  left: ${props => (props.slideIn ? '0' : '-350px')};
  top: 80px;
  position: absolute;
  z-index: 80;
  width: 320px;
  display: block;
  transition: left 400ms cubic-bezier(0.5, 1.71, 0.54, 0.89);
  @media (max-width: 380px) {
    top: 0;
    transform: scale(0.7);
    left: ${props => (props.slideIn ? '-45px' : '-350px')};
  }
`;

const ImgButton = styled.button`
  align-items: center;
  width: 30rem;
  height: 30rem;
  overflow: hidden;
  background: grey;
  background-position: center center;
  background-size: 305px 305px;
  background-repeat: no-repeat;
  border-radius: 2rem;
`;

export { InfoBoxStyles, ImgButton };
