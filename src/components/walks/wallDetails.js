import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, useHistory } from 'react-router-dom';
import { FaTrashAlt, FaArrowAltCircleUp } from 'react-icons/fa';
import Button from '../universal/button';
import Thumbnail from '../universal/thumbnail';
import Input from '../universal/input';
import { updateProject, deleteImage, deleteProject } from '../../store/actions/projectActions';
import WallDisplay from './wallDisplay';
import ImageUpload from '../universal/imageUpload';
import Loading from '../universal/loading';


let idToPass;


function DisplayWall(props) {
    const {project, auth, updateProject, deleteImage, deleteProject} = props;
    const history = useHistory();
    let { id } = useParams();
    idToPass = id
    const [ isEditing, setIsEditing ] = useState(false);
    const [ wallData, setWallData ] = useState(project)
    const [ editImage, setEditImage ] = useState('')
    
    useEffect(() => {
        if(project) {
            setWallData(project)
        }
    }, [project])

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

    const handleChange = (id, value) => {
        setWallData((prev) => ({...prev, [id]: value}))
    }

    const handleReady = (e) => {
        const obj = {}
        
        for (let key in wallData) {
            if(wallData[key] === '') {
                obj[key] = project[key]
            }
        }
        setWallData(prev => ({...prev, ...obj}))
        uploadUpdate({...wallData, ...obj})
    }
    
    const uploadUpdate = (obj) => {
        updateProject(obj, id)
        setIsEditing(!isEditing)

    }

    const handleImageDelete = (url) => {
        const doubelCheck = window.confirm('Are you sure you want to delete the image?')
        if(doubelCheck){
            deleteImage(url, id)
        }
    }

    const handleCancel = () => {
        setWallData(project)
        setIsEditing(!isEditing)
    }

    const deleteWall = () => {
        if(project.images[0]){
            alert('Delete images first.')
            return
        }
        const doubleCheck = window.confirm('Do you really want to delete the whole document?')
        if(doubleCheck){
            deleteProject(id)
            history.push('/walks')
        }
    }
    
    if(project) {
        return (
            <div className="container" style={detailsDiv}>
                <div style={rightBut}>
                    <Button onClick={() => history.push(`/walks/${idToPass}`)}children={'Back to Map'}/> 
                </div>
              {isEditing ? (
                <div>
                    <div style={rightBut}>
                        <Button onClick={deleteWall}children={'delete wall'}/> 
                    </div>
                  <div>
                    <Input 
                        type={'text'}
                        id={'name'}
                        name={'Name: '}
                        value={wallData.name}
                        onChange={handleChange}
                    />
                    <Input 
                        type={'text'}
                        id={'description'}
                        name={'Description: '}
                        value={wallData.description}
                        onChange={handleChange}
                    />
                    <Input 
                        type={'text'}
                        id={'lat'}
                        name={'Latitude: '}
                        value={wallData.lat}
                        onChange={handleChange}
                    />                 
                    <Input 
                        type={'text'}
                        id={'lng'}
                        name={'Descritpion: '}
                        value={wallData.lng}
                        onChange={handleChange}
                    />
                    <p>Select thumbnail below</p>
                    <Thumbnail src={editImage} />
                    <br/>
                    <div style={imageContainer}>
                        {project.images.map(img => {
                            return (
                            <div key={img} style={{position: 'relative', zIndex: '1'}}>
                                <Thumbnail src={img} />
                                <div style={{position: 'absolute', top: '20px'}}>
                                    <button 
                                        onClick={() => handleEditThmbnail(img)} 
                                        style={imageBtn}>
                                            <FaArrowAltCircleUp size={24}/>
                                    </button>
                                    <button 
                                        onClick={() => handleImageDelete(img)} 
                                        style={imageBtn}>
                                            <FaTrashAlt size={24}/>
                                    </button>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    </div>
                </div>
                ) : (
                <WallDisplay project={wallData} /> 
                )}
                <div style={editContainer}>
                    <div>
                        {isEditing ? (
                            <div style={centerDiv}>
                                <Button onClick={handleReady} children={'Save'}/>
                                <Button children={'cancel'} onClick={handleCancel}/>
                            </div>
                        ) : (
                            <div className="" style={centerDiv} >
                                <Button onClick={handleEdit} children={'Edit'} />
                            </div>
                        )}
                    </div>
                    {isEditing && <ImageUpload id={id} /> }
                </div>
            </div>
        )
    } else {
        return <Loading />
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
        updateProject: (wall, id) => dispatch(updateProject(wall, id)),
        deleteImage: (image, id) => dispatch(deleteImage(image, id)),
        deleteProject: (id) => dispatch(deleteProject(id)),
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(DisplayWall);

const detailsDiv = {
    margin: '50px auto',
    marginTop: '120px', 
    width: '88%',
    maxWidth: '1000px',
    padding: window.innerWidth / 16 + 'px', 
    backgroundColor: '#333333', 
    color: '#f3f3f3', 
    boxShadow: '0 100px 80px rgba(0, 0, 0, 0.3)'
}

const rightBut = {
    textAlign: 'right'
}

const imageContainer = {
    display: 'flex', 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'left'
}

const editContainer = {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
    flexWrap: 'wrap'
}

const centerDiv = {
    textAlign: 'center'
}

const imageBtn = {
    marginLeft: '10px',
    display: 'block',
    color: 'white',
}