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
import { InfoBoxStyles, ImgButton } from '../Styles/InfoBoxStyles';
import Carousel from './carousel';

const SectionStyle = styled.section`
  height: 100%;
  max-height: 1000px;
  width: 320px;
`;

export default function Walks() {
  const [displayData, setDisplayData] = useState({});
  const [slideIn, setSlideIn] = useState(false);
  const [mapState, setMapState] = useState(mapStyleDark);
  const [pin, setPin] = useState();
  const boxes = useRef();
  const closer = useRef();
  const map = useRef();
  const modal = useRef();
  useFirestoreConnect(['projects']);
  const projects = useSelector(state => state.firestore.ordered?.projects);

  const [display, setDisplay] = useState(false);

  const handleModal = () => {
    setDisplay(true);
    setTimeout(() => {
      modal.current.focus();
    });
  };

  const closeModal = () => {
    setDisplay(false);
    closer.current.focus();
  };

  const handleInfo = (id, pinRef) => {
    if (pinRef) {
      setPin(pinRef);
    } else {
      setPin(map.current);
    }
    if (id) {
      const data = projects.find(project => project.id === id);
      setDisplayData(data);
      setTimeout(() => {
        setSlideIn(true);
      });
      setTimeout(() => {
        closer.current.focus();
      });
    }
  };
  const handleSlideOut = () => {
    setSlideIn(false);
    pin.focus();
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
    const handleSliding = e => {
      if (display) return;
      if (!slideIn) {
        return;
      }
      if (!infoBoxes.contains(e.target) && e.target) {
        handleSlideOut();
      }
    };
    document.addEventListener('click', handleSliding);
    return () => {
      document.removeEventListener('click', handleSliding);
    };
  }, [slideIn, display]);

  return (
    <SectionStyle aria-hidden={display ? 'true' : 'false'}>
      <Map
        ref={map}
        handleInfo={handleInfo}
        location={location}
        zoomLevel={12}
        projects={projects}
        mapStyle={mapState}
        color={'#b81b16'}
        switched={true}
      />
      <InfoBoxStyles slideIn={slideIn} ref={boxes}>
        <BoxWrapper>
          <Closer onClick={handleSlideOut} ref={closer} />
          <ImgButton onClick={handleModal}>
            <DisplayImage data={displayData} handleModal={handleModal} />
            <p className="accessibly-hidden">Open the image gallery pop up</p>
          </ImgButton>
        </BoxWrapper>
        <BoxWrapper>
          <DisplayText data={displayData} />
        </BoxWrapper>
      </InfoBoxStyles>
      <Carousel
        ref={modal}
        id={displayData.id}
        closeModal={closeModal}
        data={displayData}
        display={display}
      />
    </SectionStyle>
  );
}
