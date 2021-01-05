import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from './locationPin'
import { mapStyle } from './mapData';

const googleToken = process.env.REACT_APP_GOOGLE_KEY;
const middle = {
    lat: 48.137200,
    lng: 11.576044,
}

const Map = ({ location, zoomLevel, handleInfo, projects}) => {
    

    return (
        <div>
            <div style={mapContainer}>
                <GoogleMapReact
                    style={map}
                    center={location}
                    bootstrapURLKeys={{ key: googleToken}}
                    defaultCenter={middle}
                    defaultZoom={zoomLevel}
                    gestureHandling={'greedy'}
                    options={{
                      styles: mapStyle
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
                      style={pin}
                    />)
                })}
                </GoogleMapReact>
            </div>
        </div>
    )
  }

  const mapContainer = {
    height: window.innerHeight - 50 + 'px',
    width: '100%',
    marginTop: '-10px',
    position: 'fixed',
    zIndex: '1',
      textAlign: 'center',
      contain: 'content',  
      boxShadow:'2.8px 2.8px 2.2px rgba(0, 0, 0, 0.034)',
      boxShadow:'5.3px 6.7px 5.3px rgba(0, 0, 0, 0.048)',
      boxShadow:'8px 12.5px 10px rgba(0, 0, 0, 0.06)',
      boxShadow: '12px 22.3px 17.9px rgba(0, 0, 0, 0.072)',
      boxShadow: '14px 41.8px 33.4px rgba(0, 0, 0, 0.086)',
      boxShadow: '8px 100px 80px rgba(0, 0, 0, 0.3)',
    //  border: '3px solid #333',
    //  borderRadius: '8px',
  };
// add a resize on drag property for the bottom border of the map - 
// https://stackoverflow.com/questions/26233180/resize-a-div-on-border-drag-and-drop-without-adding-extra-markup
// http://jsfiddle.net/kxr96dzg/1/ 
  const map = {
    width: '400px',
    height: '300px',
  };

  const pin = {

  };

  export default Map;