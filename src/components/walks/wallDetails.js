import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { uploadImage, updateProject } from '../../store/actions/projectActions';
import moment from 'moment'

let idToPass;
const initialState = {
    name: '',
    description: '',
    lat: '',
    lng: '',
    image: '',
}

function DisplayWall(props) {
    const {project, auth, uploadImage, updateProject} = props;
    let { id } = useParams();
    idToPass = id
    const [ imageFile, setImageFile ] = useState(null)
    const input = useRef();
    const [ isEditing, setIsEditing ] = useState(false);
    const [ wallData, setWallData ] = useState(initialState)
    const [ editImage, setEditImage ] = useState('')
    const [ isReady, setIsReady ] = useState(false);
    
    if(!auth.uid) return <Redirect to='/signin' />

    const handleEdit = () => {
        setIsEditing(!isEditing)
        setEditImage(project.image)
    }
    
    const handleEditThmbnail = (e) => {
        if(!isEditing) return
        setEditImage(e.target.currentSrc)
        setWallData(prev => ({...prev, image: e.target.currentSrc}))
    }

    const handleImageFileSelect = (e) => {
        if(e.target.files[0]){
            setImageFile(e.target.files[0])
        }
    }

    const handleImageUpload = (e) => {
        e.preventDefault();
        uploadImage(imageFile, id)
        input.current.value = null
    }

    const handleChange = (e) => {
        setWallData((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleReady = (e) => {
        const obj = {}

        if(!(wallData.image.match('https://firebasestorage.googleapis.com/v0/b/visit-munich.appspot.com/o/images%'))) {
            setWallData(prev => ({...prev, image: project.image}))}

        for (let key in wallData) {
            if(wallData[key] === '') {
                obj[key] = project[key]
            }
        }
        setWallData(prev => ({...prev, ...obj}))
        setIsReady(!isReady)
    }
    
    const uploadUpdate = () => {
        console.log(wallData)
        updateProject(wallData, id)
        setIsEditing(!isEditing)

    }
    
    if(project) {
        return (
            <div style={{margin: '70px'}}>
            {isEditing ? (
                <div>
                  {isReady ? (
                  <div>
                    <h3>Name: <span style={{color: '#a2616d'}}>{wallData.name}</span></h3>
                    <h6>Description: <span style={{color: '#a2616d'}}>{wallData.description}</span></h6>
                    <p></p>
                    <p>Latitude: <span style={{color: '#a2616d'}}>{wallData.lat}</span></p>
                    <p>Longditude: <span style={{color: '#a2616d'}}>{wallData.lng}</span></p>
                    <p>Thumbnail</p>
                    <img style={{width: '80px', height: '80px', overflow: 'hidden'}} src={wallData.image} alt="Wall thumbnail"/>
                  </div>
                  ):(
                  <div>
                    <div className="input-field">
                        <input onChange={handleChange} type="text" id="name" defaultValue={project.name}/>
                        <label className="active" htmlFor="name">Name: </label>
                    </div>
                    <div className="input-field">
                        <input onChange={handleChange} type="text" id="description" defaultValue={project.description}/>
                        <label className="active" htmlFor="description">Description: </label>
                    </div>
                    <div className="input-field">
                        <input onChange={handleChange} type="text" id="lat" defaultValue={project.lat}/>
                        <label className="active" htmlFor="latitude">Latitude: </label>
                    </div>
                    <div className="input-field">
                        <input onChange={handleChange} type="text" id="lng" defaultValue={project.lng}/>
                        <label className="active" htmlFor="longditude">Longditude: </label>
                    </div>
                    <p>Select thumbnail below</p>
                    <img style={{width: '80px', height: '80px', overflow: 'hidden'}} src={editImage} alt="Wall thumbnail"/>
                    <br/>
                  </div>
                  )}
                  {!isReady &&<button className="btn grey darken-2 z-depth-0" onClick={handleReady}>Check</button>}
                  {isReady && <div><button style={{margin: '5px'}}className="btn grey darken-2 z-depth-0" onClick={uploadUpdate}>Upload</button>
                  <button className="btn grey darken-2 z-depth-0" onClick={handleReady}>Edit</button></div>}

                <div>
                    {project.images.map(img => {
                        return (
                        <div key={img} style={{display: 'inline'}}>
                            <img onClick={handleEditThmbnail} style={{width: '80px', height: '80px', overflow: 'hidden', margin: '5px'}} src={img} alt="Wall thumbnail"/>
                        </div>
                        )
                    })}
                </div>
                </div>
                
                ) : (

                <div>
                    <h3>Name: <span style={{color: '#a2616d'}}>{project.name}</span></h3>
                    <h6>Description: <span style={{color: '#a2616d'}}>{project.description}</span></h6>
                    <p></p>
                    <p>Latitude: <span style={{color: '#a2616d'}}>{project.lat}</span></p>
                    <p>Longditude: <span style={{color: '#a2616d'}}>{project.lng}</span></p>
                    <p>Thumbnail</p>
                    <img style={{width: '80px', height: '80px', overflow: 'hidden'}} src={project.image} alt="Wall thumbnail"/>
                    <br/>
                    <button className="btn grey darken-2 z-depth-0" onClick={handleEdit}>Edit</button>
                    <br/>
                    <br/>
                    <div>
                        {project.images.map(img => {
                            return (
                            <div key={img} style={{display: 'inline'}}>
                                <img style={{width: '80px', height: '80px', overflow: 'hidden', margin: '5px'}} src={img} alt="Wall series"/>
                            </div>
                            )
                        })}
                    </div>
                </div>
                )}


                <p>Posted by: <span style={{color: '#a2616d'}}>{`${project.authorFirstName} ${project.authorLastName}`}</span></p>
                <p>Posted: {moment(project.createdAt.toDate()).calendar()}</p>
                <h6>Add Images</h6>
                <form  onSubmit={handleImageUpload}>
                <div className="input-field">
                    <input ref={input} onChange={handleImageFileSelect} type="file" accept="image/*,.pdf" id="file"/>
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

             //     <div className="input-field">
             //       <input onChange={handleChange} type="text" id="image"/> {/* need to put a check to make sure that this comes from our storage bucket 
             //                                       url sonst gibt es porn oä // also if its blank or invalid submit the old one*/}
             //       <label className="" htmlFor="image">Copy image address from thumbnail below</label>
             //     </div>
             

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
        uploadImage: (image, id) => dispatch(uploadImage(image, id)),
        updateProject: (wall, id) => dispatch(updateProject(wall, id)),
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(DisplayWall);

