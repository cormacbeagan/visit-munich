import PropTypes from 'prop-types';
import '../../styles/button.css';

function Button(props) {
  const { children, onClick } = props;

  return (
    <button onClick={onClick} className="btn-universal">
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default Button;
