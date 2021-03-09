import styled from 'styled-components';

const FlexColumn = styled.div`
  background: #464646;
  margin: 5rem auto;
  padding: 2rem;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  box-shadow: 0 100px 80px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  &.editing {
    background: var(--offWhite);
  }
  @media only screen and (max-width: 480px) {
    padding: 2rem 1rem;
    margin: 5rem 1rem;
  }
`;

export default FlexColumn;
