import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '../universal/button';
import Input from '../universal/input';
import {
  updateBlog,
  deleteBlog,
  updateRanking,
} from '../../store/actions/blogActions';
import BlogDisplay from './blogDisplay';
import TextArea from '../universal/textArea';
import Loading from '../universal/loading';
const myId = process.env.REACT_APP_MY_ID;

let idToPass;

function EditBlog(props) {
  const {
    blog,
    auth,
    updateBlog,
    deleteBlog,
    blogsArray,
    updateRanking,
  } = props;
  const history = useHistory();
  let { id } = useParams();
  idToPass = id;
  const [isEditing, setIsEditing] = useState(false);
  const [blogData, setBlogData] = useState(blog);
  const [options, setOptions] = useState([]);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    if (blog) {
      setBlogData(blog);
    }
  }, [blog]);

  useEffect(() => {
    if (blogsArray) {
      let optionsArray = [];
      let orderedTitles = [];
      blogsArray.forEach((item, index) => {
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

  if (auth.uid !== myId) return <Redirect to="/signin" />;

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (id, value) => {
    setBlogData(prev => ({ ...prev, [id]: value }));
  };

  const handleReady = e => {
    const obj = {};
    for (let key in blogData) {
      if (blogData[key] === '') {
        if (!(key === 'link' || key === 'linkText')) {
          obj[key] = blog[key];
        }
      }
    }
    setBlogData(prev => ({ ...prev, ...obj }));
    uploadUpdate({ ...blogData, ...obj });
  };

  const uploadUpdate = obj => {
    updateBlog(obj, id);
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setBlogData(blog);
    setIsEditing(!isEditing);
  };

  const blogDelete = () => {
    const doubleCheck = window.confirm(
      'Do you really want to delete the whole document?'
    );
    if (doubleCheck) {
      handleRanking(null, blogsArray.length);
      deleteBlog(id);
      history.push('/');
    }
  };

  const handleRanking = (e, rank) => {
    let inputValue;
    if (e) {
      if (e.target.value === 'Choose' || e.target.value === '1 Fixed') return;
      inputValue = Number(e.target.value);
    } else {
      inputValue = rank;
    }
    const origPos = blog.rank;
    if (origPos === inputValue) return;

    if (inputValue > origPos) {
      for (let i = 0; i < blogsArray.length; i++) {
        if (
          blogsArray[i].rank > origPos &&
          blogsArray[i].rank <= inputValue &&
          blogsArray[i].id !== blog.id
        ) {
          updateRanking(Number(blogsArray[i].rank - 1), blogsArray[i].id);
        }
      }
      updateRanking(inputValue, id);
    } else if (inputValue < origPos) {
      for (let i = 0; i < blogsArray.length; i++) {
        if (
          blogsArray[i].rank < origPos &&
          blogsArray[i].rank >= inputValue &&
          blogsArray[i].id !== blog.id
        ) {
          updateRanking(Number(blogsArray[i].rank + 1), blogsArray[i].id);
        }
      }
      updateRanking(inputValue, id);
    }
  };

  if (blog) {
    return (
      <div style={detailsDiv}>
        <div style={rightBut}>
          {!isEditing && <Button onClick={handleEdit} children={'Edit'} />}
          <Button onClick={() => history.push(`/`)} children={'Back to map'} />
          {isEditing && (
            <Button onClick={blogDelete} children={'delete blog'} />
          )}
        </div>
        {isEditing ? (
          <div>
            <div style={row}>
              <Input
                type={'text'}
                id={'name'}
                name={'Name: '}
                value={blogData.name}
                onChange={handleChange}
              />
              <Input
                type={'text'}
                id={'subtitle'}
                name={'Subtitle: '}
                value={blogData.subtitle}
                onChange={handleChange}
              />
            </div>
            <div style={row}>
              <TextArea
                type={'text'}
                id={'textInput'}
                name={'Text: '}
                value={blogData.textInput}
                onChange={handleChange}
              />
            </div>
            <div style={row}>
              <Input
                type={'text'}
                id={'link'}
                name={'Link Url: '}
                value={blogData.link}
                onChange={handleChange}
              />
              <Input
                type={'text'}
                id={'linkText'}
                name={'Link Text: '}
                value={blogData.linkText}
                onChange={handleChange}
              />
            </div>
            <div style={titleDiv}>{titles}</div>
            <div style={row}>
              <label style={labelStyle} htmlFor="position">
                Choose position:{' '}
              </label>
              <br />
              {blog.rank !== 0 && (
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
          <BlogDisplay blog={blogData} handleEdit={handleEdit} />
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
                <Button
                  onClick={() => history.push(`/`)}
                  children={'Back to map'}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}

EditBlog.propTypes = {
  auth: PropTypes.object,
  blog: PropTypes.object,
  blogsArray: PropTypes.array,
  deleteBlog: PropTypes.func,
  updateBlog: PropTypes.func,
  updateRanking: PropTypes.func,
};

const mapStateToProps = state => {
  const blogs = state.firestore.data.blogs;
  const blogsArray = state.firestore.ordered.blogs;
  const blog = blogs ? blogs[idToPass] : null;
  return {
    blog: blog,
    auth: state.firebase.auth,
    blogs: blogs,
    blogsArray: blogsArray,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateBlog: (blog, id) => dispatch(updateBlog(blog, id)),
    deleteBlog: id => dispatch(deleteBlog(id)),
    updateRanking: (ranking, id) => dispatch(updateRanking(ranking, id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'blogs', orderBy: ['rank'] }])
)(EditBlog);

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
