import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import Map from '../universal/map';
import { location, mapStyleLight } from '../universal/mapData';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Closer from '../universal/closer';
import BoxWrapper from '../universal/boxWrapper';
import DisplayImage from '../walks/displayImage';
import HomeEntry from '../home/homeEntry';
import styled from 'styled-components';
import InfoBoxStyles from '../Styles/InfoBoxStyles';

const TipsContainer = styled.section`
  height: 100%;
  max-height: 1000px;
  width: 32rem;
`;

function Tips(props) {
  const { tips } = props;
  const [displayData, setDisplayData] = useState({});
  const [slideIn, setSlideIn] = useState(false);
  const [mapState, setMapState] = useState(mapStyleLight);
  const boxes = useRef();

  const handleInfo = id => {
    if (id) {
      const data = tips.find(project => project.id === id);
      setDisplayData(data);
      setTimeout(() => {
        setSlideIn(true);
      });
      boxes.current.focus();
    }
  };

  const handleSlideOut = () => {
    setSlideIn(false);
  };

  useEffect(() => {
    const regEx = new RegExp('(?<=tips/).*$');
    const idArr = window.location.pathname.match(regEx);
    if (idArr) {
      handleInfo(idArr[0]);
      window.history.pushState('', '', '/tips');
    }
  }, []);

  useEffect(() => {
    const infoBoxes = boxes.current;
    const handleSlideout = e => {
      if (!slideIn) {
        return;
      }
      if (!infoBoxes.contains(e.target) && e.target) {
        setSlideIn(false);
      }
    };
    document.addEventListener('click', handleSlideout);
    return () => {
      document.removeEventListener('click', handleSlideout);
    };
  }, [slideIn]);

  return (
    <TipsContainer>
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
      <InfoBoxStyles slideIn={slideIn} ref={boxes} tabIndex="0">
        <div>
          <Closer onClick={handleSlideOut} />
        </div>
        <BoxWrapper>
          <DisplayImage data={displayData} />
        </BoxWrapper>
        <BoxWrapper>
          <HomeEntry type={'text'} data={displayData} url={'/tips'} />
        </BoxWrapper>
      </InfoBoxStyles>
    </TipsContainer>
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
