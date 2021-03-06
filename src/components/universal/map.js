import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import uniqid from 'uniqid';
import GoogleMapReact from 'google-map-react';
import LocationPin from './locationPin';
import Switch from './switch';
import { mapStyleDark, mapStyleLight } from './mapData';
import { useDimensionSetter } from '../../hooks/useDimensionSetter';
import styled from 'styled-components';
const googleToken = process.env.REACT_APP_GOOGLE_KEY;
const middle = {
  lat: 48.1372,
  lng: 11.576044,
};

const ButtonDiv = styled.div`
  position: absolute;
  bottom: 50px;
  left: 10px;
  z-index: 99;
`;

const MapCont = styled.div`
  height: ${props => props.height - 80}px;
  width: ${props => props.width}px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1;
`;

const Map = React.forwardRef((props, ref) => {
  const {
    location,
    zoomLevel,
    handleInfo,
    projects,
    mapStyle,
    color,
    switched,
    getCoords,
  } = props;
  const [width, height] = useDimensionSetter();
  const [zoom, setZoom] = useState();
  const [styles, setStyles] = useState();
  const goMap = useRef();

  const handleZoomChange = e => {
    setZoom(e.zoom);
  };

  useEffect(() => {
    setStyles(mapStyle);
  }, []);

  const handleStyle = check => {
    if (check) {
      setStyles(mapStyleDark);
    } else {
      setStyles(mapStyleLight);
    }
  };

  return (
    <div>
      <MapCont height={height} width={width} ref={ref} tabIndex="0">
        <ButtonDiv>
          <Switch onClick={handleStyle} switched={switched} />
        </ButtonDiv>
        <GoogleMapReact
          ref={goMap}
          center={location}
          bootstrapURLKeys={{ key: googleToken }}
          defaultCenter={middle}
          defaultZoom={12}
          zoom={zoomLevel}
          gestureHandling={'greedy'}
          id={'map'}
          onChange={handleZoomChange}
          options={{
            styles: styles,
            fullscreenControl: false,
          }}
          onClick={getCoords}
        >
          {projects?.map(item => {
            if (item.id === null) {
              item.id = uniqid();
            }
            return (
              <LocationPin
                handleInfo={handleInfo}
                key={item.id}
                id={item.id}
                lat={item.lat}
                lng={item.lng}
                text={item.name}
                zoom={zoom}
                color={color}
              />
            );
          })}
        </GoogleMapReact>
      </MapCont>
    </div>
  );
});

Map.propTypes = {
  color: PropTypes.string,
  handleInfo: PropTypes.func,
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  mapStyle: PropTypes.array,
  projects: PropTypes.array,
  switched: PropTypes.bool,
  zoomLevel: PropTypes.number,
};

export default Map;
