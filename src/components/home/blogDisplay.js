import React from 'react';
import moment from 'moment';

 function BlogDisplay({blog}) {
    
    if(blog) {
        return (
            <div>
                <h1 style={lowlight}>Name: <span style={highlight}>{blog.name}</span></h1>
                <h3 style={lowlight}>Subtitle: <span style={highlight}>{blog.subtitle}</span></h3>
                <p style={lowlight}>Text: <span style={highlight}>{blog.textInput}</span></p>
                <p style={lowlight}>Link URL: <span style={highlight}>{blog.link}</span></p>
                <p style={lowlight}>Link Text: <span style={highlight}>{blog.linkText}</span></p>
                <div>
                    <p style={lowlight}>Posted by: <span style={highlight}>{`${blog.authorFirstName} ${blog.authorLastName}`}</span></p>
                    <p style={lowlight}>Posted: <span style={highlight}>{moment(blog.createdAt.toDate()).calendar()}</span></p>
                    {blog.updatedAt && <p style={lowlight}>Last updated: <span style={highlight}>{moment(blog.updatedAt.toDate()).calendar()}</span></p>}
                </div>
            </div>
    )
    } else {
        return <div>Loading... </div>
    } 
}

export default BlogDisplay

const lowlight = {
    color: '#51748b',
    fontWeight: '600',
}
const highlight = {
    color: '#cecbcb'
}