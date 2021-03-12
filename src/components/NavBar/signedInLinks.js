import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
const myId = process.env.REACT_APP_MY_ID;

export default function SignedInLinks(props) {
  const { profile, mobile, menuOpen } = props;
  const [dropNav, setDropNav] = useState(false);
  const droper = useRef();
  const [hasAccess, setHasAccess] = useState(false);
  const auth = useSelector(state => state.firebase.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.uid === myId) {
      setHasAccess(true);
    }
  }, [auth]);

  useEffect(() => {
    const handleDropClick = e => {
      if (e.target !== droper.current) {
        setDropNav(false);
      }
    };
    if (!mobile) {
      window.addEventListener('click', handleDropClick);
    }
    return () => window.removeEventListener('click', handleDropClick);
  });

  const handleSignout = () => {
    dispatch(signOut());
  };

  const handleDrop = () => {
    dropNav ? setDropNav(false) : setDropNav(true);
  };

  return (
    <>
      {mobile && (
        <div
          aria-hidden={menuOpen ? false : true}
          style={menuOpen ? mobileNavBar : { display: 'none' }}
        >
          {hasAccess && (
            <Link
              style={linkMob}
              to="/createblog"
              aria-hidden={menuOpen ? false : true}
            >
              Create Blog
            </Link>
          )}
          <Link
            style={linkMob}
            to="/createtip"
            aria-hidden={menuOpen ? false : true}
          >
            Create Tip
          </Link>
          <Link
            style={linkMob}
            to="/createwall"
            aria-hidden={menuOpen ? false : true}
          >
            Create Wall
          </Link>
          <Link style={linkMob} to={`/profile/${auth.uid}`}>
            Profile
          </Link>
          <Link
            onClick={handleSignout}
            style={linkMob}
            to="/"
            aria-hidden={menuOpen ? false : true}
          >
            Logout
          </Link>
        </div>
      )}
      {!mobile && (
        <div style={navbar}>
          <button style={link} ref={droper} onClick={handleDrop}>
            Create
          </button>
          <nav style={dropContainer} onClick={handleDrop}>
            <div style={dropNav ? createOpen : createClose}>
              <div style={pointer}></div>
              {hasAccess && (
                <Link style={link} to="/createblog">
                  Create Blog
                </Link>
              )}
              <Link style={link} to="/createtip">
                Create Tip
              </Link>
              <Link style={link} to="/createwall">
                Create Wall
              </Link>
            </div>
          </nav>
          <Link onClick={handleSignout} style={link} to="/">
            Logout
          </Link>
          <Link style={linkIn} to={`/profile/${auth.uid}`}>
            {profile.initials}
          </Link>
        </div>
      )}
    </>
  );
}

SignedInLinks.propTypes = {
  mobile: PropTypes.bool.isRequired,
  profile: PropTypes.object,
  menuOpen: PropTypes.bool,
};

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
};

const link = {
  cursor: 'pointer',
  color: '#e2e2e2',
  textDecoration: 'none',
  fontSize: '24px',
  padding: '1em',
};

const linkMob = {
  cursor: 'pointer',
  color: '#e2e2e2',
  textDecoration: 'none',
  fontSize: '24px',
  padding: '1em',
  borderBottom: '2px solid #63849a94',
};

const linkIn = {
  marginTop: '14px',
  padding: '12px',
  height: '24px',
  borderRadius: '100%',
  fontSize: '20px',
  textDecoration: 'none',
  background: '#f9cd25',
  color: '#333333',
  fontWeight: 'bold',
};

const dropContainer = {
  position: 'relative',
};

const createClose = {
  display: 'none',
};

const createOpen = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '85px',
  left: '-150px',
  width: '200px',
  background: '#333333',
  borderRadius: '10px',
};

const pointer = {
  position: 'absolute',
  left: '70px',
  width: '0px',
  height: '0px',
  border: 'solid 10px #333333',
  borderColor: 'transparent transparent #333333 transparent',
  transform: 'rotate(45deg) translateY(-50%)',
  background: '#333',
};
