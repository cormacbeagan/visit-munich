import styled from 'styled-components';

const CreateForm = styled.form`
  margin: 2rem auto;
  max-width: 60rem;
  background: var(--offWhite);
  padding: 2rem 1rem;
  border-radius: 5px;
  box-shadow: var(--smallBs);
  @media only screen and (max-width: 480px) {
    padding: 1rem 0.5rem;
    width: 95%;
    margin: 0 auto;
    box-sizing: border-box;
  }
`;

const HeadingStyle = styled.h1`
  margin: 10rem 0 3rem 0;
  text-align: center;
  font-size: 3.5rem;
  color: var(--white);
`;

export { CreateForm, HeadingStyle };
