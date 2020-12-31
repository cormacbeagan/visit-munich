import React from 'react';
import {Link} from 'react-router-dom';
//import Button from './button'


function SignedInLinks(props) {

	return (
		<div style={navbar}>
				<Link style={link} to="/create">Create Wall</Link>
				<Link style={link} to="/">Logout</Link>
				<Link style={link} to="/">Profile Pic</Link>
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

export default SignedInLinks;