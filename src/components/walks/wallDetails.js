import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment'

let idToPass;

function DisplayWall(props) {
    const {project, auth} = props;
    console.log(project)
    let { id } = useParams();
    idToPass = id
    
    if(!auth.uid) return <Redirect to='/signin' />

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        //createProject(formData)   
       // history.push('/walks')
    }

    if(project) {
        return (
            <div style={{margin: '20px'}}>
                <h3>Name: <span style={{color: '#a2616d'}}>{project.name}</span></h3>
                <h5>Description: <span style={{color: '#a2616d'}}>{project.description}</span></h5>
                <p></p>
                <p>Latitude: <span style={{color: '#a2616d'}}>{project.lat}</span></p>
                <p>Longditude: <span style={{color: '#a2616d'}}>{project.lng}</span></p>
                <div>
                    <p>URL: <span style={{color: '#a2616d'}}>{project.image}</span></p>
                    <img style={{width: '80px', height: '80px'}} src={project.image} alt="Wall thumbnail"/>
                </div>
                <p>Posted by: <span style={{color: '#a2616d'}}>{`${project.authorFirstName} ${project.authorLastName}`}</span></p>
                <p>Posted: {moment(project.createdAt.toDate()).calendar()}</p>
                <h6>Add Images</h6>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input type="file" accept="image/*,.pdf" id="file"/>
                    </div>
                    <div className="input-field">
                        <button className="btn grey darken-2 z-depth-0">Create</button>
                    </div>
                </form>
            </div>
        
        )
    } else {
        return <div>Loading Project...</div>
    }
}

const mapStateToProps = (state) => {
    const projects = state.firestore.data.projects;
    const project = projects ? projects[idToPass] : null;
    return {
        project: project,
        auth: state.firebase.auth
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(DisplayWall);
