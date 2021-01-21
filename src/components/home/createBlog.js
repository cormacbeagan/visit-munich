import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { createBlog } from '../../store/actions/blogActions';
import Button from '../universal/button';
import Input from '../universal/input';

const initialState = {
    name: '',
    subtitle: '',
    textInput: '',
    link: '',
    linkText: '',
}

function CreateBlog(props) {
    const { createBlog, auth } = props
    const [ formData, setFormData ] = useState(initialState)
    const history = useHistory();

    if(!auth.uid) return <Redirect to='/signin' />;

    const handleChange = (id, value) => {
        setFormData((prev) => ({...prev, [id]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createBlog(formData)   
        setFormData(initialState)
        history.push('/')
    }

    return (
      <div>
            <form onSubmit={handleSubmit} style={createDiv}>
                <h2 style={heading}>Create Homepage Entry</h2>
                <div>
                    <Input 
                        type={"text"} 
                        id={"name"}
                        name={'Name'}
                        onChange={handleChange} 
                        value={formData.name}
                        required={true}
                        />
                    <Input 
                        type={"text"} 
                        id={"subtitle"}
                        name={'Subtitle'}
                        onChange={handleChange} 
                        value={formData.subtitle} 
                        required={true}

                        />
                    <Input 
                        type={'text'}
                        id={'textInput'}
                        name={'Blog Text'}
                        onChange={handleChange}
                        value={formData.textInput}
                        required={true}
                    />
                    <Input  
                        type={'text'}
                        id={'link'}
                        name={'Link URL'}
                        onChange={handleChange}
                        value={formData.link}  
                    />
                    <Input  
                        type={'text'}
                        id={'linkText'}
                        name={'Button Text'}
                        onChange={handleChange}
                        value={formData.linkText}  
                    />        
                </div>
                <div>
                    <Button children={'create'} />
                    <Button children={'cancel'} onClick={() => history.push('/')} />
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createBlog: (blog) => dispatch(createBlog(blog)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog)

const createDiv = {
    margin: '150px auto',
    maxWidth: '600px',
}

const heading = {
    marginLeft: '50px',
    fontSize: '24px',
    color: '#333',
}
