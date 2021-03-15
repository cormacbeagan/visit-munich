import PropTypes from 'prop-types';
import React from 'react';
import '../../styles/button.css';

const Button = React.forwardRef((props, ref) => {
  const { children, onClick, type } = props;

  return (
    <button onClick={onClick} ref={ref} className="btn-universal" type={type}>
      {children}
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default Button;
