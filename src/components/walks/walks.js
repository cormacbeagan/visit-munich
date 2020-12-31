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
    const handleInfo = (id) => {
        if(id) {
            const data = projects.find(project => project.id === id)
            setDisplayData(data)        
        }
    }

    return (
            <div style={container}> 
                <div style={boxes}>
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
            </div>
    )
}

const container = {
    //margin: '50px',
    maxHeight: '1000px',
    maxWidth: 'cover',
    contain: 'items',
    display: 'contain',
};

const boxes = {
    display: 'flex',
    flexDirection: 'column',
    align: 'baseline',
}

const infoBoxes = {
    maxWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
};

const boxHeading = {
    fontSize: '1.5rem',
    padding: '20px',
    paddingLeft: '10px',
    textAlign: 'center',
  };

  const mapStateToProps = (state) => {
      return {
          projects: state.firestore.ordered.projects || state.project.projects
      }
  }
// 

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'projects'}
    ])
)(Walks);

