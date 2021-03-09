import styled from 'styled-components';

const FlexRow = styled.div`
  background: var(--middleBrown);
  margin: 5rem auto;
  padding: 2rem;
  max-width: 65rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  box-shadow: 0 30px 50px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  &.editing {
    background: rgb(215, 215, 215);
  }
  @media only screen and (max-width: 480px) {
    padding: 2rem 1rem;
    margin: 5rem 1rem;
  }
`;

export default FlexRow;
