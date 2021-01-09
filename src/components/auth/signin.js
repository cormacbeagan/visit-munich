import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signIn } from '../../store/actions/authActions';
import Button from '../universal/button';
import '../../styles/signform.css'


const initialState = {
    email: '',
    password: '',
}

function SignIn(props) {
    const { signIn, authError, auth } = props
    const [ formData, setFormData ] = useState(initialState)
    if(auth.uid) return <Redirect to='/walks' />


    const handleSubmit = (e) => {
        e.preventDefault()
        signIn(formData)
    }
    const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.id]: e.target.value}))
    }
        return (
            <div style={{padding: '50px', alignContent: 'center'}}>
            <form onSubmit={handleSubmit} className="">
                <h5 className="grey-text text-darken-3">Sign In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={handleChange} value={formData.email} required/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={handleChange}value={formData.password} required/>
                </div>
                <div className="input-field">
                    <Button children={'login'} />
                </div>
                <div className="red-text center">
                    {authError ? <p>{authError}</p> : null}
                </div>
            </form>
        </div>
        )
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
