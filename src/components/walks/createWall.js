import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { createProject } from '../../store/actions/projectActions';

const initialState = {
    name: '',
    description: '',
    lat: '',
    lng: '',
    image: '',
}

function CreateWall(props) {
    const { createProject, auth } = props
    const [ formData, setFormData ] = useState(initialState)
    const history = useHistory();

    if(!auth.uid) return <Redirect to='/signin' />;

    const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createProject(formData)   
        setFormData(initialState)
        history.push('/walks')
    }


    return (
      <div style={createDiv}>
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
                    <button className="btn grey darken-2 z-depth-0">Create</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateWall)

const createDiv = {
    padding: '50px', 
    alignContent: 'center'
}
