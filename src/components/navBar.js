import React from 'react';
import {Link} from 'react-router-dom';
//import Button from './button'


function NavBar(props) {

	return (
		<div style={navbar}>
			<div style={links}>
				<Link style={link} to="/">Home</Link>
				<Link style={link} to="/walks">Walks</Link>
				<Link style={link} to="/eat">Eat Out</Link>
				<Link style={link} to="/live">Live Music</Link>
                <Link style={link} to="/weather">Weather</Link>
			</div>
		</div>
		);
}

const navbar = {
	display: 'flex',
	flexDirection: 'row',
	backgroundColor: '#333',
	padding: '1em',
}

const links = {

}

const link = {
	color: '#e2e2e2',
	textDecoration: 'none',
	fontSize: '1.0em',
	margin: '1em',
}

export default NavBar;

