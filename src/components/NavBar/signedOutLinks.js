import React from 'react';
import {Link} from 'react-router-dom';


function SignedOutLinks(props) {
	const { mobile } = props;
	
	return (
			<div style={mobile ? mobileNavBar : navbar}>
				<Link style={link} to="/signin">Sign In</Link>
			</div>
		);
}

export default SignedOutLinks;

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
	color: '#e2e2e2',
	textDecoration: 'none',
	fontSize: '1.0em',
	margin: '1em',
	
}