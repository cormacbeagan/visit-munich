import { Redirect, useHistory } from 'react-router-dom';
import { FaTrashAlt, FaArrowAltCircleUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Button from '../universal/button';
import Thumbnail from '../universal/thumbnail';
import Input from '../universal/input';
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
import useEdit from '../../hooks/useEdit';
import { useEffect, useRef } from 'react';
const myId = process.env.REACT_APP_MY_ID;

export default function WallDetails() {
  const history = useHistory();
  const auth = useSelector(state => state.firebase.auth);
  const input = useRef(null);
  const topEdit = useRef(null);
  const {
    handleDelete,
    handleCancel,
    handleImageDelete,
    handleEditThumbnail,
    handleReady,
    handleCoords,
    handleChange,
    handleEdit,
    editImage,
    formData,
    isEditing,
    entry,
    id,
  } = useEdit('projects');

  useEffect(() => {
    if (isEditing) {
      input.current.focus();
    } else {
      topEdit.current.focus();
    }
  }, [isEditing]);

  if (!entry) return <Loading />;
  if (!auth.uid) return <Redirect to="/signin" />;
  if (!(auth.uid === myId || auth.uid === entry?.authorId)) {
    return <Redirect to="/walks" />;
  }
  return (
    <ContainerStyles>
      <TopBtns>
        {!isEditing && <Button onClick={handleEdit} children={'Edit'} />}
        <Button
          onClick={() => history.push(`/walks/${id}`)}
          ref={topEdit}
          children={'Back to Map'}
        />
        {isEditing && (
          <Button onClick={handleDelete} children={'delete wall'} />
        )}
      </TopBtns>
      {isEditing ? (
        <div>
          <FlexRow className="editing">
            <Input
              ref={input}
              type={'text'}
              id={'name'}
              name={'Name: '}
              value={formData.name}
              onChange={handleChange}
              required={true}
            />
          </FlexRow>
          <FlexRow className="editing">
            <TextArea
              type={'textarea'}
              id={'description'}
              name={'Description: '}
              value={formData.description}
              onChange={handleChange}
            />
          </FlexRow>
          <FlexRow className="editing">
            <Input
              type={'text'}
              id={'lat'}
              name={'Latitude: '}
              value={formData.lat}
              onChange={handleChange}
              required={true}
            />
            <Input
              type={'text'}
              id={'lng'}
              name={'Longitude: '}
              value={formData.lng}
              onChange={handleChange}
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
              {formData.images.map(img => {
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
        <WallDisplay project={entry} handleEdit={handleEdit} />
      )}
      <BottomBtns>
        {isEditing && <ImageUpload id={id} collection={'projects'} />}
        <div className="bot-btns-inner">
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
            onClick={() => history.push(`/walks/${id}`)}
            children={'Back to Map'}
          />
        </div>
      </BottomBtns>
    </ContainerStyles>
  );
}
