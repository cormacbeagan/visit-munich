import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'

function DisplayText({ project }) {
    if(project.authorFirstName){
        return (
            <div style={boxText}>
                <h5>{project.name}</h5>
                <p>{project.description}</p>
                {project.name && 
                <a href={`https://www.google.com/maps/search/?api=1&query=${project.lat},${project.lng}`} 
                target='_blank'
                rel="noreferrer" 
                >Directions</a>}
                <p>Posted by: {`${project.authorFirstName} ${project.authorLastName}`}</p>
                <p>Created: {moment(project.createdAt.toDate()).calendar()}</p>
                <br/>
                <Link to={'/wall/' + project.id}>Edit</Link>
                
            </div>
        )
    }else{
        return null;
    }
}

const boxText = {
    margin: '10px',
    color: '#333',
}

export default DisplayText;

