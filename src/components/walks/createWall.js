import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { createProject } from '../../store/actions/projectActions';
import Button from '../universal/button';
import Input from '../universal/input';

const initialState = {
    name: '',
    description: '',
    lat: '',
    lng: '',
    image: '/images/Easy-schlachthof.jpg',
}

function CreateWall(props) {
    const { createProject, auth } = props
    const [ formData, setFormData ] = useState(initialState)
    const history = useHistory();

    if(!auth.uid) return <Redirect to='/signin' />;

    const handleChange = (id, value) => {
        setFormData((prev) => ({...prev, [id]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const check = checkCoords(formData.lat, formData.lng)
        if(check) {
            createProject(formData)   
        } else {
            alert('Invalid Geolocation')
            return
        }
        setFormData(initialState)
        history.push('/walks')
    }

    const checkCoords = (lat, lng) => {
        const valLat = parseFloat(lat)
        const valLng = parseFloat(lng)
        if((!isNaN(valLat) && valLat <= 90 && valLat >= -90) && (!isNaN(valLng) && valLng <= 180 && valLng >= -180)) {
            return true
        } else {
            return false
        }
    }


    return (
      <div>
            <form onSubmit={handleSubmit} style={createDiv}>
                <h2 style={heading}>Create Wall</h2>
                <div>
                    <Input 
                        type={"text"} 
                        id={"name"}
                        name={'Wall Title'}
                        onChange={handleChange} 
                        value={formData.name}
                        required={true}
                        />
                    <Input 
                        type={'text'}
                        id={'description'}
                        name={'Wall description'}
                        onChange={handleChange}
                        value={formData.description}
                        required={true}

                    />
                    <Input
                        type={'text'}
                        id={'lat'}
                        name={'Latitude'}
                        onChange={handleChange}
                        value={formData.lat}
                        required={true}
                    />
                    <Input  
                        type={'text'}
                        id={'lng'}
                        name={'Longditude'}
                        onChange={handleChange}
                        value={formData.lng}  
                        required={true}
                    />       
                </div>
                <div>
                    <Button children={'create'} />
                    <Button children={'cancel'} onClick={() => history.push('/walks')} />
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
    margin: '150px auto',
    maxWidth: '600px',
}

const heading = {
    marginLeft: '100px',
    fontSize: '24px',
    color: '#333',
}
