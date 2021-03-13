import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SignedOutLinks(props) {
  const { mobile, menuOpen } = props;

  return (
    <>
      <Link to="/signin" aria-hidden={mobile && menuOpen ? false : true}>
        Sign In
      </Link>
      <Link to="/signup">Sign Up</Link>
    </>
  );
}

SignedOutLinks.propTypes = {
  mobile: PropTypes.bool.isRequired,
  menuOpen: PropTypes.bool,
};

export default SignedOutLinks;
