import React from 'react';
import moment from 'moment';
import Thumbnail from '../universal/thumbnail';
import Loading from '../universal/loading';

 function WallDisplay({project}) {
    
    if(project) {

        return (
            <div>
                <h1 style={lowlight}>Name: <span style={highlight}>{project.name}</span></h1>
                <h3 style={lowlight}>Description: <span style={highlight}>{project.description}</span></h3>
                <p style={lowlight}>Latitude: <span style={highlight}>{project.lat}</span></p>
                <p style={lowlight}>Longditude: <span style={highlight}>{project.lng}</span></p>
                <div>
                    <p style={lowlight}>Posted by: <span style={highlight}>{`${project.authorFirstName} ${project.authorLastName}`}</span></p>
                    <p style={lowlight}>Posted: <span style={highlight}>{moment(project.createdAt.toDate()).calendar()}</span></p>
                    {project.updatedAt && <p style={lowlight}>Last updated: <span style={highlight}>{moment(project.updatedAt.toDate()).calendar()}</span></p>}
                </div>
                <Thumbnail src={project.image} />
                <br/>
                <br/>
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