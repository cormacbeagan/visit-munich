import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment'
import { connect } from 'react-redux';
import Button from '../universal/button';

function DisplayText({ project, auth }) {
    const history = useHistory()
    
    if(project.authorFirstName) {
        return (
            <div style={boxText}>
                <h3 style={heading}>{project.name}</h3>
                <p>{project.description}</p>
                {project.updatedAt ? (
                    <p style={lowlight}>Last updated: <span style={highlight}>{moment(project.updatedAt.toDate()).calendar()}</span></p>

                ) : (
                    <p style={lowlight}>Created: {moment(project.createdAt.toDate()).calendar()}</p>)}
                <div style={{marginLeft: '-5px'}}>
                    <Button children={<a href={`https://www.google.com/maps/search/?api=1&query=${project.lat},${project.lng}`} 
                    target='_blank'
                    rel="noreferrer" 
                    style={{color:'white'}}
                    >Directions</a>} />
                    {auth.uid && <Button onClick={() => history.push(`/wall/${project.id}`)} children={'Edit Wall'} />}
                </div>
            </div>
        )
    } else {
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(DisplayText);

const boxText = {
    margin: '10px',
    color: '#cecbcb',
    contain: 'items',
}

const heading = {
    color: '#51748b',
}

const lowlight = {
    color: '#51748b',
}

const highlight = {
    color: '#cecbcb',

}