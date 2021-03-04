import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, useHistory } from 'react-router-dom';
import { FaTrashAlt, FaArrowAltCircleUp } from 'react-icons/fa';
import Button from '../universal/button';
import Thumbnail from '../universal/thumbnail';
import Input from '../universal/input';
import {
  updateProject,
  deleteImage,
  deleteProject,
} from '../../store/actions/projectActions';
import WallDisplay from './wallDisplay';
import ImageUpload from '../universal/imageUpload';
import Loading from '../universal/loading';
import TextArea from '../universal/textArea';

let idToPass;

function WallDetails(props) {
  const { project, auth, updateProject, deleteImage, deleteProject } = props;
  const history = useHistory();
  let { id } = useParams();
  idToPass = id;
  const [isEditing, setIsEditing] = useState(false);
  const [wallData, setWallData] = useState(project);
  const [editImage, setEditImage] = useState('');

  useEffect(() => {
    if (project) {
      const obj = { ...project, id: id };
      setWallData(obj);
    }
  }, [project]);

  if (!auth.uid) return <Redirect to="/signin" />;

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setEditImage(project.image);
  };

  const handleEditThumbnail = url => {
    if (!isEditing) return;
    setEditImage(url);
    setWallData(prev => ({ ...prev, image: url }));
  };

  const handleChange = (id, value) => {
    setWallData(prev => ({ ...prev, [id]: value }));
  };

  const handleReady = e => {
    const obj = {};

    for (let key in wallData) {
      if (wallData[key] === '') {
        obj[key] = project[key];
      }
    }
    setWallData(prev => ({ ...prev, ...obj }));
    uploadUpdate({ ...wallData, ...obj });
  };

  const uploadUpdate = obj => {
    updateProject(obj, id);
    setIsEditing(!isEditing);
  };

  const handleImageDelete = url => {
    const doubelCheck = window.confirm(
      'Are you sure you want to delete the image?'
    );
    if (doubelCheck) {
      deleteImage(url, id);
    }
  };

  const handleCancel = () => {
    setWallData(project);
    setIsEditing(!isEditing);
  };

  const deleteWall = () => {
    if (project.images[0]) {
      alert('Delete images first.');
      return;
    }
    const doubleCheck = window.confirm(
      'Do you really want to delete the whole document?'
    );
    if (doubleCheck) {
      deleteProject(id);
      history.push('/walks');
    }
  };

  if (project) {
    return (
      <div style={detailsDiv}>
        <div style={rightBut}>
          {!isEditing && <Button onClick={handleEdit} children={'Edit'} />}
          <Button
            onClick={() => history.push(`/walks/${idToPass}`)}
            children={'Back to Map'}
          />
          {isEditing && (
            <Button onClick={deleteWall} children={'delete wall'} />
          )}
        </div>
        {isEditing ? (
          <div>
            <div style={row}>
              <Input
                type={'text'}
                id={'name'}
                name={'Name: '}
                value={wallData.name}
                onChange={handleChange}
              />
            </div>
            <div style={row}>
              <TextArea
                type={'textarea'}
                id={'description'}
                name={'Description: '}
                value={wallData.description}
                onChange={handleChange}
              />
            </div>
            <div style={row}>
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
            </div>
            <div style={column}>
              <div>
                <Thumbnail src={editImage} />
              </div>
              <div style={imageContainer}>
                {project.images.map(img => {
                  return (
                    <div
                      key={img}
                      style={{
                        position: 'relative',
                        zIndex: '1',
                      }}
                    >
                      <Thumbnail src={img} />
                      <div
                        style={{
                          position: 'absolute',
                          top: '20px',
                        }}
                      >
                        <button
                          onClick={() => handleEditThumbnail(img)}
                          style={imageBtn}
                        >
                          <FaArrowAltCircleUp size={24} />
                        </button>
                        <button
                          onClick={() => handleImageDelete(img)}
                          style={imageBtn}
                        >
                          <FaTrashAlt size={24} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <WallDisplay project={wallData} handleEdit={handleEdit} />
        )}
        <div style={editContainer}>
          <div>
            {isEditing ? (
              <div style={centerDiv}>
                <Button onClick={handleReady} children={'Save'} />
                <Button children={'cancel'} onClick={handleCancel} />
              </div>
            ) : (
              <div className="" style={centerDiv}>
                <Button onClick={handleEdit} children={'Edit'} />
              </div>
            )}
            <Button
              onClick={() => history.push(`/walks/${idToPass}`)}
              children={'Back to Map'}
            />
          </div>
          {isEditing && <ImageUpload id={id} usage={'wall'} />}
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}

WallDetails.propTypes = {
  auth: PropTypes.object,
  deleteImage: PropTypes.func,
  deleteProject: PropTypes.func,
  project: PropTypes.object,
  updateProject: PropTypes.func,
};

const mapStateToProps = state => {
  const projects = state.firestore.data.projects;
  const project = projects ? projects[idToPass] : null;
  return {
    project: project,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProject: (wall, id) => dispatch(updateProject(wall, id)),
    deleteImage: (image, id) => dispatch(deleteImage(image, id)),
    deleteProject: id => dispatch(deleteProject(id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'projects' }])
)(WallDetails);

const detailsDiv = {
  margin: '50px auto',
  marginTop: '120px',
  width: '88%',
  maxWidth: '1000px',
  padding: window.innerWidth / 16 + 'px',
  backgroundColor: '#333333',
  color: '#f3f3f3',
  boxShadow: '0 100px 80px rgba(0, 0, 0, 0.3)',
};

const rightBut = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginBottom: '10px',
};

const imageContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'left',
};

const editContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const centerDiv = {
  textAlign: 'center',
};

const imageBtn = {
  marginLeft: '10px',
  display: 'block',
  color: 'white',
};

const row = {
  background: '#464646',
  margin: '50px auto',
  padding: '20px',
  maxWidth: '650px',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  boxShadow: '0 30px 50px rgba(0, 0, 0, 0.3)',
  borderRadius: '5px',
};

const column = {
  background: '#464646',
  margin: '50px auto',
  padding: '20px',
  maxWidth: '650px',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'center',
  boxShadow: '0 100px 80px rgba(0, 0, 0, 0.3)',
  borderRadius: '5px',
};
