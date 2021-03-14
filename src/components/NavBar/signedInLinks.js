import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import styled from 'styled-components';
const myId = process.env.REACT_APP_MY_ID;

const ProfileLink = styled.div`
  margin-top: 24px;
  a {
    padding: 14px 12px !important;
    border-radius: 100%;
    font-size: 24px;
    text-decoration: none;
    background: #f9cd25;
    color: var(--darkBrown) !important;
    font-weight: bold;
    transition: all 200ms ease;
    &:hover,
    &:focus {
      text-decoration: none;
      background: var(--backBlue);
      color: var(--white);
    }
  }
`;

const DropCont = styled.div`
  position: relative;
`;

const Pointer = styled.div`
  position: absolute;
  left: 80px;
  top: 0;
  width: 0;
  height: 0;
  border: solid 10px var(--darkBrown);
  border-color: transparent transparent var(--darkBrown) transparent;
  transform: rotate(45deg) translateY(-50%);
  background: var(--darkBrown);
`;

const DropDiv = styled.ul`
  display: ${props => (props.dropNav ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  padding: 12px 0;
  top: 60px;
  left: -160px;
  width: 200px;
  background: var(--darkBrown);
  border-radius: 10px;
  li {
    list-style-type: none;
    padding: 12px;
  }
  a {
    padding: 0px 24px;
  }
`;

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
        <>
          {hasAccess && (
            <Link to="/createblog" aria-hidden={menuOpen ? false : true}>
              Create Blog
            </Link>
          )}
          <Link to="/createtip" aria-hidden={menuOpen ? false : true}>
            Create Tip
          </Link>
          <Link to="/createwall" aria-hidden={menuOpen ? false : true}>
            Create Wall
          </Link>
          <Link to={`/profile/${auth.uid}`}>Profile</Link>
          <Link
            onClick={handleSignout}
            to="/"
            aria-hidden={menuOpen ? false : true}
          >
            Logout
          </Link>
        </>
      )}
      {!mobile && (
        <>
          <button ref={droper} onClick={handleDrop}>
            Create
          </button>
          <DropCont onClick={handleDrop}>
            <DropDiv dropNav={dropNav}>
              <Pointer />
              {hasAccess && (
                <li>
                  <Link to="/createblog">Create Blog</Link>
                </li>
              )}
              <li>
                <Link to="/createtip">Create Tip</Link>
              </li>
              <li>
                <Link to="/createwall">Create Wall</Link>
              </li>
            </DropDiv>
          </DropCont>
          <Link onClick={handleSignout} to="/">
            Logout
          </Link>
          <ProfileLink id="profile">
            <Link to={`/profile/${auth.uid}`}>{profile.initials}</Link>
          </ProfileLink>
        </>
      )}
    </>
  );
}

SignedInLinks.propTypes = {
  mobile: PropTypes.bool.isRequired,
  profile: PropTypes.object,
  menuOpen: PropTypes.bool,
};
