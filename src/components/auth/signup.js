import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/actions/authActions';
import '../../styles/signform.css'

const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
}

function SignUp(props) {
    const {auth, signUp, authError} = props;
    const [ formData, setFormData ] = useState(initialState)
    if(auth.uid) return <Redirect to='/' />



    const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signUp(formData)
    }
    return (
            <div style={{padding: '50px', alignContent: 'center'}}>
                <form onSubmit={handleSubmit} className="">
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={handleChange} value={formData.firstName} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={handleChange} value={formData.lastName}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={handleChange} value={formData.email} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={handleChange} value={formData.password} required/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
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
        auth: state.firebase.auth,
        authError: state.auth.authError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)