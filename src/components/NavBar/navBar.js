import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase/lib/helpers';
import { FaBars } from 'react-icons/fa';
import { useDimensionSetter } from '../../hooks/useDimensionSetter';

export default function NavBar() {
  const [smallScreen, setSmallScreen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navBars = useRef();
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firebase.profile);

  const links = auth.uid ? (
    <SignedInLinks mobile={smallScreen} menuOpen={menuOpen} profile={profile} />
  ) : (
    <SignedOutLinks mobile={smallScreen} menuOpen={menuOpen} />
  );

  const [width, height] = useDimensionSetter();
  useEffect(() => {
    if (width < 1060) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, [width]);

  useEffect(() => {
    if (!smallScreen) return;
    const bars = navBars.current;
    const handleMenuOpen = e => {
      if (!bars.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('click', handleMenuOpen);
    return () => {
      document.removeEventListener('click', handleMenuOpen);
    };
  }, [smallScreen]);

  const mobileNavStyle = {
    width: width,
    height: '80px',
    fontSize: '24px',
    position: 'fixed',
    left: '0',
    top: '0',
    backgroundColor: '#333333',
    zIndex: '89',
    borderBottom: '3px solid #395f78',
  };

  const linksClosed = {
    width: '100%',
    position: 'fixed',
    top: '80px',
    right: '-300px',
    backgroundColor: '#333333',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
    paddingRight: '10px',
    fontSize: '24px',
    zIndex: '99',
    opacity: '0',
    transform: 'scale(0.75)',
    transition: 'all 400ms cubic-bezier(0.29,-0.15, 0.02, 1.02)',
  };

  const mobileLinks = {
    minWidth: '220px',
    height: 'auto',
    maxWidth: '270px',
    overflowY: 'auto',
    position: 'fixed',
    top: '80px',
    right: '0px',
    backgroundColor: '#333333',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
    paddingRight: '10px',
    fontSize: '24px',
    zIndex: '99',
    borderLeft: '2px solid #395f78',
    transform: 'scale(1)',
    transition: 'all 300ms cubic-bezier(0.65, 0.89, 0.8, 1.15)',
  };
  return (
    <>
      {smallScreen ? (
        <>
          <div className="navbar" style={mobileNavStyle}>
            <Link
              aria-label="home"
              style={logo}
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Visit Munich
            </Link>
            <button
              ref={navBars}
              aria-label="open navigation menu"
              onClick={() => setMenuOpen(!menuOpen)}
              style={bars}
            >
              <FaBars />
            </button>
          </div>
          <>
            <nav
              className="navbar"
              style={menuOpen ? mobileLinks : linksClosed}
              onClick={() => setMenuOpen(false)}
            >
              <div
                style={
                  menuOpen
                    ? { display: 'flex', flexDirection: 'column' }
                    : { display: 'none' }
                }
              >
                <Link
                  style={linkMob}
                  to="/tips"
                  aria-hidden={menuOpen ? false : true}
                >
                  Tips
                </Link>
                <Link
                  style={linkMob}
                  to="/live"
                  aria-hidden={menuOpen ? false : true}
                >
                  Live Music
                </Link>
                <Link
                  style={linkMob}
                  to="/weather"
                  aria-hidden={menuOpen ? false : true}
                >
                  Weather
                </Link>
                <Link
                  style={linkMob}
                  to="/walks"
                  aria-hidden={menuOpen ? false : true}
                >
                  Graffiti
                </Link>
                {isLoaded(auth) && links}
              </div>
            </nav>
          </>
        </>
      ) : (
        <nav className="navbar" style={navBarStyle}>
          <Link style={link} to="/">
            Home
          </Link>
          <Link style={link} to="/tips">
            Tips
          </Link>
          <Link style={link} to="/live">
            Live Music
          </Link>
          <Link style={link} to="/weather">
            Weather
          </Link>
          <Link style={link} to="/walks">
            Graffiti
          </Link>
          {isLoaded(auth) && links}
        </nav>
      )}
    </>
  );
}

const navBarStyle = {
  fontSize: '24px',
  position: 'fixed',
  left: '0',
  top: '0',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#333333',
  zIndex: '89',
  borderBottom: '4px solid #395f78',
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

const logo = {
  float: 'left',
  margin: '20px',
  color: '#e2e2e2',
  textDecoration: 'none',
  fontSize: '34px',
  fontWeight: 'bold',
};

const bars = {
  width: '50px',
  height: '50px',
  margin: '10px',
  marginRight: '20px',
  float: 'right',
  cursor: 'pointer',
  color: '#e2e2e2',
  fontSize: '50px',
};
