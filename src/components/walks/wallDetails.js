import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, useHistory } from 'react-router-dom';
import { FaTrashAlt, FaArrowAltCircleUp, FaFileImport } from 'react-icons/fa';
import Button from '../universal/button';
import Thumbnail from '../universal/thumbnail';

import { uploadImage, updateProject, deleteImage } from '../../store/actions/projectActions';
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
    const {project, auth, uploadImage, updateProject, deleteImage} = props;
    const input = useRef();
    const history = useHistory();
    let { id } = useParams();
    idToPass = id
    const [ imageFile, setImageFile ] = useState(null)
    const [ isEditing, setIsEditing ] = useState(false);
    const [ wallData, setWallData ] = useState(initialState)
    const [ editImage, setEditImage ] = useState('')
    const [ isReady, setIsReady ] = useState(false);
    const [ imageName, setImageName ] = useState(null)
    
    if(!auth.uid) return <Redirect to='/signin' />

    const handleEdit = () => {
        setIsEditing(!isEditing)
        setEditImage(project.image)
    }
    
    const handleEditThmbnail = (url) => {
        if(!isEditing) return
        setEditImage(url)
        setWallData(prev => ({...prev, image: url}))
    }
    
    const handleImageFileSelect = (e) => {
        if(e.target.files[0]){
            setImageFile(e.target.files[0])
            setImageName(e.target.files[0].name)
        }
    }

    const handleImageUpload = (e) => {
        e.preventDefault();
        uploadImage(imageFile, id)
        input.current.value = null
        setImageName(null)
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
        updateProject(wallData, id)
        setIsEditing(!isEditing)

    }

    const handleImageDelete = (url) => {
        const doubelCheck = window.confirm('Are you sure you want to delete the image?')
        if(doubelCheck){
            deleteImage(url, id)
        }
    }
    
    if(project) {
        return (
            <div className="container" style={{margin: '70px auto', padding: '50px', backgroundColor: '#333333', color: '#f3f3f3', boxShadow: '0 100px 80px rgba(0, 0, 0, 0.3)'}}>
                <div style={{textAlign: 'right'}}>
                    <Button onClick={() => history.push('/walks')}children={'Back to Map'}/> 
                </div>
              {isEditing ? (
                <div>
                  {isReady ? (
                  <div>
                    <h3>Name: <span style={{color: '#f34a6994'}}>{wallData.name}</span></h3>
                    <h6>Description: <span style={{color: '##f34a6994'}}>{wallData.description}</span></h6>
                    <p></p>
                    <p>Latitude: <span style={{color: '##f34a6994'}}>{wallData.lat}</span></p>
                    <p>Longditude: <span style={{color: '##f34a6994'}}>{wallData.lng}</span></p>
                    <p>Thumbnail</p>
                    <Thumbnail src={wallData.image} />
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
                    <Thumbnail src={editImage} />
                    <br/>
                  </div>
                  )}
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                        {project.images.map(img => {
                            return (
                            <div key={img} style={{position: 'relative', zIndex: '1'}}>
                                <Thumbnail src={img} />
                                <div style={{position: 'absolute', top: '20px'}}>
                                    <button 
                                        onClick={() => handleEditThmbnail(img)} 
                                        className="btn transparent z-depth-0">
                                            <FaArrowAltCircleUp size={24}/>
                                    </button>
                                    <button 
                                        onClick={() => handleImageDelete(img)} 
                                        className="btn transparent z-depth-0">
                                            <FaTrashAlt size={24}/>
                                    </button>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
                
                ) : (

                <div>
                    <h3>Name: <span style={{color: '#f34a6994'}}>{project.name}</span></h3>
                    <h6>Description: <span style={{color: '#f34a6994'}}>{project.description}</span></h6>
                    <p>Latitude: <span style={{color: '#f34a6994'}}>{project.lat}</span></p>
                    <p>Longditude: <span style={{color: '#f34a6994'}}>{project.lng}</span></p>
                    <div>
                        <p>Posted by: <span style={{color: '#f34a6994'}}>{`${project.authorFirstName} ${project.authorLastName}`}</span></p>
                        <p>Posted: <span style={{color: '#f34a6994'}}>{moment(project.createdAt.toDate()).calendar()}</span></p>
                        {project.updatedAt && <p>Last updated: <span style={{color: '#f34a6994'}}>{moment(project.updatedAt.toDate()).calendar()}</span></p>}
                    </div>
                    <Thumbnail src={project.image} />
                    <br/>
                    <br/>
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}} >
                        {project.images.map(img => {
                            return (
                            <div key={img} style={{display: 'inline'}}>
                                <Thumbnail src={img} />
                            </div>
                            )
                        })}
                    </div>
                    
                </div>
                )}
                <div className="row">
                    <div className="col s12 m4" style={{margin: '30px'}}>
                        {isEditing && (
                            <div>
                            {isReady ? (
                                <div style={{textAlign: 'center'}}>
                                    <Button onClick={uploadUpdate} children={'Save'}/>
                                    <Button onClick={handleReady} children={'Edit'} />
                                </div>
                            ) : (
                                <div style={{textAlign: 'center'}} >
                                        <Button onClick={handleReady} children={'Check'}/>
                                </div>
                            )}
                            <div style={{textAlign: 'center'}} >
                                <Button children={'cancel'} onClick={() => setIsEditing(!isEditing)}/>
                            </div>
                            </div>
                        )
                        }
                        {!isEditing && 
                            <div className="" style={{textAlign: 'center'}} >
                                <Button onClick={handleEdit} children={'Edit'} />
                            </div>
                        }
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <h6>Select Image: </h6>
                        <form  onSubmit={handleImageUpload}>
                            <div className="input-field" style={{ maxHeight: '75px'}}>
                                <div style={{display: 'inline', margin: '0px 10px'}}>
                                    <label htmlFor="file" style={{cursor: 'pointer', color: '#616161'}}>
                                        <input style={{display: 'none'}} 
                                        ref={input} 
                                        onChange={handleImageFileSelect} 
                                        type="file" accept="image/*,.pdf" id="file"/>
                                        <FaFileImport size={32} onClick={() => setImageName(null)}/>
                                    </label>
                                </div>
                                {imageFile && <p style={{color: '#113963'}}>{imageName}</p>}
                            </div>
                            <div className="input-field">
                                <Button children={'Upload Image'} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    } else {
        return <h4 className="center">2 secs, just need to make a coffee...</h4>
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
        uploadImage: (image, id) => dispatch(uploadImage(image, id)),
        updateProject: (wall, id) => dispatch(updateProject(wall, id)),
        deleteImage: (image, id) => dispatch(deleteImage(image, id)),
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(DisplayWall);
