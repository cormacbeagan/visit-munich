import React, { useState } from 'react'
import '../../styles/signform.css'

const initialState = {
    email: '',
    password: '',
}

function SignIn() {
    const [ formData, setFormData ] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        setFormData(initialState)
    }
    const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    return (
      <div style={{padding: '50px', alignContent: 'center'}}>
            <form onSubmit={handleSubmit} className="white">
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
                    <button className="btn lighten-1 z-depth-0">Login</button>
                </div>
            </form>
        </div>
    )
}

export default SignIn
