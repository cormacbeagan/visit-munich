import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '../universal/button';
import Input from '../universal/input';
import { updateBlog, deleteBlog } from '../../store/actions/blogActions';
import BlogDisplay from './blogDisplay';

let idToPass;


function EditBlog(props) {
    const {blog, auth, updateBlog, deleteBlog} = props;
    const history = useHistory();
    let { id } = useParams();
    idToPass = id
    const [ isEditing, setIsEditing ] = useState(false);
    const [ blogData, setBlogData ] = useState(blog)
    
    useEffect(() => {
        if(blog) {
            setBlogData(blog)
        }
    }, [blog])

    if(!auth.uid) return <Redirect to='/signin' />
    


    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleChange = (id, value) => {
        setBlogData((prev) => ({...prev, [id]: value}))
    }

    const handleReady = (e) => {
        const obj = {}
        
        for (let key in blogData) {
            if(blogData[key] === '') {
                obj[key] = blog[key]
            }
        }
        setBlogData(prev => ({...prev, ...obj}))
        uploadUpdate({...blogData, ...obj})
    }
    
    const uploadUpdate = (obj) => {
        updateBlog(obj, id)
        setIsEditing(!isEditing)

    }

    const handleCancel = () => {
        setBlogData(blog)
        setIsEditing(!isEditing)
    }

    const blogDelete = () => {
        const doubleCheck = window.confirm('Do you really want to delete the whole document?')
        if(doubleCheck){
            deleteBlog(id)
            history.push('/')
        }
    }
    
    if(blog) {
        return (
            <div className="container" style={detailsDiv}>
                <div style={rightBut}>
                    <Button onClick={() => history.push(`/`)}children={'Back'}/> 
                </div>
              {isEditing ? (
                <div>
                    <div style={rightBut}>
                        <Button onClick={blogDelete} children={'delete blog'}/> 
                    </div>
                    <div>
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
                        <Input 
                            type={'text'}
                            id={'textInput'}
                            name={'Text: '}
                            value={blogData.textInput}
                            onChange={handleChange}
                        />                 
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
                </div>
                ) : (
                <BlogDisplay blog={blogData} /> 
                )}
                <div style={editContainer}>
                    <div>
                        {isEditing ? (
                            <div style={centerDiv}>
                                <Button onClick={handleReady} children={'Save'}/>
                                <Button children={'cancel'} onClick={handleCancel}/>
                            </div>
                        ) : (
                            <div style={centerDiv} >
                                <Button onClick={handleEdit} children={'Edit'} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div style={{margin: '200px auto', textAlign: 'center'}}> 
                <h4 className="center">2 secs, just need to make a coffee...</h4>
            </div>)
    }
}

const mapStateToProps = (state) => {
    const blogs = state.firestore.data.blogs;
    const blog = blogs ? blogs[idToPass] : null;
    return {
        blog: blog,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBlog: (blog, id) => dispatch(updateBlog(blog, id)),
        deleteBlog: (id) => dispatch(deleteBlog(id)),
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'blogs' }
    ])
)(EditBlog);

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