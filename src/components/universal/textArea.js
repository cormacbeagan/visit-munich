import PropTypes from 'prop-types';
import { useRef } from 'react';

function TextArea(props) {
  const { onChange, type, value, id, name, required } = props;
  const input = useRef();

  const handleChange = e => {
    onChange(id, e.target.value);
  };

  return (
    <div style={divStyle}>
      <textarea
        aria-label="enter the main text here"
        ref={input}
        style={inputStyle}
        type={type}
        id={id}
        onChange={handleChange}
        value={value}
        placeholder="Text:"
        required={required}
      >
        {value}
      </textarea>
    </div>
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

const divStyle = {
  margin: '20px auto',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px',
  maxWidth: '280px',
};

const inputStyle = {
  margin: '5px',
  padding: '10px',
  outline: 'none',
  fontSize: '18px',
  color: '#e8e8e8',
  backgroundColor: '#464646',
  border: 'none',
  borderBottom: '2px solid #787879',
  transition: 'all 400ms ease',
  fontFamily: 'Arial, Helvetica, sans-serif',
  width: '280px',
  height: '175px',
  maxWidth: '280px',
  maxHeight: '175px',
  boxShadow: '0 0  50px rgba(0, 0, 0, 0.3)',
};
