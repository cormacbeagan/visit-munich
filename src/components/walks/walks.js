import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Map from '../universal/map'
import { location, mapStyleDark } from '../universal/mapData'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Closer from '../universal/closer'
import BoxWrapper from '../universal/boxWrapper'
import DisplayImage from './displayImage'
import DisplayText from './displayText'

function Walks(props) {
    const { projects } = props
    const [displayData, setDisplayData] = useState({})
    const [slideIn, setSlideIn] = useState('-350px')
    const [mapState, setMapState] = useState(mapStyleDark)

    const handleInfo = id => {
        if (id) {
            const data = projects.find(project => project.id === id)
            setDisplayData(data)
            setSlideIn('0px')
        }
    }

    const handleSlideOut = () => {
        setSlideIn('-350px')
    }

    useEffect(() => {
        const regEx = new RegExp('(?<=walks/).*$')
        const idArr = window.location.pathname.match(regEx)
        if (idArr) {
            handleInfo(idArr[0])
            window.history.pushState('', '', '/walks')
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
    }

    return (
        <div style={container}>
            <div>
                <Map
                    handleInfo={handleInfo}
                    location={location}
                    zoomLevel={12}
                    projects={projects}
                    mapStyle={mapState}
                    color={'#b81b16'}
                    switched={true}
                />
            </div>
            <div style={infoBoxes}>
                <Closer onClick={handleSlideOut} />
                <BoxWrapper>
                    <DisplayImage data={displayData} />
                </BoxWrapper>
                <BoxWrapper>
                    <DisplayText data={displayData} />
                </BoxWrapper>
            </div>
        </div>
    )
}

Walks.propTypes = {
    projects: PropTypes.array,
}

const mapStateToProps = state => {
    return {
        projects: state.firestore.ordered.projects || state.project.projects,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: 'projects' }])
)(Walks)

const container = {
    height: '100%',
    maxHeight: '1000px',
    width: '320px',
}
