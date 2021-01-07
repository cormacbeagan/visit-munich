import React from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';
import { connect } from 'react-redux';
import {isLoaded} from 'react-redux-firebase';

function NavBar(props) {
	const { auth, profile } = props;
	const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />;

	return (
		<div style={navbar}>
				<Link style={link} to="/">Home</Link>
				<Link style={link} to="/eat">Eat Out</Link>
				<Link style={link} to="/live">Live Music</Link>
                <Link style={link} to="/weather">Weather</Link>
				<Link style={link} to="/walks">Walls</Link>
				{isLoaded(auth) && links}
		</div>
		);
}

const navbar = {
	fontSize: '24px',
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

const mapStateToProps = (state) => {
	console.log(state)
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
	}
}
export default connect(mapStateToProps)(NavBar);

