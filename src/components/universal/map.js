import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from './locationPin'
const googleToken = process.env.REACT_APP_GOOGLE_KEY;
const middle = {
    lat: 48.137200,
    lng: 11.576044,
}

const Map = ({ location, zoomLevel, handleInfo, projects, mapStyle, onClick}) => {
    

    return (
        <div>
            <div style={mapContainer}>
                <GoogleMapReact
                    onClick={() => onClick()}
                    center={location}
                    bootstrapURLKeys={{ key: googleToken}}
                    defaultCenter={middle}
                    defaultZoom={zoomLevel}
                    gestureHandling={'greedy'}
                    options={{
                      styles: mapStyle,
                      fullscreenControl: false,
                    }}
                >
                {projects.map(item => {
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

  const mapContainer = {
    height: '100%',
    width: '100%',
    marginTop: '-10px',
    position: 'fixed',
    zIndex: '1',
  };



  export default Map;