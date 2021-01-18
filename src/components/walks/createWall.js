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
        createProject(formData)   
        setFormData(initialState)
        history.push('/walks')
    }

    return (
      <div style={createDiv}>
            <form onSubmit={handleSubmit} className="">
                <h2 style={{color: '#333'}}>Create Wall</h2>
                <div style={divStyle}>
                    <Input 
                        type={"text"} 
                        id={"name"}
                        name={'Wall Title'}
                        onChange={handleChange} 
                        value={formData.name} 
                        />
                    <Input 
                        type={'text'}
                        id={'description'}
                        name={'Wall description'}
                        onChange={handleChange}
                        value={formData.description}
                    />
                    <Input
                        type={'text'}
                        id={'lat'}
                        name={'Latitude'}
                        onChange={handleChange}
                        value={formData.lat}
                    />
                    <Input  
                        type={'text'}
                        id={'lng'}
                        name={'Longditude'}
                        onChange={handleChange}
                        value={formData.lng}  
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
    padding: '50px', 
    alignContent: 'center',
    margin: '30px auto',
}

const divStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    maxWidth: '500px',
}
