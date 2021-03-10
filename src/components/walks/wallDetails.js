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
import GetCoords from '../universal/GetCoords';
import {
  ContainerStyles,
  TopBtns,
  FlexRow,
  FlexColumn,
  ImgCont,
  ImageBtn,
  ThumbDiv,
  BottomBtns,
} from '../Styles/EditStyles';
const myId = process.env.REACT_APP_MY_ID;
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

  if (!project) return <Loading />;
  if (!auth.uid) return <Redirect to="/signin" />;
  if (!(auth.uid === myId || auth.uid === project?.authorId))
    return <Redirect to="/walks" />;

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

  const handleCoords = coords => {
    setWallData(prev => ({
      ...prev,
      lat: coords.lat.toString(),
      lng: coords.lng.toString(),
    }));
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
      <ContainerStyles>
        <TopBtns>
          {!isEditing && <Button onClick={handleEdit} children={'Edit'} />}
          <Button
            onClick={() => history.push(`/walks/${idToPass}`)}
            children={'Back to Map'}
          />
          {isEditing && (
            <Button onClick={deleteWall} children={'delete wall'} />
          )}
        </TopBtns>
        {isEditing ? (
          <div>
            <FlexRow className="editing">
              <Input
                type={'text'}
                id={'name'}
                name={'Name: '}
                value={wallData.name}
                onChange={handleChange}
              />
            </FlexRow>
            <FlexRow className="editing">
              <TextArea
                type={'textarea'}
                id={'description'}
                name={'Description: '}
                value={wallData.description}
                onChange={handleChange}
              />
            </FlexRow>
            <FlexRow className="editing">
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
                name={'Longitude: '}
                value={wallData.lng}
                onChange={handleChange}
              />
              <GetCoords
                passCoords={handleCoords}
                oldCoords={{ lat: wallData.lat, lng: wallData.lng }}
              />
            </FlexRow>
            <FlexColumn className="editing">
              <ThumbDiv className="editing">
                <div>
                  <h2>Teaser</h2>
                  <p>Select a photo below with the arrow.</p>
                </div>
                <Thumbnail src={editImage} />
              </ThumbDiv>
              <ImgCont>
                {project.images.map(img => {
                  return (
                    <div
                      key={img}
                      style={{
                        position: 'relative',
                      }}
                    >
                      <Thumbnail src={img} />
                      <div
                        style={{
                          position: 'absolute',
                          top: '20px',
                        }}
                      >
                        <ImageBtn onClick={() => handleEditThumbnail(img)}>
                          <FaArrowAltCircleUp size={24} />
                        </ImageBtn>
                        <ImageBtn
                          type="button"
                          onClick={() => handleImageDelete(img)}
                        >
                          <FaTrashAlt size={24} />
                        </ImageBtn>
                      </div>
                    </div>
                  );
                })}
              </ImgCont>
            </FlexColumn>
          </div>
        ) : (
          <WallDisplay project={wallData} handleEdit={handleEdit} />
        )}
        <BottomBtns>
          <div>
            {isEditing ? (
              <div className="edit-btns-center">
                <Button onClick={handleReady} children={'Save'} />
                <Button children={'cancel'} onClick={handleCancel} />
              </div>
            ) : (
              <div className="edit-btns-center">
                <Button onClick={handleEdit} children={'Edit'} />
              </div>
            )}
            <Button
              onClick={() => history.push(`/walks/${idToPass}`)}
              children={'Back to Map'}
            />
          </div>
          {isEditing && <ImageUpload id={id} usage={'wall'} />}
        </BottomBtns>
      </ContainerStyles>
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
