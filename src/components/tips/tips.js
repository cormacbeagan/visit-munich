import { useState, useEffect, useRef } from 'react';
import Map from '../universal/map';
import { location, mapStyleLight } from '../universal/mapData';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import Closer from '../universal/closer';
import BoxWrapper from '../universal/boxWrapper';
import DisplayImage from '../walks/displayImage';
import HomeEntry from '../home/homeEntry';
import styled from 'styled-components';
import { InfoBoxStyles, ImgButton } from '../Styles/InfoBoxStyles';
import Carousel from '../walks/carousel';

const TipsContainer = styled.section`
  height: 100%;
  max-height: 1000px;
  width: 32rem;
`;

export default function Tips() {
  const [displayData, setDisplayData] = useState({});
  const [slideIn, setSlideIn] = useState(false);
  const [mapState, setMapState] = useState(mapStyleLight);
  const [pin, setPin] = useState();
  const boxes = useRef();
  const closer = useRef();
  const map = useRef();
  const modal = useRef();
  useFirestoreConnect(['tips']);
  const tips = useSelector(state => state.firestore.ordered?.tips);

  const [display, setDisplay] = useState(false);

  const handleModal = () => {
    setDisplay(true);
    setTimeout(() => {
      modal.current.focus();
    });
  };

  const closeModal = () => {
    setDisplay(false);
    setTimeout(() => {
      closer.current.focus();
    });
  };

  const handleInfo = (id, pinRef) => {
    if (pinRef) {
      setPin(pinRef);
    } else {
      setPin(map.current);
    }
    if (id) {
      const data = tips.find(project => project.id === id);
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
      if (display) return;
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
  }, [slideIn, display]);

  return (
    <TipsContainer>
      <div>
        <Map
          ref={map}
          handleInfo={handleInfo}
          location={location}
          zoomLevel={12}
          projects={tips}
          mapStyle={mapState}
          color={'#b81b16'}
          switched={false}
        />
      </div>
      <InfoBoxStyles slideIn={slideIn} ref={boxes}>
        <BoxWrapper>
          <Closer onClick={handleSlideOut} ref={closer} />
          <ImgButton onClick={handleModal}>
            <DisplayImage data={displayData} />
            <p className="accessibly-hidden">Open the image gallery pop up</p>
          </ImgButton>
        </BoxWrapper>
        <BoxWrapper>
          <HomeEntry type={'text'} data={displayData} url={'/tips'} />
        </BoxWrapper>
      </InfoBoxStyles>
      <Carousel
        ref={modal}
        id={displayData.id}
        closeModal={closeModal}
        data={displayData}
        display={display}
      />
    </TipsContainer>
  );
}
