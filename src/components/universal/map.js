import React from 'react';
import uniqid from 'uniqid'
import GoogleMapReact from 'google-map-react';
import LocationPin from './locationPin'
import { useDimensionSetter } from '../../hooks/useDimensionSetter';
const googleToken = process.env.REACT_APP_GOOGLE_KEY;
const middle = {
    lat: 48.137200,
    lng: 11.576044,
}

const Map = ({ location, zoomLevel, handleInfo, projects, mapStyle, onClick}) => {
    const [ width, height ] = useDimensionSetter()


  const mapContainer = {
    height: height - 80 + 'px',
    width: width + 'px',
    position: 'fixed',
    left: '0',
    zIndex: '1',
  };

    return (
        <div>
            <div style={mapContainer}>
                <GoogleMapReact
                    onClick={() => onClick()}
                    center={location}
                    bootstrapURLKeys={{ key: googleToken}}
                    defaultCenter={middle}
                    defaultZoom={12}
                    zoom={zoomLevel}
                    gestureHandling={'greedy'}
                    options={{
                      styles: mapStyle,
                      fullscreenControl: false,
                    }}
                >
                {projects.map(item => {
                  if (item.id === null){
                    item.id = uniqid();
                  }
                    return (<LocationPin
                      handleInfo={handleInfo}
                      key={item.id}
                      id={item.id}
                      lat={item.lat}
                      lng={item.lng}
                      text={item.name}
                    />)
                })}
                </GoogleMapReact>
            </div>
        </div>
    )
  }

  export default Map;