import { useState, useEffect, useRef } from 'react';
import Map from '../universal/map';
import { location, mapStyleDark } from '../universal/mapData';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import Closer from '../universal/closer';
import BoxWrapper from '../universal/boxWrapper';
import DisplayImage from './displayImage';
import DisplayText from './displayText';
import styled from 'styled-components';
import InfoBoxStyles from '../Styles/InfoBoxStyles';

const SectionStyle = styled.section`
  height: 100%;
  max-height: 1000px;
  width: 320px;
`;

export default function Walks() {
  const [displayData, setDisplayData] = useState({});
  const [slideIn, setSlideIn] = useState(false);
  const [mapState, setMapState] = useState(mapStyleDark);
  const boxes = useRef();
  useFirestoreConnect(['projects']);
  const projects = useSelector(state => state.firestore.ordered?.projects);

  const handleInfo = (id, pin) => {
    if (id) {
      const data = projects.find(project => project.id === id);
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
    const regEx = new RegExp('(?<=walks/).*$');
    const idArr = window.location.pathname.match(regEx);
    if (idArr) {
      handleInfo(idArr[0]);
      window.history.pushState('', '', '/walks');
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
    <SectionStyle>
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
      <InfoBoxStyles slideIn={slideIn} ref={boxes} tabIndex="0">
        <div>
          <Closer onClick={handleSlideOut} />
        </div>
        <BoxWrapper>
          <DisplayImage data={displayData} />
        </BoxWrapper>
        <BoxWrapper>
          <DisplayText data={displayData} />
        </BoxWrapper>
      </InfoBoxStyles>
    </SectionStyle>
  );
}
