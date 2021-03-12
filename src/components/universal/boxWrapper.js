import styled from 'styled-components';

const BoxStyles = styled.article`
  position: relative;
  height: 30rem;
  width: 30rem;
  min-width: 30rem;
  margin: 1rem;
  background: var(--lightBlue);
  border-radius: 2rem;
  border: 3px solid var(--middleBlue);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
  @media only screen and (max-width: 480px) {
    margin: 1rem 0;
  }
  @media only screen and (max-width: 350px) {
    transform: scale(0.95);
  }
`;

function BoxWrapper({ children }) {
  return <BoxStyles tabIndex="0">{children}</BoxStyles>;
}

export default BoxWrapper;
