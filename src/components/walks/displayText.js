import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment'
import { connect } from 'react-redux';
import Button from '../universal/button';
import Loading from '../universal/loading';


function DisplayText({ project, auth }) {
    const history = useHistory()
    const link = useRef();
    
    if(project.authorFirstName) {
        return (
            <div style={boxText}>
                <h3 style={heading}>{project.name}</h3>
                <p>{project.description}</p>
                {project.updatedAt ? (
                    <div>
                        <p style={highlight}>Last updated: </p>
                        <p style={highlight}>{moment(project.updatedAt.toDate()).calendar()}</p>
                    </div>
                ) : (
                    <p style={lowlight}>Created: {moment(project.createdAt.toDate()).calendar()}</p>)}
                <div style={divBottom}>
                    <Button children={'directions'} onClick={() => link.current.click()}/>
                    <a ref={link}href={`https://www.google.com/maps/search/?api=1&query=${project.lat},${project.lng}`} 
                        target='_blank'
                        rel="noreferrer" 
                        style={{display: 'none'}}
                        >google maps</a>
                    {auth.uid && <Button onClick={() => history.push(`/wall/${project.id}`)} children={'Edit Wall'} />}
                </div>
            </div>
        )
    } else {
        return <Loading />
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
    margin: '0',
    color: '#cecbcb',

}

const divBottom = {
    position: 'absolute', 
    bottom: '20px', 
    right: '20px',
}