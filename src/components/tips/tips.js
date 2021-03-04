import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Map from '../universal/map';
import { location, mapStyleLight } from '../universal/mapData';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Closer from '../universal/closer';
import BoxWrapper from '../universal/boxWrapper';
import DisplayImage from '../walks/displayImage';
import HomeEntry from '../home/homeEntry';

function Tips(props) {
  const { tips } = props;
  const [displayData, setDisplayData] = useState({});
  const [slideIn, setSlideIn] = useState('-350px');
  const [mapState, setMapState] = useState(mapStyleLight);

  const handleInfo = id => {
    if (id) {
      const data = tips.find(project => project.id === id);
      setDisplayData(data);
      setSlideIn('0px');
    }
  };

  const handleSlideOut = () => {
    setSlideIn('-350px');
  };

  useEffect(() => {
    const regEx = new RegExp('(?<=tips/).*$');
    const idArr = window.location.pathname.match(regEx);
    if (idArr) {
      handleInfo(idArr[0]);
      window.history.pushState('', '', '/tips');
    }
  }, []);

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
    <section style={container}>
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
        <BoxWrapper>
          <DisplayImage data={displayData} />
        </BoxWrapper>
        <BoxWrapper>
          <HomeEntry type={'text'} data={displayData} url={'/tips'} />
        </BoxWrapper>
      </div>
    </section>
  );
}

Tips.propTypes = {
  tips: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    tips: state.firestore.ordered.tips || state.tips.tips,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'tips' }])
)(Tips);

const container = {
  height: '100%',
  maxHeight: '1000px',
  width: '320px',
};
