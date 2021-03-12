import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '../universal/button';
import Input from '../universal/input';
import { updateRanking } from '../../store/actions/entryActions';
import BlogDisplay from './blogDisplay';
import TextArea from '../universal/textArea';
import Loading from '../universal/loading';
import useEdit from '../../hooks/useEdit';
import {
  BottomBtns,
  ContainerStyles,
  FlexRow,
  TopBtns,
} from '../Styles/EditStyles';
import styled from 'styled-components';
const myId = process.env.REACT_APP_MY_ID;

const OrderTitles = styled.div`
  height: 60px;
  width: 80px;
  padding: 10px;
  margin: 10px;
  background: var(--middleBlue);
  border: 2px solid white;
  border-radius: 10px;
`;

const OrderDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const LabelStyle = styled.label`
  font-size: 22px;
  margin-left: 5px;
  padding-top: 5px;
  color: var(--middleBlue);
`;

const SelectStyle = styled.select`
  width: 110px;
  color: white;
  background: var(--lightBlue);
  font-size: 20px;
  padding: 2px 10px 2px 4px;
  outline: none;
  margin: 0 10px;
  border-radius: 5px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;

export default function EditBlog() {
  const history = useHistory();
  const auth = useSelector(state => state.firebase.auth);
  useFirestoreConnect([{ collection: 'blogs' }]); //* orderBy causes bugs - returns double items
  const blogsArray = useSelector(state => state.firestore.ordered.blogs);
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [titles, setTitles] = useState([]);

  const {
    handleDelete,
    handleCancel,
    handleReady,
    handleChange,
    handleEdit,
    formData,
    isEditing,
    entry,
    id,
  } = useEdit('blogs');

  useEffect(() => {
    if (blogsArray) {
      let optionsArray = [];
      let orderedTitles = [];
      const orderedBlogs = Array.from(blogsArray);
      orderedBlogs.sort((a, b) => (a.rank < b.rank ? -1 : 1));
      orderedBlogs.forEach((item, index) => {
        if (item.rank !== 0) {
          optionsArray.push(
            <option key={item.id} value={index}>
              {index + 1}
            </option>
          );
        }
        orderedTitles.push(
          <OrderTitles key={item.id}>
            <p>
              {index + 1}
              <br />
              {item.name}
            </p>
          </OrderTitles>
        );
      });
      setTitles(orderedTitles);
      setOptions(optionsArray);
    }
  }, [blogsArray]);
  if (!entry) return <Loading />;
  if (auth.uid !== myId) return <Redirect to="/signin" />;

  const handleRanking = (e, rank) => {
    let inputValue;
    if (e) {
      if (e.target.value === 'Choose' || e.target.value === '1 Fixed') return;
      inputValue = Number(e.target.value);
    } else {
      inputValue = rank;
    }
    const origPos = entry.rank;
    if (origPos === inputValue) return;

    if (inputValue > origPos) {
      for (let i = 0; i < blogsArray.length; i++) {
        if (
          blogsArray[i].rank > origPos &&
          blogsArray[i].rank <= inputValue &&
          blogsArray[i].id !== entry.id
        ) {
          dispatch(
            updateRanking(
              Number(blogsArray[i].rank - 1),
              blogsArray[i].id,
              'blogs'
            )
          );
        }
      }
      dispatch(updateRanking(inputValue, id, 'blogs'));
    } else if (inputValue < origPos) {
      for (let i = 0; i < blogsArray.length; i++) {
        if (
          blogsArray[i].rank < origPos &&
          blogsArray[i].rank >= inputValue &&
          blogsArray[i].id !== entry.id
        ) {
          dispatch(
            updateRanking(
              Number(blogsArray[i].rank + 1),
              blogsArray[i].id,
              'blogs'
            )
          );
        }
      }
      dispatch(updateRanking(inputValue, id, 'blogs'));
    }
  };
  return (
    <ContainerStyles>
      <TopBtns>
        {!isEditing && <Button onClick={handleEdit} children={'Edit'} />}
        <Button onClick={() => history.push(`/`)} children={'Home'} />
        {isEditing && (
          <Button
            onClick={() => {
              handleRanking(null, blogsArray.length);
              handleDelete();
            }}
            children={'delete blog'}
          />
        )}
      </TopBtns>
      {isEditing ? (
        <div>
          <FlexRow className="editing">
            <Input
              type={'text'}
              id={'name'}
              name={'Name: '}
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              type={'text'}
              id={'subtitle'}
              name={'Subtitle: '}
              value={formData.subtitle}
              onChange={handleChange}
            />
          </FlexRow>
          <FlexRow className="editing">
            <TextArea
              type={'text'}
              id={'textInput'}
              name={'Text: '}
              value={formData.textInput}
              onChange={handleChange}
            />
          </FlexRow>
          <FlexRow className="editing">
            <Input
              type={'text'}
              id={'link'}
              name={'Link Url: '}
              value={formData.link}
              onChange={handleChange}
            />
            <Input
              type={'text'}
              id={'linkText'}
              name={'Link Text: '}
              value={formData.linkText}
              onChange={handleChange}
            />
          </FlexRow>
          <OrderDiv>{titles}</OrderDiv>
          <FlexRow className="editing">
            <LabelStyle htmlFor="position">Choose position: </LabelStyle>
            <br />
            {entry.rank !== 0 && (
              <SelectStyle
                name="position"
                id="rank"
                value="Choose"
                onChange={handleRanking}
              >
                <option>Reorder</option>
                <option>1 is Fixed</option>
                {options}
              </SelectStyle>
            )}
          </FlexRow>
        </div>
      ) : (
        <BlogDisplay blog={formData} handleEdit={handleEdit} />
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
              <Button onClick={() => history.push(`/`)} children={'Home'} />
            </div>
          )}
        </div>
      </BottomBtns>
    </ContainerStyles>
  );
}
