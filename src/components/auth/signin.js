import PropTypes from 'prop-types'
import { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signIn } from '../../store/actions/authActions'
import Button from '../universal/button'
import Input from '../universal/input'

const initialState = {
    email: '',
    password: '',
}

function SignIn(props) {
    const { signIn, authError, auth } = props
    const [formData, setFormData] = useState(initialState)
    if (auth.uid) return <Redirect to='/' />

    const handleSubmit = e => {
        e.preventDefault()
        signIn(formData)
    }

    const handleChange = (type, value) => {
        setFormData(prev => ({ ...prev, [type]: value }))
    }

    return (
        <div>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h3 style={heading}>Sign In</h3>
                <div>
                    <Input
                        type={'email'}
                        id={'email'}
                        name={'Email'}
                        onChange={handleChange}
                        value={formData.email}
                    />
                    <Input
                        type={'password'}
                        id={'password'}
                        name={'Password'}
                        onChange={handleChange}
                        value={formData.password}
                    />
                </div>
                <div>
                    <Button children={'login'} />
                </div>
                <div className='red-text center'>
                    {authError ? <p style={errorStyle}>{authError}</p> : null}
                </div>
            </form>
        </div>
    )
}

SignIn.propTypes = {
    auth: PropTypes.object,
    authError: PropTypes.any,
    signIn: PropTypes.func,
}

const mapStateToProps = state => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: creds => dispatch(signIn(creds)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

const formStyle = {
    margin: '150px auto',
    maxWidth: '600px',
    background: '#333',
    padding: '20px',
}

const heading = {
    color: '#333',
    marginLeft: '90px',
}

const errorStyle = {
    color: '#ffacac',
    fontSize: '20px',
    textAlign: 'center',
}
