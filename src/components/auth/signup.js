import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/actions/authActions';
import Input from '../universal/input';
import Button from '../universal/button';

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



    const handleChange = (id, value) => {
        setFormData((prev) => ({...prev, [id]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signUp(formData)
    }
    return (
            <div style={formStyle}>
                <form onSubmit={handleSubmit} className="">
                    <h3 style={heading}>Sign Up</h3>
                    <Input 
                        type={"text"}
                        id={'firstName'}
                        name={'First Name'}
                        onChange={handleChange}
                        value={formData.firstName}
                    />
                    <Input 
                        type={"text"}
                        id={'lastName'}
                        name={'Last Name'}
                        onChange={handleChange}
                        value={formData.lastName}
                    />
                    <Input 
                        type={"email"}
                        id={'email'}
                        name={'Email'}
                        onChange={handleChange}
                        value={formData.email}
                    />
                    <Input 
                        type={"password"}
                        id={'password'}
                        name={'Password'}
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <Button children={'sign up'} />
                    <div style={{color: 'red', textAlign: 'center'}}>
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

const formStyle = {
    padding: '50px', 
    alignContent: 'center'
}

const heading = {
    fontSize: '24px',
    color: '#333',
}