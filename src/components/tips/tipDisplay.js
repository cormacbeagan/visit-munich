import React from 'react';
import moment from 'moment';
import Thumbnail from '../universal/thumbnail';
import Loading from '../universal/loading';


 function TipDisplay({tip}) {
    
    if(tip) {

        return (
            <div>
                <h1 style={lowlight}>Name: <span style={highlight}>{tip.name}</span></h1>
                <h3 style={lowlight}>Subtitle: <span style={highlight}>{tip.subtitle}</span></h3>
                <h3 style={lowlight}>Tip: <span style={highlight}>{tip.textInput}</span></h3>
                <p style={lowlight}>Latitude: <span style={highlight}>{tip.lat}</span></p>
                <p style={lowlight}>Longditude: <span style={highlight}>{tip.lng}</span></p>
                <p style={lowlight}>Link: <span style={highlight}>{tip.link}</span></p>
                <p style={lowlight}>Link Text: <span style={highlight}>{tip.linkText}</span></p>
                <div>
                    <p style={lowlight}>Posted by: <span style={highlight}>{`${tip.authorFirstName} ${tip.authorLastName}`}</span></p>
                    <p style={lowlight}>Posted: <span style={highlight}>{moment(tip.createdAt.toDate()).calendar()}</span></p>
                    {tip.updatedAt && <p style={lowlight}>Last updated: <span style={highlight}>{moment(tip.updatedAt.toDate()).calendar()}</span></p>}
                </div>
                <Thumbnail src={tip.image} />
                <br/>
                <br/>
                <div style={imageContainer} >
                    {tip.images.map(img => {
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

export default TipDisplay

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