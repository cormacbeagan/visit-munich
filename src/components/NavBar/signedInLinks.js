import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
//import Button from './button'


function SignedInLinks(props) {
	const { profile, signOut } = props
	return (
		<div style={navbar}>
				<Link style={link} to="/create">Create Wall</Link>
				<Link onClick={signOut}style={link} to="/">Logout</Link>
				<Link className='btn btn-floating grey lighten-1' to='/'>{profile.initials}</Link> 
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

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () =>  dispatch(signOut())
	}
}

export default connect(null, mapDispatchToProps)(SignedInLinks);