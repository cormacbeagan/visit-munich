import React, { useState, useEffect } from 'react';
import Map from '../universal/map';
import HomeBox from '../home/homeBox';
import Display from '../walks/display'
import { location, mapStyleLight} from '../universal/mapData';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import Closer from '../universal/closer';

function Tips(props) {
    const {tips} = props
    const [ displayData, setDisplayData ] = useState({})
    const [ slideIn, setSlideIn ] = useState('-350px')
    const [ mapState, setMapState ] = useState(mapStyleLight) 

    const handleInfo = (id) => {
        if(id) {
            const data = tips.find(project => project.id === id)
            setDisplayData(data)
            setSlideIn('0px')
        }
    }

    const handleSlideOut = () => {
        setSlideIn('-350px')
    }

    useEffect(() => {
        const regEx = new RegExp('(?<=tips/).*$')
        const idArr = window.location.pathname.match(regEx)
        if(idArr) {
            handleInfo(idArr[0])
            window.history.pushState('', '', '/tips')
        }
    }, [])  

    const infoBoxes = {
        left: slideIn,
        top: '80px',
        position: 'absolute',
        zIndex: '80',
        width: '320px',
        display: 'block',
        transitionProperty: 'left',
        transitionDuration: '400ms',
        transitionTimingFunction: 'cubic-bezier(0.5, 1.71, 0.54, 0.89)',
    };
    
    return (
            <div style={container}> 
                    <div>
                        <Map
                            handleInfo={handleInfo}
                            location={location}
                            zoomLevel={12}
                            projects={tips}
                            mapStyle={mapState}
                            color={'#b81b16'}
                            switched={false}
                        />
                    </div>
                    <div style={infoBoxes}>
                        <Closer onClick={handleSlideOut} />
                        <Display 
                            type={'image'}
                            data={displayData}
                            />
                        <HomeBox
                            type={'text'}
                            data={displayData}
                            url={'/tips'}
                            />
                    </div>
            </div>
    )
}

const mapStateToProps = (state) => {
      return {
          tips: state.firestore.ordered.tips || state.tips.tips
      }
  }

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'tips'}
    ])
)(Tips);

const container = {
    height: '100%',
    maxHeight: '1000px',
    width: '320px',
};
