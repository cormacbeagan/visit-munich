import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';


function SignedInLinks(props) {
	const { profile, signOut, mobile } = props

	return (
		<div style={mobile ? mobileNavBar : navbar}>
			<Link style={link} to="/create">Create Wall</Link>
			<Link style={link} to='/blog'>Create Blog</Link>
			<Link onClick={signOut} style={link} to="/">Logout</Link>
			<Link style={link} to="/signup">Sign Up</Link>
			{!mobile && <Link style={linkIn} to='/'>{profile.initials}</Link>}
		</div>
	);
}



const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () =>  dispatch(signOut())
	}
}

export default connect(null, mapDispatchToProps)(SignedInLinks);

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
    fontSize: '24px',
	margin: '1em',
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
