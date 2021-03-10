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
  updateTip,
  deleteTipImage,
  deleteTip,
} from '../../store/actions/tipActions';
import TipDisplay from './tipDisplay';
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

function EditTip(props) {
  const { tip, auth, updateTip, deleteTipImage, deleteTip } = props;
  const history = useHistory();
  let { id } = useParams();
  idToPass = id;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(tip);
  const [editImage, setEditImage] = useState('');

  useEffect(() => {
    if (tip) {
      setFormData(tip);
    }
  }, [tip]);
  if (!tip) return <Loading />;
  if (!auth.uid) return <Redirect to="/signin" />;
  if (!(auth.uid === myId || auth.uid === tip?.authorId))
    return <Redirect to="/tips" />;

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setEditImage(tip.image);
  };

  const handleEditThumbnail = url => {
    if (!isEditing) return;
    setEditImage(url);
    setFormData(prev => ({ ...prev, image: url }));
  };

  const handleChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCoords = coords => {
    setFormData(prev => ({
      ...prev,
      lat: coords.lat.toString(),
      lng: coords.lng.toString(),
    }));
  };

  const handleReady = e => {
    const obj = {};

    for (let key in formData) {
      if (formData[key] === '') {
        obj[key] = tip[key];
      }
    }
    setFormData(prev => ({ ...prev, ...obj }));
    uploadUpdate({ ...formData, ...obj });
  };

  const uploadUpdate = obj => {
    updateTip(obj, id);
    setIsEditing(!isEditing);
  };

  const handleImageDelete = url => {
    const doubelCheck = window.confirm(
      'Are you sure you want to delete the image?'
    );
    if (doubelCheck) {
      deleteTipImage(url, id);
    }
  };

  const handleCancel = () => {
    setFormData(tip);
    setIsEditing(!isEditing);
  };

  const handleDeleteTip = () => {
    if (tip.images[0]) {
      alert('Delete images first.');
      return;
    }
    const doubleCheck = window.confirm(
      'Do you really want to delete the whole document?'
    );
    if (doubleCheck) {
      deleteTip(id);
      history.push('/tips');
    }
  };

  if (tip) {
    return (
      <ContainerStyles>
        <TopBtns>
          {!isEditing && <Button onClick={handleEdit} children={'Edit'} />}
          <Button
            onClick={() => history.push(`/tips/${idToPass}`)}
            children={'Back to Map'}
          />
          {isEditing && (
            <Button onClick={handleDeleteTip} children={'delete wall'} />
          )}
        </TopBtns>
        {isEditing ? (
          <div>
            <FlexRow className="editing">
              <Input
                type={'text'}
                id={'name'}
                name={'Name'}
                onChange={handleChange}
                value={formData.name}
                required={true}
              />
              <Input
                type={'text'}
                id={'subtitle'}
                name={'Subtitle'}
                onChange={handleChange}
                value={formData.subtitle}
                required={true}
              />
            </FlexRow>
            <FlexRow className="editing">
              <TextArea
                type={'textarea'}
                id={'textInput'}
                name={'Tip'}
                onChange={handleChange}
                value={formData.textInput}
                required={true}
              />
            </FlexRow>
            <FlexRow className="editing">
              <Input
                type={'text'}
                id={'link'}
                name={'Link'}
                onChange={handleChange}
                value={formData.link}
              />
              <Input
                type={'text'}
                id={'linkText'}
                name={'Link text'}
                onChange={handleChange}
                value={formData.linkText}
              />
            </FlexRow>
            <FlexRow className="editing">
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
                name={'Longitude'}
                onChange={handleChange}
                value={formData.lng}
                required={true}
              />
              <GetCoords
                passCoords={handleCoords}
                oldCoords={{ lat: formData.lat, lng: formData.lng }}
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
                {tip.images.map(img => {
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
                        <ImageBtn onClick={() => handleImageDelete(img)}>
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
          <TipDisplay tip={formData} handleEdit={handleEdit} />
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
              onClick={() => history.push(`/tips/${idToPass}`)}
              children={'Back to Map'}
            />
          </div>
          {isEditing && <ImageUpload id={id} usage={'tip'} />}
        </BottomBtns>
      </ContainerStyles>
    );
  } else {
    return <Loading />;
  }
}

EditTip.propTypes = {
  auth: PropTypes.object,
  tip: PropTypes.object,
  deleteTip: PropTypes.func,
  deleteTipImage: PropTypes.func,
  updateTip: PropTypes.func,
};

const mapStateToProps = state => {
  const tips = state.firestore.data.tips;
  const tip = tips ? tips[idToPass] : null;
  return {
    tip: tip,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTip: (tip, id) => dispatch(updateTip(tip, id)),
    deleteTipImage: (image, id) => dispatch(deleteTipImage(image, id)),
    deleteTip: id => dispatch(deleteTip(id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'tips' }])
)(EditTip);
