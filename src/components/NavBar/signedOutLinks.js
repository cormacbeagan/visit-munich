import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SignedOutLinks(props) {
  const { mobile, menuOpen } = props;

  return (
    <div style={mobile ? mobileNavBar : navbar}>
      <Link
        style={mobile ? linkMob : link}
        to="/signin"
        aria-hidden={mobile && menuOpen ? false : true}
      >
        Sign In
      </Link>
      <Link style={link} to="/signup">
        Sign Up
      </Link>
    </div>
  );
}

SignedOutLinks.propTypes = {
  mobile: PropTypes.bool.isRequired,
  menuOpen: PropTypes.bool,
};

export default SignedOutLinks;

const navbar = {
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#333',
};

const mobileNavBar = {
  width: '100%',
  backgroundColor: '#333333',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'right',
  height: '100%',
};

const link = {
  color: '#e2e2e2',
  textDecoration: 'none',
  fontSize: '1.0em',
  padding: '1em',
};

const linkMob = {
  color: '#e2e2e2',
  textDecoration: 'none',
  fontSize: '1.0em',
  padding: '1em',
  borderBottom: '2px solid #63849a94',
};
