import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';
import { connect } from 'react-redux';
import {isLoaded} from 'react-redux-firebase';
import { FaBars } from 'react-icons/fa';
import { useDimensionSetter } from '../../hooks/useDimensionSetter';
let width, height; 

function NavBar(props) {
	const { auth, profile } = props;
	const [ smallScreen, setSmallScreen ] = useState(false)
	const [ menuOpen, setMenuOpen ] = useState(false); 
	const links = auth.uid ? <SignedInLinks mobile={smallScreen} profile={profile}/> : <SignedOutLinks mobile={smallScreen}/>;
	const [ width, height ] = useDimensionSetter();

	useEffect(() => {
		if(width < 900) {
			setSmallScreen(true)
		} else {
			setSmallScreen(false)
		}
	}, [width])

	const handleMenuOpen = () => {
		setMenuOpen(!menuOpen)
	}


	return (
		<div>
			{smallScreen ? (
				<div>
					<div style={mobileNavStyle}>
							<Link style={logo} to="/">Home</Link>
							<a href="#0" onClick={handleMenuOpen}style={bars}><FaBars /></a>
					</div>
					<div>
						<div style={menuOpen ? mobileLinks : linksClosed} onClick={() => setMenuOpen(false)}>
							{/*<Link style={link} to="/eat">Eat Out</Link>*/}
							<Link style={link} to="/live">Live Music</Link>
							<Link style={link} to="/weather">Weather</Link>
							<Link style={link} to="/walks">Walls</Link>
							{isLoaded(auth) && links}
						</div>
					</div>
				</div>
			) : (
				<div style={navBarStyle}>
					<Link style={link} to="/">Home</Link>
					{/*<Link style={link} to="/eat">Eat Out</Link>*/}
					<Link style={link} to="/live">Live Music</Link>
					<Link style={link} to="/weather">Weather</Link>
					<Link style={link} to="/walks">Walls</Link>
				{isLoaded(auth) && links}
			</div>
			)}
		</div>
		);
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
	}
}
export default connect(mapStateToProps)(NavBar);

const navBarStyle = {
	fontSize: '24px',
	position: 'fixed',
	left: '0',
	top: '0',
	width: '100%',
	display: 'flex',
	flexDirection: 'row',
	backgroundColor: '#333333',
	zIndex: '99',
	borderBottom: '4px solid #395f78'
}

const link = {
	color: '#e2e2e2',
	textDecoration: 'none',
	fontSize: '1.0em',
	margin: '1em',
}

const mobileNavStyle = {
	width: '100%',
	height: '80px',
	fontSize: '24px',
	position: 'fixed',
	left: '0',
	top: '0',
	backgroundColor: '#333333',
	zIndex: '99',
	borderBottom: '3px solid #395f78'
}

const logo = {
	float: 'left',
	margin: '20px',
	color: '#e2e2e2',
	textDecoration: 'none',

}

const bars = {
	margin: '10px',
	marginRight: '20px',
	float: 'right',
	cursor: 'pointer',
	color: '#e2e2e2',
	fontSize: '50px',
}

const linksClosed = {
	width: '100%',
	position: 'fixed',
	top: '80px',
	right: window.innerWidth +'px',
	backgroundColor: '#333333',
	display: 'flex',
	flexDirection: 'column',
	textAlign: 'right',
	paddingRight: '10px',
	fontSize: '24px',
	zIndex: '99',
	opacity: '0',
	transform: 'scale(0.75)',
	transition: 'all 400ms cubic-bezier(0.29,-0.15, 0.02, 1.02)'
}

const mobileLinks = {
	width: window.innerWidth +6 +'px',
	height: window.innerHeight + 'px',
	overflow: 'scroll',
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
	borderLeft: '6px solid #395f78',
	transform: 'scale(1)',
	transition: 'all 300ms cubic-bezier(0.65, 0.89, 0.8, 1.15)'
} 
