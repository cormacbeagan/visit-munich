import React from 'react';
import moment from 'moment';
import Thumbnail from '../universal/thumbnail';
import Loading from '../universal/loading';
import BoxWrapper from '../universal/boxWrapper';
import DisplayText from './displayText';

 function WallDisplay({ project, handleEdit }) {
    
    if(project) {
        return (
            <div>
                <div style={row}>
                    <BoxWrapper>
                        <DisplayText data={project} handleEditMode={handleEdit}/>
                    </BoxWrapper>
                </div>
                <div style={row}>
                    <div style={marg}>
                        <p style={lowlight}>Latitude: <span style={highlight}>{project.lat}</span></p>
                        <p style={lowlight}>Longditude: <span style={highlight}>{project.lng}</span></p>
                    </div>
                    <div style={marg}>
                        <p style={lowlight}>Posted by: <span style={highlight}>{`${project.authorFirstName} ${project.authorLastName}`}</span></p>
                        <p style={lowlight}>Posted: <span style={highlight}>{moment(project.createdAt.toDate()).format('ddd Do MMM YYYY')}</span></p>
                        {project.updatedAt && <p style={lowlight}>Last updated: <span style={highlight}>{moment(project.updatedAt.toDate()).format('ddd Do MMM YYYY')}</span></p>}
                    </div>
                </div>
                <div style={column}>
                <Thumbnail src={project.image} />
                    <div style={imageContainer} >
                        {project.images.map(img => {
                            return (
                            <div key={img}>
                                <Thumbnail src={img} />
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
    )
    } else {
        return <Loading />
    } 
}

export default WallDisplay

const lowlight = {
    color: '#dfbaaa',
    fontWeight: '600',
}
const highlight = {
    color: '#cecbcb'
}


const imageContainer = {
    display: 'flex', 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'left'
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

}

const column = {
    background: '#464646',
    margin: '50px auto',
    padding: '20px',
    maxWidth: '650px',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    boxShadow: '0 100px 80px rgba(0, 0, 0, 0.3)',
    borderRadius: '5px',

}

const marg = {
    margin: '10px',
    maxWidth: '240px',
    overflow: 'hidden',
    flexGrow: '1',
}