import React, { useState, useEffect } from 'react';
import Map from '../universal/map';
import Display from './display';
import { location, mapStyle } from '../universal/mapData';
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
            setTimeout(setSlideIn('-15px'), 300)
        }
    }

    useEffect(() => {
        const regEx = new RegExp('(?<=walks/).*$')
        const idArr = window.location.pathname.match(regEx)
        if(idArr) {
            handleInfo(idArr[0])
            window.history.pushState('', '', '/walks')
        }
    }, [])  

    const infoBoxes = {
        marginLeft: slideIn,
        marginTop: '10px',
        position: 'absolute',
        zIndex: '90',
        width: '320px',
        display: 'block',
        transitionProperty: 'margin-left',
        transitionDuration: '400ms',
        transitionTimingFunction: 'cubic-bezier(0.5, 1.71, 0.54, 0.89)',
    };
    
    return (
            <div style={container}> 
                    <div>
                        <Map
                        onClick={() => setSlideIn('-350px')}
                        mapStyle={mapStyle}
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
    height: '100%',
    maxHeight: '1000px',
    width: '320px',
    contain: 'items',
};

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

