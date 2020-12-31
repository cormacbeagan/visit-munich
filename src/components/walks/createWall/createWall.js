import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../../store/actions/projectActions';

const initialState = {
    name: '',
    description: '',
    lat: '',
    lng: '',
    image: ''
}

function CreateWall(props) {
    
    const { createProject } = props
    const [ formData, setFormData ] = useState(initialState)

    const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createProject(formData)
        // this also needs to handle the file submission...      
        setFormData(initialState)
    }


    return (
      <div style={{padding: '50px', alignContent: 'center'}}>
            <form onSubmit={handleSubmit} className="">
                <h5 className="grey-text text-darken-3">Create Wall</h5>
                <div className="input-field">
                    <label htmlFor="name">Wall Title</label>
                    <input type="text" id="name" onChange={handleChange} value={formData.name} required/>
                </div>
                <div className="input-field">
                    <label htmlFor="description">Wall Description</label>
                    <input type="text" id="description" onChange={handleChange} value={formData.description}/>
                </div>
                <div className="input-field">
                    <label htmlFor="lat">Latitude</label>
                    <input type="text" id="lat" onChange={handleChange} value={formData.lat} required/>
                </div>
                <div className="input-field">
                    <label htmlFor="lng">Longditude</label>
                    <input type="text" id="lng" onChange={handleChange} value={formData.lng} required/>
                </div>
                <div className="input-field">
                    <label htmlFor="image">Image Url</label>
                    <input type="text" id="image" onChange={handleChange} value={formData.image} required/>
                </div>
                <div className="input-field">
                    <input type="file" accept="image/*,.pdf" id="file"/>
                </div>
                <div className="input-field">
                    <button className="btn grey darken-2 z-depth-0">Create</button>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project)) 
    }
}

export default connect(null, mapDispatchToProps)(CreateWall)
