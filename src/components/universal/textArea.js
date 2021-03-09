import PropTypes from 'prop-types';
import { useRef } from 'react';
import styled from 'styled-components';

const divStyle = {
  margin: '20px auto',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px',
  maxWidth: '280px',
};

const TextContainer = styled.div`
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  max-width: 28rem;
`;

const TextAreaStyle = styled.textarea`
  margin: 5px;
  padding: 1rem;
  outline: none;
  font-size: 18px;
  color: var(--white);
  background-color: var(--lightBlue);
  border-bottom: 2px solid var(--lightBlue);
  font-family: Arial, Helvetica, sans-serif;
  width: 280px;
  height: 175px;
  max-height: 175px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  scrollbar-width: thin;
  scrollbar-color: var(--middleBlue) transparent;
  &:focus {
    box-shadow: inset 0 0 12px rgb(51, 238, 255) !important;
  }
  &::-webkit-scrollbar {
    width: 9px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--middleBlue);
    border-radius: 6px;
  }
  &::-webkit-resizer {
    border: solid 20px;
    border-color: transparent var(--darkBlue) var(--darkBlue) transparent;
    transform: rotate(45deg);
    background: var(--white);
  }
  &::-webkit-input-placeholder {
    color: var(--white);
  }
  &::-moz-placeholder {
    /* Firefox 19+ */
    color: var(--white);
  }
`;

function TextArea(props) {
  const { onChange, type, value, id, name, required } = props;
  const input = useRef();

  const handleChange = e => {
    onChange(id, e.target.value);
  };

  return (
    <TextContainer>
      <TextAreaStyle
        aria-label="enter the main text here"
        ref={input}
        type={type}
        id={id}
        onChange={handleChange}
        value={value}
        placeholder="Text:"
        required={required}
      >
        {value}
      </TextAreaStyle>
    </TextContainer>
  );
}

TextArea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default TextArea;
