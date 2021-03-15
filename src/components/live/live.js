import { useState, useEffect, useRef } from 'react';
import Map from '../universal/map';
import Button from '../universal/button';
import Closer from '../universal/closer';
import DateForm from '../universal/dateForm';
import ConcertListings from './concertListings';
import Loading from '../universal/loading';
import { location } from '../universal/mapData';
import { mapStyleLight } from '../universal/mapData';
import { useDispatch, useSelector } from 'react-redux';
import { concertSearch } from '../../store/actions/concertActions';
import BoxWrapper from '../universal/boxWrapper';
import DisplayField from './displayField';
import styled from 'styled-components';

const SearchBar = styled.div`
  height: 70px;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  z-index: 88;
  background: var(--middleBlue);
`;

const BtnDiv = styled.div`
  text-align: center;
  padding: 10px;
  background: var(--middleBlue);
`;

const MapContainer = styled.div`
  max-height: 1000px;
  width: 320px;
`;

const InfoBoxes = styled.div`
  display: block;
  visibility: ${props => (props.slideIn ? 'visible' : 'hidden')};
  margin-left: ${props => (props.slideIn ? '10px' : '-350px')};
  margin-top: 70px;
  position: absolute;
  z-index: 87;
  height: 300px;
  width: 320px;
  transition: margin-left 600ms cubic-bezier(0.5, 1.71, 0.54, 0.89);
  &:focus {
    box-shadow: none;
  }
  @media (max-width: 500px) {
    margin-top: 150px;
  }
  @media only screen and (max-width: 480px) {
    left: ${props => (props.slideIn ? '-20px' : '-350px')};
    bottom: 40px;
    transform: scale(0.95);
  }
  @media only screen and (max-width: 380px) {
    bottom: 0px;
    transform: scale(0.7);
    left: ${props => (props.slideIn ? '-50px' : '-350px')};
  }
`;

const LogoDiv = styled.div`
  position: absolute;
  bottom: 0;
  right: 70px;
  z-index: 86;
  h4 {
    color: #f24847;
    margin: 0;
    font-weight: bold;
  }
`;
const CloserDiv = styled.div`
  position: absolute;
  top: 5px;
  right: 60px;
`;

const ErrorDiv = styled.div`
  margin-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    z-index: 99;
    bottom: 200px;
    color: #ff4444;
    font-size: 36px;
    font-weight: bold;
  }
`;

const initialState = {
  name: '',
  lat: '',
  lng: '',
  coords: '',
};

export default function Live() {
  const dispatch = useDispatch();
  const concerts = useSelector(state => state.concerts);
  const dates = useSelector(state => state.dates);
  const [displayData, setDisplayData] = useState(initialState);
  const [slideIn, setSlideIn] = useState(false);
  const [searching, setSearching] = useState(true);
  const [mapLocation, setMapLocation] = useState(location);
  const [mapZoom, setMapZoom] = useState(12);
  const [displayMap, setDisplayMap] = useState(false);
  const [coords, setCoords] = useState(null);
  const [venueBands, setVenueBands] = useState(null);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const [venue, setVenue] = useState(initialState);
  const [pin, setPin] = useState();
  const boxes = useRef();
  const map = useRef();
  const closer = useRef();

  useEffect(() => {
    if (dates.dates) {
      dispatch(concertSearch(dates.dates));
    }
  }, []);

  useEffect(() => {
    if (concerts.msg) {
      setMessage(concerts.msg);
      setTimeout(() => {
        setLoader(false);
        setMessage('');
      }, 3000);
    }
    if (concerts.events[0]) {
      setSearching(false);
      setLoader(false);
    }
  }, [concerts]);

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

  const handleInfo = (venueId, pinRef) => {
    if (pinRef) {
      setPin(pinRef);
    } else {
      setPin(map.current);
    }
    if (venueId) {
      const venue = concerts.venues.filter(item => item.id === venueId);
      let bands = [];
      concerts.events.forEach(item => {
        if (item.venue.id === venueId) {
          bands.push(item.performance[0].displayName);
        }
      });
      setVenueBands(bands);
      setDisplayData(venue);
      setTimeout(() => {
        setSlideIn(true);
        closer.current.focus();
      });
    }
  };

  const handleSearch = dates => {
    setLoader(true);
    dispatch(concertSearch(dates));
  };

  const handleNewSearch = () => {
    setMapLocation(location);
    setMapZoom(12);
    setCoords(null);
    setSlideIn(false);
    setSearching(true);
    setVenueBands(null);
  };

  const handleBackToMap = event => {
    setDisplayMap(!displayMap);
    setSlideIn(false);
    setVenue('');
    setCoords(null);
    setVenueBands(null);
    setTimeout(() => {
      setPin(map.current);
    });
    if (event) {
      setMapLocation({ lat: event.venue.lat, lng: event.venue.lng });
      setMapZoom(17);
      setDisplayData([
        {
          name: event.displayName,
          lat: event.venue.lat,
          lng: event.venue.lng,
          coords: `${event.venue.lat}${event.venue.lng}`,
          uri: event.uri,
        },
      ]);
      setTimeout(() => {
        setSlideIn(true);
        closer.current.focus();
      });
    } else {
      setMapLocation(location);
      setMapZoom(12);
      map.current.focus();
    }
  };

  const handleVenue = (coords, venue) => {
    setDisplayMap(!displayMap);
    setVenue(venue);
    setCoords(coords);
  };

  const handleCloser = () => {
    setSlideIn(false);
    setMapZoom(12);
    setMapLocation(location);
    setTimeout(() => {
      pin.focus();
    });
  };

  return (
    <section>
      <SearchBar>
        {concerts.events && !searching ? (
          <BtnDiv>
            <Button
              children={displayMap ? 'back to map' : 'all concerts'}
              onClick={() => handleBackToMap()}
            />
            <Button children={'new dates'} onClick={handleNewSearch} />
          </BtnDiv>
        ) : (
          <DateForm handleDates={handleSearch} name={'find concerts'} />
        )}
      </SearchBar>
      {displayMap ? (
        <ConcertListings
          coords={coords}
          handleBackToMap={handleBackToMap}
          venue={venue}
        />
      ) : (
        <div>
          <MapContainer>
            <div>
              <Map
                ref={map}
                onClick={closer}
                handleInfo={handleInfo}
                location={mapLocation}
                zoomLevel={mapZoom}
                projects={concerts.venues}
                color={'#b81b16'}
                mapStyle={mapStyleLight}
                switched={false}
              />
            </div>
            <InfoBoxes slideIn={slideIn} ref={boxes} tabIndex="0">
              <CloserDiv>
                <Closer onClick={handleCloser} ref={closer} />
              </CloserDiv>
              <BoxWrapper>
                <DisplayField
                  bands={venueBands}
                  data={displayData}
                  handleVenue={handleVenue}
                />
              </BoxWrapper>
            </InfoBoxes>
          </MapContainer>
          <LogoDiv>
            <h4>Concerts</h4>
            <img
              src="/images/by-songkick-pink.svg"
              alt="Sonkick Logo"
              height="50px"
              width="140px"
            />
          </LogoDiv>
        </div>
      )}
      {loader && <Loading />}
      {loader && message && (
        <ErrorDiv>
          <p>{message}</p>
        </ErrorDiv>
      )}
    </section>
  );
}
