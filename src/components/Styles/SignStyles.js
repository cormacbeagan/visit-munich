import styled from 'styled-components';

const SignForm = styled.form`
  margin: 20px auto;
  max-width: 600px;
  background: var(--offWhite);
  padding: 40px 20px 10px 20px;
  border-radius: 5px;
  .btn-div-sign {
    margin: 0 0 0 15px;
  }
`;

const ErrorStyle = styled.p`
  color: rgb(213, 8, 8);
  margin-top: 10px;
  font-size: 20px;
  text-align: center;
`;

export { SignForm, ErrorStyle };
