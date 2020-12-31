import React from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';



function NavBar(props) {
	const signedIn = true

	return (
		<div style={navbar}>
				<Link style={link} to="/">Home</Link>
				<Link style={link} to="/eat">Eat Out</Link>
				<Link style={link} to="/live">Live Music</Link>
                <Link style={link} to="/weather">Weather</Link>
				<Link style={link} to="/walks">Walks</Link>
				{signedIn && <SignedInLinks />}
				{!signedIn && <SignedOutLinks />}
		</div>
		);
}

const navbar = {
	display: 'flex',
	flexDirection: 'row',
	backgroundColor: '#333',
}


const link = {
	color: '#e2e2e2',
	textDecoration: 'none',
	fontSize: '1.0em',
	margin: '1em',
}

export default NavBar;

