import React, { useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { uploadImage } from '../../store/actions/projectActions';
import moment from 'moment'

let idToPass;

function DisplayWall(props) {
    const {project, auth, uploadImage} = props;
    let { id } = useParams();
    idToPass = id
    const [ imageFile, setImageFile ] = useState(null)
    const input = useRef();
    
    if(!auth.uid) return <Redirect to='/signin' />

    const handleChange = (e) => {
        console.log(e)
        if(e.target.files[0]){
            setImageFile(e.target.files[0])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        uploadImage(imageFile, id)
        console.log(e)
        input.current.value = null
        
    }

    if(project) {
        console.log(project)
        return (
            <div style={{margin: '20px'}}>
                <h3>Name: <span style={{color: '#a2616d'}}>{project.name}</span></h3>
                <h5>Description: <span style={{color: '#a2616d'}}>{project.description}</span></h5>
                <p></p>
                <p>Latitude: <span style={{color: '#a2616d'}}>{project.lat}</span></p>
                <p>Longditude: <span style={{color: '#a2616d'}}>{project.lng}</span></p>
                <div>
                    <p>URL: <span style={{color: '#a2616d'}}>{project.image}</span></p>
                    {project.images.map(img => {
                        return (
                        <div key={img} style={{display: 'inline'}}>
                            <img style={{width: '80px', height: '80px', overflow: 'hidden', margin: '5px'}} src={img} alt="Wall thumbnail"/>
                        </div>
                        )
                    })}
                </div>
                <p>Posted by: <span style={{color: '#a2616d'}}>{`${project.authorFirstName} ${project.authorLastName}`}</span></p>
                <p>Posted: {moment(project.createdAt.toDate()).calendar()}</p>
                <h6>Add Images</h6>
                <form  onSubmit={handleSubmit}>
                <div className="input-field">
                    <input ref={input} onChange={handleChange} type="file" accept="image/*,.pdf" id="file"/>
                </div>
                <div className="input-field">
                    <button className="btn grey darken-2 z-depth-0">Upload</button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        uploadImage: (image, id) => dispatch(uploadImage(image, id))
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(DisplayWall);
