import PropTypes from 'prop-types';
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
const myId = process.env.REACT_APP_MY_ID;

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
          <div style={title} key={item.id}>
            {index + 1}
            <br />
            {item.name}
          </div>
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
    <div style={detailsDiv}>
      <div style={rightBut}>
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
      </div>
      {isEditing ? (
        <div>
          <div style={row}>
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
          </div>
          <div style={row}>
            <TextArea
              type={'text'}
              id={'textInput'}
              name={'Text: '}
              value={formData.textInput}
              onChange={handleChange}
            />
          </div>
          <div style={row}>
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
          </div>
          <div style={titleDiv}>{titles}</div>
          <div style={row}>
            <label style={labelStyle} htmlFor="position">
              Choose position:{' '}
            </label>
            <br />
            {entry.rank !== 0 && (
              <select
                style={selectStyle}
                name="position"
                id="rank"
                value="Choose"
                onChange={handleRanking}
              >
                <option>Reorder</option>
                <option>1 is Fixed</option>
                {options}
              </select>
            )}
          </div>
        </div>
      ) : (
        <BlogDisplay blog={formData} handleEdit={handleEdit} />
      )}
      <div style={editContainer}>
        <div>
          {isEditing ? (
            <div style={editContainer}>
              <Button onClick={handleReady} children={'Save'} />
              <Button children={'cancel'} onClick={handleCancel} />
            </div>
          ) : (
            <div>
              <Button onClick={handleEdit} children={'Edit'} />
              <Button onClick={() => history.push(`/`)} children={'Home'} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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

const editContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const title = {
  height: '50px',
  width: '80px',
  padding: '10px',
  margin: '10px',
  background: '#395f78',
  border: '2px solid white',
  borderRadius: '10px',
};

const titleDiv = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const labelStyle = {
  fontSize: '22px',
  marginLeft: '5px',
  marginBottom: '-36px',
  zIndex: '1',
  color: '#dfbaaa',
};

const selectStyle = {
  width: '90px',
  backgroundColor: 'rgb(212, 209, 209)',
  fontSize: '20px',
  padding: '5px',
  outline: 'none',
  border: 'none',
  margin: '0 10px',
};
