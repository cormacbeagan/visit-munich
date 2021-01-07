import React, { useState, useEffect, Fragment } from 'react';
import Map from './map';
import Display from './display';
import { location } from './mapData';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';


function Walks(props) {
    const {projects} = props
    const [ displayData, setDisplayData ] = useState({})
    const [ slideIn, setSlideIn ] = useState('-350px')
    const handleInfo = (id) => {
        if(id) {
            const data = projects.find(project => project.id === id)
            setDisplayData(data)
            setTimeout(setSlideIn('0px'), 300)
        }
    }

    const infoBoxes = {
        marginLeft: slideIn,
        position: 'absolute',
        zIndex: '99',
        width: '320px',
        display: 'block',
        transitionProperty: 'margin-left',
        transitionDuration: '800ms',
        transitionTimingFunction: 'cubic-bezier(0.5, 1.71, 0.54, 0.89)',
    };
    
    console.log(displayData)

    return (
            <div style={container}> 
                    <div>
                        <Map
                        handleInfo={handleInfo}
                        location={location}
                        zoomLevel={12}
                        projects={projects}
                        />
                    </div>
                    <div style={infoBoxes}>
                        <Display 
                            type={'image'}
                            data={displayData}
                            />
                        <Display 
                            type={'text'}
                            data={displayData}
                            />
                    </div>
            </div>
    )
}

const container = {
    //margin: '50px',
    maxHeight: '1000px',
    width: '320px',
    contain: 'items',
    display: 'contain',
};

// need to move this css into a walks css file and move it in on locationPin click
// at the moment the map is being covered by the content from app and the margin from 
// the boxes



  const mapStateToProps = (state) => {
      return {
          projects: state.firestore.ordered.projects || state.project.projects
      }
  }

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'projects'}
    ])
)(Walks);

