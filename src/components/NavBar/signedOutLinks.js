import React from 'react';
import {Link} from 'react-router-dom';


function SignedOutLinks(props) {

	return (
			<div style={navbar}>
				<Link style={link} to="/signin">Login</Link>
				{/*<Link style={link} to="/signup">Sign Up</Link>*/}
			</div>
		);
}

const navbar = {
	display: 'flex',
	flexDirection: 'row',
	backgroundColor: '#333',
	padding: '1em',
}

const link = {
	color: '#e2e2e2',
	textDecoration: 'none',
	fontSize: '1.0em',
	padding: '0 1em',
}

export default SignedOutLinks;