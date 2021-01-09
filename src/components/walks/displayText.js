import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment'
import Button from '../universal/button';

function DisplayText({ project }) {
    const history = useHistory()

    if(project.authorFirstName){
        return (
            <div style={boxText}>
                <h5>{project.name}</h5>
                <p>{project.description}</p>
                {project.updatedAt ? (
                    <p>Last updated: {moment(project.updatedAt.toDate()).calendar()}</p>

                ) : (
                    <p>Created: {moment(project.createdAt.toDate()).calendar()}</p>)}
                <div style={{marginLeft: '-5px'}}>
                    <Button children={<a href={`https://www.google.com/maps/search/?api=1&query=${project.lat},${project.lng}`} 
                    target='_blank'
                    rel="noreferrer" 
                    style={{color:'white'}}
                    >Directions</a>} />
                    <Button onClick={() => history.push(`/wall/${project.id}`)} children={'Edit Wall'} />
                </div>
            </div>
        )
    }else{
        return null;
    }
}

const boxText = {
    margin: '10px',
    color: 'white',
    contain: 'items',
}

export default DisplayText;

//
// 