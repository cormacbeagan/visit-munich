import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase/lib/helpers';
import { FaBars } from 'react-icons/fa';
import { useDimensionSetter } from '../../hooks/useDimensionSetter';
import styled from 'styled-components';

const MobNavCont = styled.div`
  width: ${props => props.width}px;
  height: 80px;
  font-size: 24px;
  position: fixed;
  left: 0;
  top: 0;
  background: var(--darkBrown);
  z-index: 89;
  border-bottom: 3px solid #395f78;
`;

const MobileLinks = styled.nav`
  width: 100%;
  min-width: 220px;
  max-width: 270px;
  height: auto;
  max-height: ${props => props.height - 80}px;
  position: fixed;
  top: 80px;
  right: ${props => (props.slideIn ? '0' : '-300px')};
  background: var(--darkBrown);
  display: flex;
  flex-direction: column;
  text-align: right;
  padding-right: 10px;
  font-size: 24px;
  z-index: 99;
  overflow-y: auto;
  border-left: 2px solid #395f78;
  opacity: ${props => (props.slideIn ? '1' : '0')};
  transform: ${props => (props.slideIn ? 'scale(1)' : 'scale(0.75)')};
  a {
    color: var(--white);
    text-decoration: none;
    font-size: 24px;
    padding: 24px;
    border-bottom: 2px solid var(--middleBlue);
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const Logo = styled.div`
  a {
    float: left;
    margin: 20px;
    color: var(--white);
    text-decoration: none;
    font-size: 34px;
    font-weight: bold;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const Bars = styled.button`
  width: 50px;
  height: 50px;
  margin: 10px 20px 10px 10px;
  float: right;
  cursor: pointer;
  color: var(--offWhite);
  font-size: 50px;
`;

const NavBarStyles = styled.nav`
  font-size: 24px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  background: var(--darkBrown);
  z-index: 89;
  border-bottom: 4px solid #395f78;
  a,
  button {
    color: var(--white);
    text-decoration: none;
    font-size: 24px;
    padding: 24px;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

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

  return (
    <>
      {smallScreen ? (
        <>
          <MobNavCont width={width}>
            <Logo>
              <Link aria-label="home" to="/" onClick={() => setMenuOpen(false)}>
                Visit Munich
              </Link>
            </Logo>
            <Bars
              ref={navBars}
              aria-label="open navigation menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaBars />
            </Bars>
          </MobNavCont>
          <>
            <MobileLinks
              slideIn={menuOpen}
              height={height}
              onClick={() => setMenuOpen(false)}
            >
              <div
                style={
                  menuOpen
                    ? { display: 'flex', flexDirection: 'column' }
                    : { display: 'none' }
                }
              >
                <Link to="/tips" aria-hidden={menuOpen ? false : true}>
                  Tips
                </Link>
                <Link to="/live" aria-hidden={menuOpen ? false : true}>
                  Live Music
                </Link>
                <Link to="/weather" aria-hidden={menuOpen ? false : true}>
                  Weather
                </Link>
                <Link to="/walks" aria-hidden={menuOpen ? false : true}>
                  Graffiti
                </Link>
                {isLoaded(auth) && links}
              </div>
            </MobileLinks>
          </>
        </>
      ) : (
        <NavBarStyles>
          <Link to="/">Home</Link>
          <Link to="/tips">Tips</Link>
          <Link to="/live">Live Music</Link>
          <Link to="/weather">Weather</Link>
          <Link to="/walks">Graffiti</Link>
          {isLoaded(auth) && links}
        </NavBarStyles>
      )}
    </>
  );
}
