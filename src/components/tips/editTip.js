import { Redirect, useHistory } from 'react-router-dom';
import { FaTrashAlt, FaArrowAltCircleUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Button from '../universal/button';
import Thumbnail from '../universal/thumbnail';
import Input from '../universal/input';
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
import useEdit from '../../hooks/useEdit';
const myId = process.env.REACT_APP_MY_ID;

export default function EditTip() {
  const history = useHistory();
  const auth = useSelector(state => state.firebase.auth);

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
  } = useEdit('tips');

  if (!entry) return <Loading />;
  if (!auth.uid) return <Redirect to="/signin" />;
  if (!(auth.uid === myId || auth.uid === entry?.authorId))
    return <Redirect to="/tips" />;

  return (
    <ContainerStyles>
      <TopBtns>
        {!isEditing && <Button onClick={handleEdit} children={'Edit'} />}
        <Button
          onClick={() => history.push(`/tips/${id}`)}
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
              {entry.images.map(img => {
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
        <TipDisplay tip={entry} handleEdit={handleEdit} />
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
            onClick={() => history.push(`/tips/${id}`)}
            children={'Back to Map'}
          />
        </div>
        {isEditing && <ImageUpload id={id} collection={'tips'} />}
      </BottomBtns>
    </ContainerStyles>
  );
}
