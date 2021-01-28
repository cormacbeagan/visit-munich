import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

function SignedInLinks(props) {
    const { profile, signOut, mobile } = props
    const [dropNav, setDropNav] = useState(false)
    const droper = useRef()

    useEffect(() => {
        const handleDropClick = e => {
            if (e.target !== droper.current) {
                setDropNav(false)
            }
        }
        if (!mobile) {
            window.addEventListener('click', handleDropClick)
        }
        return () => window.removeEventListener('click', handleDropClick)
    })
    const handleDrop = () => {
        dropNav ? setDropNav(false) : setDropNav(true)
    }

    return (
        <div>
            {mobile && (
                <div style={mobileNavBar}>
                    <Link style={linkMob} to='/createblog'>
                        Create Blog
                    </Link>
                    <Link style={linkMob} to='/createtip'>
                        Create Tip
                    </Link>
                    <Link style={linkMob} to='/createwall'>
                        Create Wall
                    </Link>
                    <Link onClick={signOut} style={linkMob} to='/'>
                        Logout
                    </Link>
                    <Link style={linkMob} to='/signup'>
                        Sign Up
                    </Link>
                </div>
            )}
            {!mobile && (
                <div style={navbar}>
                    <div style={link} ref={droper} onClick={handleDrop}>
                        Create
                    </div>
                    <div style={dropContainer} onClick={handleDrop}>
                        <div style={dropNav ? createOpen : createClose}>
                            <div style={pointer}></div>
                            <Link style={link} to='/createblog'>
                                Create Blog
                            </Link>
                            <Link style={link} to='/createtip'>
                                Create Tip
                            </Link>
                            <Link style={link} to='/createwall'>
                                Create Wall
                            </Link>
                        </div>
                    </div>
                    <Link onClick={signOut} style={link} to='/'>
                        Logout
                    </Link>
                    <Link style={link} to='/signup'>
                        Sign Up
                    </Link>
                    <Link style={linkIn} to='/'>
                        {profile.initials}
                    </Link>
                </div>
            )}
        </div>
    )
}

SignedInLinks.propTypes = {
    mobile: PropTypes.bool.isRequired,
    profile: PropTypes.object,
    signOut: PropTypes.func,
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut()),
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)

const navbar = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#333',
}

const mobileNavBar = {
    width: '100%',
    backgroundColor: '#333333',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
}

const link = {
    cursor: 'pointer',
    color: '#e2e2e2',
    textDecoration: 'none',
    fontSize: '24px',
    padding: '1em',
}

const linkMob = {
    cursor: 'pointer',
    color: '#e2e2e2',
    textDecoration: 'none',
    fontSize: '24px',
    padding: '1em',
    borderBottom: '2px solid #63849a94',
}

const linkIn = {
    marginTop: '14px',
    padding: '12px',
    height: '24px',
    borderRadius: '100%',
    fontSize: '20px',
    textDecoration: 'none',
    background: '#51748b',
    color: '#333333',
}

const dropContainer = {
    position: 'relative',
}

const createClose = {
    display: 'none',
}

const createOpen = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '85px',
    left: '-150px',
    width: '200px',
    background: '#333333',
    borderRadius: '10px',
}

const pointer = {
    position: 'absolute',
    left: '70px',
    width: '0px',
    height: '0px',
    border: 'solid 10px #333333',
    borderColor: 'transparent transparent #333333 transparent',
    transform: 'rotate(45deg) translateY(-50%)',
    background: '#333',
}
