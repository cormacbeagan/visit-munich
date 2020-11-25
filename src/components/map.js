import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from './locationPin'
import { mapStyle, grafData } from './mapData';

const googleToken = Process.env.REACT_APP_GOOGLE_KEY;
const middle = {
    lat: 48.137200,
    lng: 11.576044,
}

const Map = ({ location, zoomLevel, handleInfo }) => {
    

    return (
        <div>
            <h2 style={heading}>Grafiti Tour of Munich</h2>
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
                {grafData.map(item => {
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


  const heading = {
    fontSize: '1.5rem',
    padding: '20px',
    paddingLeft: '10px',
    textAlign: 'center',
  };

  const mapContainer = {
      height: '618px',
      width: '618px',
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

  const map = {
    width: '400px',
    height: '300px',
  };

  const pin = {

  };

  export default Map;