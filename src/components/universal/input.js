import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  max-width: 90rem;
`;

const InputLabel = styled.label`
  margin-left: 5px;
  margin-bottom: -36px;
  z-index: 1;
  color: #dfbaaa;
  font-size: 2rem;
`;

const InputStyle = styled.input`
  width: 90%;
  margin: 5px;
  margin-top: ${props => props.marg}px;
  outline: none;
  line-height: 36px;
  font-size: 24px;
  color: #e8e8e8;
  background-color: inherit;
  border: none;
  border-bottom: 2px solid #787879;
  transition: all 400ms ease;
`;

function Input(props) {
  const { onChange, type, value, id, name, required } = props;
  const [marg, setMarg] = useState(5);

  useEffect(() => {
    if (value) setMarg(36);
  }, [value]);

  const handleChange = e => {
    onChange(id, e.target.value);
  };

  const handleFocus = e => {
    setMarg(36);
  };

  return (
    <div>
      <InputDiv>
        <InputLabel marg={marg} htmlFor={id}>
          {name}
        </InputLabel>
        <InputStyle
          marg={marg}
          type={type}
          id={id}
          onChange={handleChange}
          onFocus={handleFocus}
          value={value}
          required={required}
          autoComplete="off"
        />
      </InputDiv>
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
