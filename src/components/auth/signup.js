import React, { useState } from 'react'
import '../../styles/signform.css'

const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
}

function SignUp() {
    const [ formData, setFormData ] = useState(initialState)

    const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        setFormData(initialState)
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
            </form>
        </div>
    )
}

export default SignUp
